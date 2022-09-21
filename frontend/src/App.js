import "./App.css";

import React, { useState, useEffect } from "react";
import AddBug from "./components/AddBug/AddBug";
import DetailedBug from "./components/DetailedBug/DetailedBug";


function App() {
  const [addBug, setAddBug] = useState(true);

  function showAddBug() {
    if (addBug === true) {
      setAddBug(!addBug);
    }
  }

  function showDetailedBug() {
    if (addBug === false) {
      setAddBug(!addBug);
    }
  }

  return (
    <div className="App">
      <h1>Bug Tracker App - FARM STACK</h1>
      <div className="grey-card-contianer">
        {addBug ? <AddBug /> : <DetailedBug />}
      </div>
      <div className="view-selection-div">
        <button className="view-button active-button" onClick={() => showDetailedBug()}>Add Bug</button>
        <button className="view-button" onClick={() => showAddBug()}>View Bugs</button>
        <button className="view-button active-button" onClick={() => showDetailedBug()}>Add User</button>
        <button className="view-button" onClick={() => showAddBug()}>View Users</button>
      </div>
    </div>
  );
}

export default App;
