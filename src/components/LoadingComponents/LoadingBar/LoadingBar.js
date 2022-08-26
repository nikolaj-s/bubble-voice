
// library's
import React from 'react';

// style
import "./LoadingBar.css";

export const LoadingBar = ({percent = 0}) => {
    
    return (
        <div className='loading-bar-container'>
            <progress max="100" value={`${percent}`} />
        </div>
    )
}
