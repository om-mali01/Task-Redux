from schemes.auth import User_Login, User_Register
from schemes.response import Response
from fastapi import status, APIRouter, Request
from fastapi.security import OAuth2PasswordBearer
from utils.jwt_auth import create_token

router = APIRouter(tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(request: Request, user: User_Register):
    # request is used to access the app’s shared database connection pool for each incoming API call.
    try:
        async with request.app.pool.async_pool.connection() as conn:
            async with conn.cursor() as cur:
                query = """
                    INSERT INTO users (username, email, password)
                    VALUES (%s, %s, %s)
                    RETURNING username, email
                """
                await cur.execute(query, (user.user_name, user.email, user.password))
                user_data = await cur.fetchone()
                await conn.commit()

                if user_data:
                    return Response(
                        status=True,
                        msg="User Registered",
                        data={"username": user_data[0], "email": user_data[1]},
                        status_code=201
                    )
                else:
                    return Response(
                        status=False,
                        msg="Registration failed",
                        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
    except Exception as e:
        return Response(
            status=False,
            msg=f"Error: {str(e)}",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(request: Request, user: User_Login):
    try:
        async with request.app.pool.async_pool.connection() as conn:
            async with conn.cursor() as cur:
                query = "SELECT id, username, email, password FROM users WHERE username=%s"
                await cur.execute(query, (user.user_name,))
                user_record = await cur.fetchone()

                if user_record and user.password == user_record[3]:
                    user_id = user_record[0]
                    user_name = user_record[1]
                    payload = {"user_id": user_id, "user_name": user_name}
                    access_token = create_token(payload)
                    return Response(
                        status=True,
                        msg="Login successful",
                        status_code=200,
                        data={"access_token": access_token, "User_data": payload}
                    )

                return Response(
                    status=False,
                    msg="Login Failed",
                    status_code=status.HTTP_401_UNAUTHORIZED
                )
    except Exception as e:
        return Response(
            status=False,
            msg=f"Internal server error {e}",
            status_code=500
        )
