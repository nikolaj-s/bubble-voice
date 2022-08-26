import React from 'react'
import { useSelector } from 'react-redux';
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import "./title.css";

export const Title = () => {

  const textColor = useSelector(selectTextColor)

  return (
    <>
    <h1 
    style={{color: textColor}}
    id="application-title">BUBBLE</h1>
    </>
  )
}
