// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style's
import "./InputTitle.css";

export const InputTitle = ({title, marginBottom, marginTop, fontSize = '1rem'}) => {
  
  const textColor = useSelector(selectTextColor)

  return (
    <h3 
    style={{
      marginBottom: marginBottom,
      marginTop: marginTop,
      color: textColor,
      fontSize: fontSize
    }}
    className='input-title'>
        {title}
    </h3>
  )
}
