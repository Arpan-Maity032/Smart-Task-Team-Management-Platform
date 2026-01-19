import React from 'react';
import "../../styles/mainProjectStyle/sidebar.css";
import { IoSettingsOutline } from "react-icons/io5";
import {Link} from "react-router-dom";
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
      <div className='side-setting'>
        <Link to="#" className='setting-css'><IoSettingsOutline />
        <p>Setting and helps</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar