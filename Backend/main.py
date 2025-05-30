from fastapi import FastAPI, status, Query
import psycopg2
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

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
    task_id: int
    user_id: int

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

@app.get("/get-tasks")
def get_tasks():

    query = '''SELECT 
    tasks.id AS task_id, 
    tasks.title, 
    tasks.description, 
    tasks.status, 
    tasks.created_at, 
    tasks.updated_at, 
    users.id AS user_id, 
    users.username, 
    users.email
    FROM tasks
    JOIN task_assignments ON tasks.id = task_assignments.task_id
    JOIN users ON task_assignments.user_id = users.id;'''

    temp_query = "SELECT * FROM tasks"

    cursor.execute(temp_query)
    col_names = [col[0] for col in cursor.description]
    data = cursor.fetchall()

    tasks = [dict(zip(col_names, row)) for row in data]
    return tasks

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
    query_password = "SELECT password FROM users WHERE(username=%s)"
    cursor.execute(query_password, (user.user_name,))
    password = cursor.fetchone()

    query_data = "SELECT username, email FROM users WHERE(username=%s)"
    cursor.execute(query_data, (user.user_name,))
    user_data = cursor.fetchone()

    if password[0] == user.password:
        return Response(status=True, msg="Login successful", status_code=200, data={"username": user_data[0], "email": user_data[1]})
    return Response(status=False, msg="Login Failed", data=user_data, status_code=status.HTTP_401_UNAUTHORIZED)

@app.post("/add-task", status_code=status.HTTP_201_CREATED)
def create_task(task: Create_Task):
    query_task = "INSERT INTO Tasks(title, description, created_at) VALUES (%s, %s, %s)"
    cursor.execute(query_task, (task.title, task.description, datetime.now()))
    connection.commit()
    return Response(status=True, msg="Task created successfully", status_code=201)

@app.put("/task-update", status_code=status.HTTP_200_OK)
def task_update(task: update_task):
    update_task_query = "UPDATE tasks SET title = %s, description = %s, status = %s, updated_at =%s WHERE id = %s"
    cursor.execute(update_task_query, (task.title, task.description, task.status, datetime.now(), task.id))
    connection.commit()
    return Response(status=True, msg="Task Updated successfully", status_code=200)

@app.post("/task_assignment", status_code=status.HTTP_200_OK)
def task_assignment(task: task_assignment):
    task_assignment_query = "INSERT INTO task_assignments(task_id, user_id) VALUES (%s, %s)"
    cursor.execute(task_assignment_query, (task.task_id, task.user_id))
    connection.commit()
    return Response(status=True, msg="Task assinged successfully", status_code=200)

@app.delete("/delete-task", status_code=status.HTTP_200_OK)
def delete_task(id: int = Query(...)):
    delete_query = "DELETE FROM tasks WHERE id=%s"
    cursor.execute(delete_query, (id, ))
    connection.commit()
    return Response(status=True, msg="Task Deleted Successfully", status_code=200)