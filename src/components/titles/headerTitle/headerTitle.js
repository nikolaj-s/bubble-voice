// library's
import React from 'react';

// style's
import "./headerTitle.css";

export const HeaderTitle = ({title, textAlign = 'center'}) => {
  return (
    <div className='header-title-container'>
        <h2 style={{textAlign: textAlign}}>{title}</h2>
    </div>
  )
}
