# bug-tracker-FARM-app
 FastAPI, React, MongoDB
 
## Objectives
The goal is to implement a simple bug tracker. The Requirements of this app:

 - It should be possible to view the list of open bugs, including their
   title
 - It should be possible to view the detail of individual bugs, including
   the title the full description, and when it was opened
 - It should be possible to create bugs
 - It should be possible to close bugs
 - It should be possible to assign bugs to people
 - It should be possible to add people to the system
 - It should be possible to change people's names
 - The web application should look nice
 - The web application should expose some sort of API
 - The data should be stored in a mongodb database

## Set up Back-End
- Install python and pip

- cd into backend directory: `cd .\backend\`
-  **To Install python packages via with pip compile (see below)**
-- enter into command line : `pip install pip-tools`
-- Enter: `Pip-compile`
> This will download the packages using the requirements.in file

- **To Install python packages using the requirements.txt (see below)**
-- Install txt file: `pip install -r requirements.txt`
>  This will download the packages using the requirements.txt file

 - Ensure pymongo[srv], dnspython and python-dotenv are installed. pymongo is required to use run motor and access the mongodb database. python-dotenv is required to use the .env file
 `pip install dnspython`
 `python -m install pymongo[srv]`
 `pip install python-dotenv`

**To Run Backend Server**
Enter in terminal `python .\main.py` 
- Should be running on Port 8000 (http://localhost:8000)
You can see the **API Documentation** at this url: http://localhost:8000/docs#/

## Set up Front-End
- Install NodeJS
- cd out of backend and cd into frontend directory: `cd ..\frontend\`
> **Note**: If you come across problems in powershell enter this command in terminal `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned`
- To install the front end dependencies enter: `npm install`
- Then install yarn using npm `npm install yarn`

**Now you can run the front end server:**
Enter `yarn start` to start the client server
- Should be running on Port 3000 (http://localhost:3000)

## To Run Tests
Ensure you're in the front end dir and enter `npm test`
>  This start the react testing library

Press `a` to run all tests, or run Jest with `--watchAll`.
Watch Usage
Press a to run all tests.
- Press f to run only failed tests.
- Press q to quit watch mode.
- Press p to filter by a filename regex pattern. 
- Press t to filter by a test name regex pattern.
- Press Enter to trigger a test run.