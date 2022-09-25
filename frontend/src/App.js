import "./App.css";

import React, { useState, useEffect } from "react";
import AddBug from "./components/AddBug/AddBug";
import DetailedBug from "./components/DetailedBug/DetailedBug";
import AddUser from "./components/AddUser/AddUser";


function App() {
  const [addBug, setAddBug] = useState(true);
  const [addUser, setAddUser] = useState(false);

  function showAddBug() {
    setAddBug(true);
    setAddUser(false);
}

  function showAddUser() {
    setAddUser(true);
    setAddBug(false);
}

  function showDetailedBug() {
    setAddBug(false);
    setAddUser(false);
}

  return (
    <div className="App">
      <h1>Bug Tracker App - FARM STACK</h1>
      <div className="grey-card-contianer">
        {addBug & !addUser ? <AddBug /> : !addBug & !addUser ? <DetailedBug />: <AddUser />}
      </div>
      <div className="view-selection-div">
        <button className="view-button active-button" onClick={() => showAddBug()}>Add Bug</button>
        <button data-testid="viewBugsTab" className="view-button" onClick={() => showDetailedBug()}>View Bugs</button>
        <button data-testid="addUserTab" className="view-button active-button" onClick={() => showAddUser()}>Add User</button>
      </div>
    </div>
  );
}

export default App;
