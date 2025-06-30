from pydantic import BaseModel
from typing import Optional

class Response(BaseModel):
    status: bool
    msg: str
    status_code: int
    data: Optional[dict] = None