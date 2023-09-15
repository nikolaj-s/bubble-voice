import React from 'react'

import { FileIcon } from '../../Icons/FileIcon/FileIcon';

import "./UploadedFileShare.css";
import { useSelector } from 'react-redux';
import { selectAccentColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const UploadedFileShare = ({video}) => {

  const primaryColor = useSelector(selectAccentColor);

  const handleLink = (e) => {
    e.preventDefault();

      try {

          const ipcRenderer = window.require('electron').ipcRenderer;

          ipcRenderer.send("open-link", {url: video.link});

      } catch (err) {
          window.open(video.link)
      }
  }

  return (
    <a onClick={handleLink} style={{backgroundColor: primaryColor, marginTop: 3}} href={video.link} target='_blank' className='shared-file-container' >
        <FileIcon />
        {video.name}
    </a>
  )
}
