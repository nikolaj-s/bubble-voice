// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router';
import { selectAccentColor, selectTextColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
// component's
import "./CreateServerButton.css";

// style's
import "./CreateServerButton.css";

const ServerButton = () => {

    const accentColor = useSelector(selectAccentColor);

    const textColor = useSelector(selectTextColor);

    const navigate = useNavigate();

    const handleCreateServerMenu = () => {
        navigate("/dashboard/createserver")
    }

    return (
        <div 
        onClick={handleCreateServerMenu}
        style={{
            backgroundColor: accentColor
        }}
        className='create-server-button-container'>
            <h3
            style={{color: textColor}}
            >Add Server</h3>
        </div>
    )
}

export const CreateServerButton = () => useRoutes([
    { path: "/", element: <ServerButton /> }
])


