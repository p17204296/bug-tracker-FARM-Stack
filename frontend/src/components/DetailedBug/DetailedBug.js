import React, { useState, useEffect } from "react";
import axios from 'axios'

import "./DetailedBug.css";

function DetailedBug() {
  const [addIssue, setAddIssue] = useState(true);

  const [bugsList, setBugsList] = useState([{}])
  const [timeline, setTimeline] = useState([])
  const [title, setTitle] = useState('') 
  const [assignee, setAssignee] = useState('') 
  const [desc, setDesc] = useState('')
  const [closed, setClosed] = useState('')


  // Read all bugs
  useEffect(() => {
    axios.get('http://localhost:8000/bugs')
      .then(res => {
        setBugsList(res.data)
      })
  });



  return (
    <div className="current-bugs">
      <div className="indv-bug">
        <p className="close-bug">Close Bug</p>
        <p className="edit-bug">Edit Bug</p>
        <p>
          Title<span>This is a Title Example</span>
        </p>
        <p>
          Assigned<span>Username</span>
        </p>
        <p>Description</p>
        <p className="description-text">
          Short description of the project describing the bug. It can
          just be Lorem Ipsum Text but it's got to have something here to just
          add a little bit of text that takes up maybe 2-3 lines.
        </p>
        <hr />
      </div>
      <div className="indv-bug">
      <p>
          Title<span>This is a Title Example</span>
        </p>
        <p>
          Assigned<span>Username</span>
        </p>
        <p>Description</p>
        <p className="description-text">
          Short description of the project describing the bug. It can
          just be Lorem Ipsum Text but it's got to have something here to just
          add a little bit of text that takes up maybe 2-3 lines.
        </p>
        <hr />
      </div>
      <div className="indv-bug">
      <p>
          Title<span>This is a Title Example</span>
        </p>
        <p>
          Assigned<span>Username</span>
        </p>
        <p>Description</p>
        <p className="description-text">
          Short description of the project describing the bug. It can
          just be Lorem Ipsum Text but it's got to have something here to just
          add a little bit of text that takes up maybe 2-3 lines.
        </p>
        <hr />
      </div>
    </div>
  );
}

export default DetailedBug;
