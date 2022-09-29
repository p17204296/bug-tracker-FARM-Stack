import React, { useState, useEffect } from "react";
import Popup from '../EditBug/popup';


import "./DetailedBug.css";

function DetailedBug() {

  const [bugsList, setBugsList] = useState([{}])
  const [isOpen, setIsOpen] = useState(false);
  const [popUpID, setPopUpID] = useState('')


  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  function newTogglePopup(bugId) {
    setIsOpen(!isOpen);
    setPopUpID(bugId);
  }

  // Fetch all bugs 
  useEffect(() => {
    const fetchAllBugs = async () => {
      const response = await fetch("/bugs/")
      const fetchedBugs = await response.json()
      setBugsList(fetchedBugs)
    }

    const interval = setInterval(fetchAllBugs, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  // Change Bug Status
  const changeBugStatus = async (bugId, status) => {
    await fetch(`/bugs/${bugId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        closed: status,
      }),
    })
  }
  // Delete bug
  const deleteBug = async (bugId) => {
    await fetch(`/bugs/${bugId}`, {
      method: "DELETE",
    })
  }

  const [selectedBug, setSelectedBug] = useState([])
  // Fetch one bug
  const fetchOneBug = async (bugId) => {
    const response = await fetch(`/bugs/${bugId}`, {
      method: "GET",
    })
    const fetchedBug = await response.json()
    setSelectedBug(fetchedBug)
  }


  const map_bugs = bugsList.reverse().map((bug) => {
    return bug._id ? (

      <div className="indv-bug">
        <input type="hidden" value={bug._id} id="bugIdentifier" />
        <p className="delete-bug" onClick={() => deleteBug(bug._id)}>Delete Bug</p>
        {
          bug.closed ?
            <p className="close-bug"
              onClick={() => changeBugStatus(bug._id, false)}>Open Bug</p> :
            <p className="close-bug"
              onClick={() => changeBugStatus(bug._id, true)}>Close Bug</p>
        }
        <p className="edit-bug" onClick={() => newTogglePopup(bug._id)}>Edit Bug</p>
        <p>
          Title<span>{bug.title}</span>
        </p>
        <p>
          Assigned To:<span>{bug.assignee}</span>
        </p>
        <p>
          Date Created:<span>{bug.date_created}</span>
        </p>
        <p>
          Last Modified:<span>{bug.date_modified}</span>
        </p>
        <p>
          Bug Status:<span>{bug.closed ? "Closed" : "Open"}</span>
        </p>
        <p>Description</p>
        <p className="description-text">
          {bug.description}
        </p>
        <hr />
      </div>) :
      (
        <div className="indv-bug">
          <p>There are no Bugs</p>
          <hr />
        </div>
      )

  })

  return (

    <div className="current-bugs">
      {map_bugs}
      {isOpen && <Popup handleClose={togglePopup} bugId={popUpID} />}
    </div>
  );
}

export default DetailedBug;
