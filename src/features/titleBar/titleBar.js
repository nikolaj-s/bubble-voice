import React from 'react'

import { Title } from '../../components/titles/title/title';

import "./titleBar.css";

import { WindowControls } from './WindowControls/WindowControls';
import { useSelector } from 'react-redux';
import { selectServerId } from '../server/ServerSlice';
import { ServerNavigation } from '../server/ChannelRoom/ServerNavigation/ServerNavigation';

export const TitleBar = () => {

    const serverId = useSelector(selectServerId)

    return (
      <div className='title-bar'>
          <Title />
          {serverId ? <ServerNavigation /> : null}
          <WindowControls />
      </div>
    )
}
