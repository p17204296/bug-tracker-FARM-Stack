import React, { useState, useEffect } from "react";
// import "./EditUser.css";
import "./AddUser.css";
import 'bootstrap/dist/css/bootstrap.min.css'


const EditUserPopup = props => {

  const userId = props.userId
  const [user_name, setUserName] = useState('')
  const [errors, setErrors] = useState('')
  const [editSuccess, setEditSuccess] = useState('')

  // Fetch one user 
  useEffect(() => {
    const fetchOneUser = async () => {
      const response = await fetch(`/users/${userId}`)
      const fetchedUsers = await response.json()
      setUsersList(fetchedUsers)
    }

    const interval = setInterval(fetchOneUser, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])



  const [usersList, setUsersList] = useState([{}])

  // Change User Status
  const editUserHandler = async (userId) => {
    if (user_name !== "") {

      await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: user_name,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("HTTP PUT Request Successful")
          setEditSuccess("You have Sucessfully made the edit")
          setErrors("")
        } else {
          console.log("HTTP PUT Request Unsuccessful")
        }
      }).catch(err => console.error(err))

    } else {
      setErrors("Please Ensure you have filed in the required fields")
    }

  }

  return (
    <div className="App grey-card-contianer">
      <div className="popup-box">
        <div className="box" style={{ background: "#f6f6f6" }}>
          <div style={{ background: "white", padding: "6px 6px 3px 6px" }}>
            <h2> Selected User Details </h2>
            <p>
              Username<span>{usersList.user_name}</span>
            </p>
            <p>
              User Status:<span>{usersList.active ? "Active" : "Inactive"}</span>
            </p>
          </div>

          <span className="close-icon" onClick={props.handleClose}>x</span>
          <div style={{ paddingTop: "6px" }}>
            <h2> Edit Username </h2>
            <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
            <p style={{ color: "green", textAlign: "center" }}>{editSuccess}</p>
            <form>
              <label>
                Username
                <input type="text" onChange={event => setUserName(event.target.value)} placeholder="Enter updated Username..." required />
              </label>
              <p className="submit-edit-user" onClick={() => editUserHandler(userId)} style={{ color: "white", cursor: "pointer", textAlign: "center" }}>Edit User</p>
              {/* <button type="submit" onClick={() => editUserHandler(userId)}>Edit User</button> */}
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