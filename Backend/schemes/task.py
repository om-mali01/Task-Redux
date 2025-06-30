from pydantic import BaseModel

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
