import uuid
from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field


class BugModel(BaseModel):
    # Alias added to reference mongodb user_id variable
    bug_id: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)  # (...) = title field is required
    assignee: Optional[str]
    description: str = Field(...)  # (...) = description field is required
    date_created: datetime = datetime.now().strftime("%A, %d. %B %Y %I:%M%p")
    date_modified: datetime = datetime.now().strftime("%A, %d. %B %Y %I:%M%p")
    closed: bool = False

    class Config:
        allow_population_by_field_name = True
        # schema_extra = {
        # "example": {
        #     "title": "My important bug",
        #     "assignee": "My important bug",
        #     "description": "My important bug",
        #     "closed": False,
        # }
        schema_extra = {
            "example": {
                "title": "My important bug",
                "assignee": "My important bug",
                "description": "My important bug",
                "closed": False,
            }
        }


class UpdateBugModel(BaseModel):
    title: Optional[str]
    assignee: Optional[str]
    description: Optional[str]
    date_modified: datetime = datetime.now().strftime("%A, %d. %B %Y %I:%M%p")
    closed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "title": "My important bug",
                "assignee": "My important bug",
                "description": "My important bug",
                "date_modified": "Saturday, 17. September 2022 08:24PM",
                "closed": True,
            }
        }


class UserModel(BaseModel):
    user_id: str = Field(default_factory=uuid.uuid4, alias="_id")
    user_name: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "user_name": "myusername",
            }
        }


class UpdateUserModel(BaseModel):
    user_name: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "user_name": "kitten",
            }
        }
