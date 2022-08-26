// library's
import React from 'react'
import { useRoutes } from 'react-router';
import { useSelector } from 'react-redux';

// state
import { selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./NoServerSelectedDisplay.css";

const NoServer = () => {

  const color = useSelector(selectTextColor)

  return (
    <div className='no-server-selected-display'>
        <h1 style={{color: color}}>No Server Selected</h1>
        <h3 style={{color: color}}>Join or Create a Server</h3>
    </div>
  )
}


export const NoServerSelectedDisplay = () => useRoutes([
  {path: "", element: <NoServer />}
])