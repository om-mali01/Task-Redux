from fastapi import HTTPException, Depends, status, APIRouter, Query
from typing import Annotated
from utils.jwt_auth import decode_token
from database import cursor, connection
from datetime import datetime
from schemes.task import Create_Task, update_task, task_assignment
from schemes.response import Response
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(tags=["Tasks"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

from fastapi import Header

@router.get("/get-user-info")
def get_user_details(
    user_name: str = Header(..., alias="User-Name"),
    user_id: int = Header(..., alias="User-Id")
):
    try:
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})

        fetch_details_query = "SELECT id, username, email FROM users WHERE username=%s"
        cursor.execute(fetch_details_query, (user_name,))
        data = cursor.fetchall()

        col_names = [col[0] for col in cursor.description]
        tasks = [dict(zip(col_names, row)) for row in data]

        return tasks[0]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"{e}"})

from fastapi import Header

@router.get("/total-task-length")
def get_total_length(
    user_id: int = Header(..., alias="User-Id"),
    user_name: str = Header(..., alias="User-Name")
):
    try:
        if not user_name:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"msg": "User not found"}
            )

        query = "SELECT count(*) FROM tasks WHERE user_id=%s"
        cursor.execute(query, (user_id,))
        length = cursor.fetchone()

        print("task_length_user_id")
        print(user_id)

        return length[0]
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"msg": f"Internal server error {e}"}
        )

from fastapi import Header

@router.get("/get-tasks")
def get_tasks(
    page: int | None = None,
    status: str | None = None,
    user_id: int = Header(..., alias="User-Id"),
    user_name: str = Header(..., alias="User-Name")
):
    try:
        if not user_name:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"msg": "User not found"}
            )

        if not page:
            query = "SELECT * FROM tasks"
            cursor.execute(query)
        if page and status:
            offset = (page - 1) * 6
            query = "SELECT * FROM tasks WHERE user_id=%s AND status=%s LIMIT 6 OFFSET %s"
            cursor.execute(query, (user_id, status, offset))
        else:
            offset = (page - 1) * 6
            query = "SELECT * FROM tasks WHERE user_id=%s LIMIT 6 OFFSET %s"
            cursor.execute(query, (user_id, offset))

        col_names = [col[0] for col in cursor.description]
        data = cursor.fetchall()
        tasks = [dict(zip(col_names, row)) for row in data]

        print("get-data-user_id")
        print(user_id)

        return tasks

    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"msg": f"Internal server error {e}"}
        )

@router.post("/add-task", status_code=status.HTTP_201_CREATED)
def create_task(current_user: Annotated[str, Depends(oauth2_scheme)], task: Create_Task):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        user_id = payload["user_id"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})

        query_task = "INSERT INTO Tasks(title, description, created_at, user_id) VALUES (%s, %s, %s, %s)"
        cursor.execute(query_task, (task.title, task.description, datetime.now(), user_id))

        connection.commit()
        return Response(status=True, msg="Task created successfully", status_code=201)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})

@router.put("/task-update", status_code=status.HTTP_200_OK)
def task_update(current_user: Annotated[str, Depends(oauth2_scheme)], task: update_task):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})
        update_task_query = "UPDATE tasks SET title = %s, description = %s, status = %s, updated_at =%s WHERE id = %s"
        cursor.execute(update_task_query, (task.title, task.description, task.status, datetime.now(), task.id))
        connection.commit()
        return Response(status=True, msg="Task Updated successfully", status_code=200)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})

@router.delete("/delete-task", status_code=status.HTTP_200_OK)
def delete_task(current_user: Annotated[str, Depends(oauth2_scheme)],id: int = Query(...)):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})
        delete_query = "DELETE FROM tasks WHERE id=%s"
        cursor.execute(delete_query, (id, ))
        connection.commit()
        return Response(status=True, msg="Task Deleted Successfully", status_code=200)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})

@router.post("/assign-task", status_code=status.HTTP_200_OK)
def assign_task(current_user: Annotated[str, Depends(oauth2_scheme)], task: task_assignment):
    try:
        payload = decode_token(current_user)
        user_id = payload["user_id"]
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "user not found"})
        

        user_id_query = "SELECT id FROM users WHERE(username=%s)"
        cursor.execute(user_id_query, (user_name,))
        assigned_user_id = cursor.fetchone()[0]

        add_task_query = "INSERT INTO tasks(title, description, user_id) VALUES (%s, %s, %s) RETURNING id"
        cursor.execute(add_task_query, (task.task, task.description, user_id))
        task_id = cursor.fetchone()[0]
        connection.commit()

        assign_table_insert = "INSERT INTO task_assignments(task_id, user_id, assigned_by) VALUES(%s, %s, %s)"
        cursor.execute(assign_table_insert, (task_id, user_id, assigned_user_id))
        connection.commit()

        return Response(status=True, msg="Task Assigned successfully", status_code=200)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})