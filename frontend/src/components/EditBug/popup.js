import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./EditBug.css";
import 'bootstrap/dist/css/bootstrap.min.css'


const Popup = props => {

  const bugId = props.bugId
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [desc, setDesc] = useState('')
  const [errors, setErrors] = useState('')
  const [editSuccess, setEditSuccess] = useState('')
  const [bugsList, setBugsList] = useState([{}])

  // Fetch one bug 
  useEffect(() => {
    const fetchOneBug = async () => {
      const response = await fetch(`/bugs/${bugId}`)
      const fetchedBugs = await response.json()
      setBugsList(fetchedBugs)
    }

    const interval = setInterval(fetchOneBug, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Change Bug Status
  const editBugHandler = async (bugId) => {
    if (title !== "" && desc !== "") {

      await fetch(`/bugs/${bugId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          assignee: assignee,
          description: desc,
        }),
      }).then((res) => {
        if (res.ok) {
          console.log("HTTP PUT Request Successful")
          setEditSuccess("You have Sucessfully made the edit")
          setErrors("")
        } else {
          console.log("HTTP PUT Request Unsuccessful")
        }
      }).then((res) => res.JSON).catch(err => console.error(err))

    } else {
      setErrors("Please Ensure you have filed in the required fields")
    }
  }


  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get("/users/").catch(err => console.error(err));
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key: value._id,
          value: value.user_name,
        });
      });
      // Update the options state
      setOptions([
        { key: 'Select an assignee', value: "Unassigned (Default)" },
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);


  return (
    <div className="App grey-card-contianer">
      <div className="popup-box">
        <div className="box" style={{background: "#f6f6f6"}}>
          <div style={{background: "white", padding: "6px 6px 3px 6px"}}>
            <h2> Current Bug Details </h2>
            <p>
              Title:  {bugsList.title}
            </p>
            <p>
              Assigned To: {bugsList.assignee}
            </p>
            <p>Description:</p>
            <p className="description-text">
              {bugsList.description}
            </p>
          </div>

          <h2> Edit Bug </h2>
          <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
          <p style={{ color: "green", textAlign: "center" }}>{editSuccess}</p>
          <span className="close-icon" onClick={props.handleClose}>x</span>
          <div>

          </div>
          <div className="add-issue">
            <form>
              <label>
                Title*
                <input type="text" onChange={event => setTitle(event.target.value)} placeholder="Title of Bug..." required />
              </label>
              <label>
                Assign To
                <select onChange={event => setAssignee(event.target.value)} required>
                  {options.map((option) => {
                    return (
                      <option key={option.key} value={option.value}>
                        {option.value}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Description*
                <input type="text" onChange={event => setDesc(event.target.value)} placeholder="Description of Bug..." required />
              </label>
              <p className="submit-edit-bug" onClick={() => editBugHandler(bugId)} style={{ color: "white", cursor: "pointer", textAlign: "center" }}>Edit Bug</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Popup;