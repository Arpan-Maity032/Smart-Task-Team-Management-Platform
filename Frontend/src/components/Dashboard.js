import React from 'react';
import Sidebar from './mainproject/Sidebar';
import Header from './mainproject/Header';

function Dashboard() {
  return (
    <div style={{margin:0,position:'relative'}}>
      <Header/>
      <div style={{display:"flex"}}>
      <Sidebar/>
      </div>
    </div>
  )
}

export default Dashboard;