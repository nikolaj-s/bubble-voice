// library
import React from 'react';
// style
import "./BubbleLogo.css";

export const BubbleLogo = ({action}) => {

    return (
        <div
        onClick={action} className='logo-container'>
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1818 2.14259C27.5335 -1.45548 39.6526 4.83007 43.2507 16.1818C46.8488 27.5335 40.5632 39.6526 29.2115 43.2507C17.8598 46.8488 5.74065 40.5632 2.14258 29.2115C-1.45549 17.8598 4.83006 5.74066 16.1818 2.14259Z" fill="white" fillOpacity="1" stroke="black"/>
<ellipse cx="16.6209" cy="7.7171" rx="1.8595" ry="6.01299" transform="rotate(-121.817 16.6209 7.7171)" fill="black"/>
<ellipse cx="8.78172" cy="14.3286" rx="1.41826" ry="1.41826" transform="rotate(-107.587 8.78172 14.3286)" fill="black"/>
</svg>




        </div>
    )
}
