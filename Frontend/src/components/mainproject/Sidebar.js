import React from 'react';
import "../../styles/mainProjectStyle/sidebar.css";
import Dashboard from "../Dashboard";
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='feature'>
        <a href="/Dashboard"> Dashboard</a>
        <a href="#">Create Project</a>
        <a href="#">Add Member</a>
        <a href="#">Assign Project</a>
        <a href="#">Manage Task</a>
      </div>
    </div>
  )
}

export default Sidebar