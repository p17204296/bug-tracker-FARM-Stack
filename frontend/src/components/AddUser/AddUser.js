import React, { useState, useEffect } from "react";
import EditUserPopup from './EditUserPopup';

import "./AddUser.css";
import 'bootstrap/dist/css/bootstrap.min.css'


function AddUser() {
  // const [addUser, setAddUser] = useState(true);

  const [user_name, setUserName] = useState('')
  const [active, setActive] = useState('')


  // Post a user
  const addUserHandler = async () => {
    if (user_name !== "") {
      await fetch("/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_name,
          active: true,
        }),
      })
    }
    // const userItems = map_user
    // setUsersList(userItems)
  }


  const [usersList, setUsersList] = useState([{}])

  // Change Username
  const changeUserName = async (userId, user_name) => {
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
  // Delete user
  const deleteUser = async (userId) => {
    await fetch(`/users/${userId}`, {
      method: "DELETE",
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


  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // Fetch one user
  // const [selectedUser, setSelectedUser] = useState([])
  // useEffect(() => {
  //   const fetchOneUser = async (userId) => {
  //     const response = await fetch(`/users/${userId}`, {
  //       method: "GET",
  //     })
  //     const fetchedUsers = await response.json()
  //     setSelectedUser(fetchedUsers)
  //     console.log(fetchedUsers)
  //   } 

  //   const interval = setInterval(fetchOneUser, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  // Change User Details
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


  // const edit_user = selectedUser.map((user) => {
  //   // setIsOpen(!isOpen);
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


  const map_users = usersList.reverse().map((user) => {
    return user._id ? (

      <div className="indv-user">
        <input type="hidden" value={user._id} id="userIdentifier" />
        <p className="delete-user" onClick={() => deleteUser(user._id)}>Delete User</p>
        <p className="edit-user" onClick={togglePopup}>Edit User</p>
        <p>
          Username<span>{user.user_name}</span>
        </p>
        <p>
          User Status:<span>{user.active ? "Active" : "Inactive"}</span>
        </p>
        <hr />
      </div>) :
      (
        <div className="indv-user">
          <p>There are no Users</p>
          <hr />
        </div>
      )

  })



  return (
    <div className="add-issue">
      <form>
        <label>
          Username
          <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Username of User..." required />
        </label>
        <button type="submit" onClick={addUserHandler}>Add User</button>
      </form>
      <hr />
      <h5 className="card text-white bg-dark bg-gradient mb-3 pb-1 pt-1">List of Users</h5>
      <div className="current-users">
        {map_users}
        {isOpen && <EditUserPopup handleClose={togglePopup} />}
        {/* {isOpen && edit_user} */}
      </div>

    </div>
  );
}

export default AddUser;
