from fastapi import FastAPI, status, Query, Depends, HTTPException
import psycopg2
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from jwt_auth import create_token, decode_token
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class User_Register(BaseModel):
    user_name: str
    email: str
    password: str

class User_Login(BaseModel):
    user_name: str
    password: str

class Response(BaseModel):
    status: bool
    msg: str
    status_code: int
    data: Optional[dict] = None

class Create_Task(BaseModel):
    title: str
    description: str
    status: str | None=None

class update_task(BaseModel):
    title: str
    description: str
    status: str
    id: int

class task_assignment(BaseModel):
    user_name: str
    task: str
    description: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_connection():
    connection = psycopg2.connect(
        user='postgres',
        password='mysecretpassword',
        host='172.17.0.94',
        port='5432',
        database='Temp-Redux'
    )
    return connection

connection = create_connection()
cursor = connection.cursor()

@app.get("/home")
def home():
    return {"key": "home page"}

@app.get("/get-user-info")
def get_user_details(current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})

        fetch_details_query = "SELECT id, username, email FROM users WHERE username=%s"
        cursor.execute(fetch_details_query, (user_name,))
        data = cursor.fetchall()

        col_names = [col[0] for col in cursor.description]
        tasks = [dict(zip(col_names, row)) for row in data]
        return tasks[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg":f"{e}"})

@app.get("/total-task-length")
def get_total_length(current_user: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})
        
        user_id_query = "select id from users where username=%s"
        cursor.execute(user_id_query, (user_name,))
        user_id = cursor.fetchone()[0]

        query = "select count(*) from tasks where user_id=%s"
        cursor.execute(query, (user_id,))
        length = cursor.fetchone()
        return length[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg":f"Internal server error {e}"})

@app.get("/get-tasks")
def get_tasks(current_user: Annotated[str, Depends(oauth2_scheme)], page: int | None=None):
    try:
        payload = decode_token(current_user)
        # return payload
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})

        user_id_query = "select id from users where username=%s"
        cursor.execute(user_id_query, (user_name,))
        user_id = cursor.fetchone()[0]

        if not page:
            temp2 = "select * from tasks"
            cursor.execute(temp2)
        else:
            offset = (page - 1) * 6
            get_tasks_query = "select * from tasks where user_id=%s LIMIT 6 OFFSET %s"
            cursor.execute(get_tasks_query, (user_id, offset,))

        # cursor.execute(temp_query)
        col_names = [col[0] for col in cursor.description]
        data = cursor.fetchall()

        tasks = [dict(zip(col_names, row)) for row in data]
        return tasks
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: User_Register):
    try:
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s) RETURNING username, email"
        cursor.execute(query, (user.user_name, user.email, user.password))
        user_data = cursor.fetchone() 
        connection.commit() 

        if user_data:
            return Response(status=True, msg="User Registered", data={"username": user_data[0], "email": user_data[1]}, status_code=201)
        else:
            return Response(status=False, msg="Registration failed", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        return Response(status=False, msg=f"Error: {str(e)}", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

@app.post("/login", status_code=status.HTTP_200_OK)
def login(user: User_Login):
    try:
        query_password = "SELECT password FROM users WHERE(username=%s)"
        cursor.execute(query_password, (user.user_name,))
        password = cursor.fetchone()

        query_data = "SELECT username, email FROM users WHERE(username=%s)"
        cursor.execute(query_data, (user.user_name,))
        user_data = cursor.fetchone()
        
        data = {"user_name": user.user_name}
        access_token = create_token(data)

        if password[0] == user.password:
            data = {"user_name": user.user_name}
            access_token = create_token(data)
            return Response(status=True, msg="Login successful", status_code=200, data={"access_token": access_token})
        return Response(status=False, msg="Login Failed", data=user_data, status_code=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response(status=False, msg=f"Internal server errror {e}", status_code=500)

@app.post("/add-task", status_code=status.HTTP_201_CREATED)
def create_task(current_user: Annotated[str, Depends(oauth2_scheme)], task: Create_Task):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "User not found"})

        user_id_query = "SELECT id FROM users WHERE(username=%s)"
        cursor.execute(user_id_query, (user_name,))
        user_id = cursor.fetchone()[0]

        query_task = "INSERT INTO Tasks(title, description, created_at, user_id) VALUES (%s, %s, %s, %s)"
        cursor.execute(query_task, (task.title, task.description, datetime.now(), user_id))

        connection.commit()
        return Response(status=True, msg="Task created successfully", status_code=201)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"msg": f"Internal server error {e}"})

@app.put("/task-update", status_code=status.HTTP_200_OK)
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

@app.delete("/delete-task", status_code=status.HTTP_200_OK)
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

@app.post("/assign-task", status_code=status.HTTP_200_OK)
def assign_task(current_user: Annotated[str, Depends(oauth2_scheme)], task: task_assignment):
    try:
        payload = decode_token(current_user)
        user_name = payload["user_name"]
        if not user_name:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"msg": "user not found"})
        
        user_id_query = "SELECT id FROM users WHERE(username=%s)"
        cursor.execute(user_id_query, (task.user_name,))
        user_id = cursor.fetchone()[0]

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