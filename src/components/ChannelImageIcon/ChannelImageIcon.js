import React from 'react'
import { Image } from '../Image/Image'

import "./ChannelImageIcon.css";

export const ChannelImageIcon = ({image}) => {
  return (
    <div className='channel-icon-image-wrapper'>
        <Image cursor='pointer' objectFit='cover' image={image} />
    </div>
  )
}
