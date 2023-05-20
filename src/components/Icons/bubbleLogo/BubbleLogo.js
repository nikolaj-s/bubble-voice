// library
import React from 'react';
// style
import "./BubbleLogo.css";

export const BubbleLogo = ({action}) => {

    return (
        <div
        onClick={action} className='logo-container'>
          <svg width="702" height="702" viewBox="0 0 702 702" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="351" cy="351" r="335" transform="rotate(-107.587 351 351)" fill="rgba(255, 255, 255, 1)" fill-opacity="1" stroke="black" stroke-width="30"/>
<ellipse cx="254.611" cy="113.359" rx="29.5" ry="95.393" transform="rotate(-121.817 254.611 113.359)" fill="black"/>
<circle cx="130.247" cy="218.247" r="22.5" transform="rotate(-107.587 130.247 218.247)" fill="black"/>
</svg>



        </div>
    )
}
