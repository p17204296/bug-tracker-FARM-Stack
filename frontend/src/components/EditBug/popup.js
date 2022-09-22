import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./EditBug.css";
import 'bootstrap/dist/css/bootstrap.min.css'


const Popup = props => {

  const [editBug, setEditBug] = useState(true);


  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [desc, setDesc] = useState('')
  const [closed, setClosed] = useState('')


  // Fetch Username for "Assigned To" Dropdown Feild
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch data
      const { data } = await axios.get("/users/");
      const results = []
      // Store results in the results array
      data.forEach((value) => {
        results.push({
          key: value.user_name,
          value: value._id,
        });
      });
      // Update the options state
      setOptions([
        { key: 'Select an assignee', value: '' },
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);


  const [bugsList, setBugsList] = useState([{}])

  // Change Bug Status
  const editBugHandler = async (bugId, status) => {
    await fetch(`/bugs/${bugId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        assignee: assignee,
        description: desc,
        closed: closed,
      }),
    })
  }
  // Delete bug
  const deleteBug = async (bugId) => {
    await fetch(`/bugs/${bugId}`, {
      method: "DELETE",
    })
  }


  // Fetch all bugs 
  // useEffect(() => {
  //   const fetchAllBugs = async () => {
  //     const response = await fetch("/bugs/")
  //     const fetchedBugs = await response.json()
  //     setBugsList(fetchedBugs)
  //   }

  //   const interval = setInterval(fetchAllBugs, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])


  return (
    <div className="App grey-card-contianer">
      <div className="popup-box">
        <div className="box">
          <h2> Edit Issue </h2>
          <span className="close-icon" onClick={props.handleClose}>x</span>
          <div className="add-issue">
            <form>
              <label>
                Title
                {/* <input type="text" onChange={event => setTitle(event.target.value)} placeholder="Title of Bug..." value={selectedBug.title} required /> */}
                <input type="text" onChange={event => setTitle(event.target.value)} placeholder="Title of Bug..." required />
              </label>
              <label>
                Assign To
                <select onChange={event => setAssignee(event.target.value)}>
                  {options.map((option) => {
                    return (
                      <option key={option.value} value={option.key}>
                        {option.key}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                Description
                <input type="text" onChange={event => setDesc(event.target.value)} placeholder="Description of Bug..." required />
              </label>
              <button type="submit" onClick={editBugHandler}>Edit Bug</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;