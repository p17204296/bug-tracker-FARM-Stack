import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  // -------  USERS  -------
  const [usersList, setUsersList] = useState([{}])
  const [usermame, setUsername] = useState('') 

  // Read all users
  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setBugsList(res.data)
      })
  });

  // Post a user
  const addUserHandler = () => {
    axios.post('http://localhost:8000/api/users/', { 'username': usermame,})
      .then(res => console.log(res))
};

  // Update a user
  const updateUserHandler = () => {
    axios.post('http://localhost:8000/api/users/', { 'username': usermame,})
      .then(res => console.log(res))
};  

  // -------  Bugs  -------
  const [bugsList, setBugsList] = useState([{}])
  const [title, setTitle] = useState('') 
  const [assignee, setAssignee] = useState('') 
  const [desc, setDesc] = useState('')
  const [closed, setClosed] = useState('')
  
  
  // Read all bugs
  useEffect(() => {
    axios.get('http://localhost:8000/api/bugs')
      .then(res => {
        setBugsList(res.data)
      })
  });

  // Post a bug
  const addBugHandler = () => {
    axios.post('http://localhost:8000/api/bugs/', { 'title': title, 'assignee': assignee, 'description': desc })
      .then(res => console.log(res))
};

  // Update a bug
  const updateBugHandler = () => {
    axios.post('http://localhost:8000/api/bugs/', { 'title': title, 'assignee': assignee, 'description': desc, 'closed': closed, })
      .then(res => console.log(res))
};


  return (

    <div className="App list-group-item  justify-content-center align-items-center mx-auto" style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}} >
      <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Bug Tracker App</h1>
      <h6 className="card text-white bg-primary mb-3">FASTAPI - React - MongoDB</h6>


      {/* Add Users Form */}
     <div className="card-body bg-light bg-gradient border-dark mb-3">
      <h5 className="card text-white bg-dark bg-gradient mb-3">Add A User</h5>
      <span className="card-text"> 
        <input className="mb-2 form-control titleIn" placeholder='Username'/> 
      <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px',"font-weight":"bold"}}  onClick={addUserHandler}>Add User</button>
      </span>
      <h5 className="card text-white bg-dark bg-gradient mb-3">List of Users</h5>
      <div >
      {/* <UsersView bugsList={usersList} /> */}
      </div>
      </div>

      {/* Add Bugs */}
      <hr />
      <div className="card-body bg-light bg-gradient border-dark mt-3">
      <h5 className="card text-white bg-dark bg-gradient mb-3">Add A Bug</h5>
      <span className="card-text"> 
        <input className="mb-2 form-control titleIn" placeholder='Title'/>
        <input className="mb-2 form-control desIn" placeholder='Assignee'/>
        <input className="mb-2 form-control desIn" placeholder='Description'/>
      <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px',"font-weight":"bold"}}>Add Bug</button>
      </span>
      <h5 className="card text-white bg-dark bg-gradient mb-3">List of Bugs</h5>
      <div >
      {/* <BugsView bugsList={bugsList} /> */}
      </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0" >Copyright 2022, All rights reserved &copy;</h6>
    </div>
  );}

export default App;
