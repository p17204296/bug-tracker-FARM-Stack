import React, { useState, useEffect } from "react";
import axios from 'axios'
// import "./EditUser.css";
import "./AddUser.css";
import 'bootstrap/dist/css/bootstrap.min.css'


const EditUserPopup = props => {

  const [editUser, setEditUser] = useState(true);

  const [user_name, setUserName] = useState('')
  const [assignee, setAssignee] = useState('')
  const [desc, setDesc] = useState('')
  const [closed, setClosed] = useState('')


  // Fetch Username for "Assigned To" Dropdown Feild
  const [options, setOptions] = useState([]);

  const [usersList, setUsersList] = useState([{}])

  // Change User Status
  const editUserHandler = async (userId) => {
    await fetch(`/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
      }),
    })
  }

    // Fetch all users 
    useEffect(() => {
      const fetchAllUsers = async () => {
        const response = await fetch("/users/")
        const fetchedUsers = await response.json()
        setUsersList(fetchedUsers)
      }
  
      const interval = setInterval(fetchAllUsers, 1000)
  
      return () => {
        clearInterval(interval)
      }
    }, [])
  

  // const edit_user = usersList.reverse().map((user) => {
  //   return user._id ? (
  //     <div className="add-issue">
  //       <form>
  //         <label>
  //           Title
  //           {/* <input type="text" onChange={event => setTitle(event.target.value)} placeholder="Title of User..." value={selectedUser.title} required /> */}
  //           <input type="text" onChange={event => setTitle(event.target.value)} placeholder="Title of User..." required />
  //         </label>
  //         <label>
  //           Assign To
  //           <select onChange={event => setAssignee(event.target.value)}>
  //             {options.map((option) => {
  //               return (
  //                 <option key={option.value} value={option.key}>
  //                   {option.key}
  //                 </option>
  //               );
  //             })}
  //           </select>
  //         </label>
  //         <label>
  //           Description
  //           <input type="text" onChange={event => setDesc(event.target.value)} placeholder="Description of User..." required />
  //         </label>
  //         <button type="submit" onClick={editUserHandler}>Edit User</button>
  //       </form>
  //     </div>
  //   ) :
  //     (
  //       <div className="indv-user">
  //         <p>There are no Users</p>
  //         <hr />
  //       </div>
  //     )

  // })

  // const edit_user = usersList.reverse().map((user) => {
  //   return user._id ? (
  //     <div className="add-issue">
  //       <form>
  //         <label>
  //           Username
  //           <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Enter User Name..." required />
  //         </label>
  //         <button type="submit" onClick={editUserHandler}>Edit User</button>
  //       </form>
  //     </div>
  //   ) :
  //     (
  //       <div className="indv-user">
  //         <p>There are no Users</p>
  //         <hr />
  //       </div>
  //     )

  // })


    return (
      <div className="App grey-card-contianer">
        <div className="popup-box">
          <div className="box">
            <h2> Edit Username </h2>
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <div className="add-issue">
              <form>
                <label>
                  Username
                  <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Enter User Name..." required />
                </label>
                <button type="submit" onClick={editUserHandler}>Edit User</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );

  // return (
  //   <div className="App grey-card-contianer">
  //     <div className="popup-box">
  //       <div className="box">
  //         <h2> Edit Username </h2>
  //         <span className="close-icon" onClick={props.handleClose}>x</span>
  //         {edit_user}
  //       </div>
  //     </div>
  //   </div>
  // );


};


export default EditUserPopup;