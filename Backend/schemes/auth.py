from pydantic import BaseModel

class User_Register(BaseModel):
    user_name: str
    email: str
    password: str

class User_Login(BaseModel):
    user_name: str
    password: str
