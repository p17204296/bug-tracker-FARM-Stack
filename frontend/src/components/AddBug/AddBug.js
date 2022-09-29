import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Timeline } from "antd"
import {
  CheckCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons"

import "./AddBug.css";
import 'bootstrap/dist/css/bootstrap.min.css'


function AddBug() {

  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')
  const [desc, setDesc] = useState('')

  // Post a bug
  const addBugHandler = async () => {
    if (title !== "" & desc !== "") {
      await fetch("/bugs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          assignee: assignee,
          description: desc,
          closed: false,
        }),
      })
    }
  }

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
        { key: 'Select an assignee', value: 'Nobody Assigned' },
        ...results
      ])
    }

    // Trigger the fetch
    fetchData();
  }, []);


  const [bugsList, setBugsList] = useState([{}])
  const [timeline, setTimeline] = useState([])

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

  // Edit Bug Status
  const editBugHandler = async (bugId) => {
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
    })
  }

  // Delete bug
  const deleteBug = async (bugId) => {
    await fetch(`/bugs/${bugId}`, {
      method: "DELETE",
    })
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

  const map_bugs = bugsList.reverse().map((bug) => {
    return bug.closed ? (
      <Timeline.Item
        key={bug._id}
        dot={
          <CheckCircleOutlined
            onClick={() => changeBugStatus(bug._id, false)}
          />
        }
        color="green"
        style={{ textDecoration: "line-through", color: "green" }}
      >
        {bug.assignee} <small>({bug.title})</small>{" "}
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => deleteBug(bug._id)}
        />
      </Timeline.Item>
    ) : (
      <Timeline.Item
        dot={
          <MinusCircleOutlined
            onClick={() => changeBugStatus(bug._id, true)}
          />
        }
        color="blue"
        style={{ textDecoration: "initial" }}
      >
        {bug.assignee} <small>({bug.title})</small>
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => deleteBug(bug._id)}
        />
      </Timeline.Item>
    )
  })

  useEffect(() => {
    const timelineItems = map_bugs
    setTimeline(timelineItems)
  }, [bugsList])

  return (
    <div className="add-issue">
      <form>
        <label>
          Title
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
        <button type="submit" onClick={addBugHandler}>Add Bug</button>
      </form>
      <hr />
      <h5 className="card text-white bg-dark bg-gradient mb-3 pb-1 pt-1">List of Bugs</h5>
      <div className="card text-white bg-gradient mb-3" style={{ 'borderRadius': '50px', "paddingTop": "20px" }}>
        <Timeline mode="alternate">{timeline}</Timeline>
      </div>

    </div>
  );
}

export default AddBug;
