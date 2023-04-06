import React from 'react'

import { DropImageIcon } from '../Icons/DropImageIcon/DropImageIcon';

import "./DropOverlay.css";

export const DropOverlay = ({dropState, action}) => {
  return (
    <>
    {dropState ?
    <div className='drop-overlay-container'>
        <DropImageIcon action={action} />
    </div>
    : null}
    </>
  )
}
