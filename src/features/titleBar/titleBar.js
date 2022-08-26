import React from 'react'

import { Title } from '../../components/titles/title/title';

import "./titleBar.css";

import { WindowControls } from './WindowControls/WindowControls';

export const TitleBar = () => {
  return (
    <div className='title-bar'>
        <Title />
        <WindowControls />
    </div>
  )
}
