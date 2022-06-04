// library's
import React from 'react'

// component's
import { AddButton } from '../../../../../components/buttons/AddButton/AddButton'

// style's
import "./ChannelTitle.css";

export const ChannelTitle = ({addChannel}) => {
    return (
        <div className='channel-title-container'>
            <h3>CHANNELS</h3>
            <AddButton action={addChannel} />
        </div>
    )
}
