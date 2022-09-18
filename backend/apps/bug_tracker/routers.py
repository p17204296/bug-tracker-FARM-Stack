from fastapi import APIRouter, Body, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from .models import BugModel, UpdateBugModel, UserModel, UpdateUserModel

router = APIRouter()


@router.post("/", response_description="Add new bug")
async def create_bug(request: Request, bug: BugModel = Body(...)):
    bug = jsonable_encoder(bug)
    new_bug = await request.app.mongodb["bugs"].insert_one(bug)
    created_bug = await request.app.mongodb["bugs"].find_one(
        {"_id": new_bug.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_bug)


@router.get("/", response_description="List all bugs")
async def list_bugs(request: Request):
    bugs = []
    for doc in await request.app.mongodb["bugs"].find().to_list(length=100):
        bugs.append(doc)
    return bugs


@router.get("/{bug_id}", response_description="Get a single bug")
async def show_bug(bug_id: str, request: Request):
    # Assignment and Conditional Check
    if (bug := await request.app.mongodb["bugs"].find_one({"_id": bug_id})) is not None:
        return bug

    raise HTTPException(status_code=404, detail=f"Bug {bug_id} not found")


@router.put("/{bug_id}", response_description="Update a bug")
async def update_bug(bug_id: str, request: Request, bug: UpdateBugModel = Body(...)):
    bug = {key: value for key, value in bug.dict().items() if value is not None}

    if len(bug) >= 1:
        update_result = await request.app.mongodb["bugs"].update_one(
            {"_id": bug_id}, {"$set": bug}
        )

        if update_result.modified_count == 1:
            if (
                    updated_bug := await request.app.mongodb["bugs"].find_one({"_id": bug_id})
            ) is not None:
                return updated_bug

    if (
            existing_bug := await request.app.mongodb["bugs"].find_one({"_id": bug_id})
    ) is not None:
        return existing_bug

    raise HTTPException(status_code=404, detail=f"Bug {bug_id} not found")


@router.delete("/{bug_id}", response_description="Delete Bug")
async def delete_bug(bug_id: str, request: Request):
    delete_result = await request.app.mongodb["bugs"].delete_one({"_id": bug_id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Bug {bug_id} not found")


# ---- USER ROUTERS ----
@router.post("/user", response_description="Add new user")
async def create_user(request: Request, user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_bug = await request.app.mongodb["bugs"].insert_one(user)
    created_bug = await request.app.mongodb["bugs"].find_one(
        {"_id": new_bug.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_bug)


@router.get("/user", response_description="List all users")
async def list_users(request: Request):
    users = []
    for doc in await request.app.mongodb["users"].find().to_list(length=100):
        users.append(doc)
    return users


@router.put("/user{user_id}", response_description="Update a user")
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


@router.delete("/user{user_id}", response_description="Delete User")
async def delete_user(user_id: str, request: Request):
    delete_result = await request.app.mongodb["users"].delete_one({"_id": user_id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"User {user_id} not found")
