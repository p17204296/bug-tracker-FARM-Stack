from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from .models import UserModel, UpdateUserModel

router = APIRouter()


# ---- USER ROUTERS ----
@router.post("/", response_description="Add new user")
async def create_user(request: Request, user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_user = await request.app.mongodb["users"].insert_one(user)
    created_user = await request.app.mongodb["users"].find_one(
        {"_id": new_user.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


@router.get("/", response_description="List all users")
async def list_users(request: Request):
    users = []
    for doc in await request.app.mongodb["users"].find().to_list(length=100):
        users.append(doc)
    return users


@router.get("/{user_id}", response_description="Get a single user")
async def show_user(user_id: str, request: Request):
    # Assignment and Conditional Check
    if (user := await request.app.mongodb["users"].find_one({"_id": user_id})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"User {user_id} not found")


@router.put("/{user_id}", response_description="Update a user")
async def update_user(user_id: str, request: Request, user: UpdateUserModel = Body(...)):
    user = {key: value for key, value in user.dict().items() if value is not None}

    if len(user) >= 1:
        update_result = await request.app.mongodb["users"].update_one(
            {"_id": user_id}, {"$set": user}
        )

        if update_result.modified_count == 1:
            if (
                    updated_user := await request.app.mongodb["users"].find_one({"_id": user_id})
            ) is not None:
                return updated_user

    if (
            existing_user := await request.app.mongodb["users"].find_one({"_id": user_id})
    ) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"User {user_id} not found")


@router.delete("/{user_id}", response_description="Delete User")
async def delete_user(user_id: str, request: Request):
    delete_result = await request.app.mongodb["users"].delete_one({"_id": user_id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"User {user_id} not found")
