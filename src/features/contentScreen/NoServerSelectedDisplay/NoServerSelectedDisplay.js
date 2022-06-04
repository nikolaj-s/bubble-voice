// library's
import React from 'react'
import { useRoutes } from 'react-router';

// style's
import "./NoServerSelectedDisplay.css";

const NoServer = () => {
  return (
    <div className='no-server-selected-display'>
        <h1>No Server Selected</h1>
        <h3>Join or Create a Server</h3>
    </div>
  )
}


export const NoServerSelectedDisplay = () => useRoutes([
  {path: "", element: <NoServer />}
])