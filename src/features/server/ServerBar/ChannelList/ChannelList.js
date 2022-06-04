// library's
import React from 'react'

// component's
import { ChannelTitle } from './ChannelTitle/ChannelTitle'

// style's
import "./ChannelList.css";

export const ChannelList = ({channels, joinChannel}) => {



    return (
        <div className='channel-list-outer-container'>
            <ChannelTitle />
        </div>
    )
}
