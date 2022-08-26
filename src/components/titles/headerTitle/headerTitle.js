// library's
import React from 'react';
import { useSelector } from 'react-redux';

// state
import {selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./headerTitle.css";

export const HeaderTitle = ({title, textAlign = 'center', spacing = false}) => {

  const color = useSelector(selectTextColor)

  return (
    <>
    
    <div 
    style={{width: spacing ? "calc(100% - 140px)" : '100%'}}
    className='header-title-container'>
        {spacing ? <div style={{maxWidth: 140, flexShrink: 4, width: '100%'}} ></div> : null}
        <h2 style={{textAlign: textAlign, color: color, minWidth: 0}}>{title}</h2>
    </div>
    </>
  )
}
