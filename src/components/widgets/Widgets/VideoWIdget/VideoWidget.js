import React from 'react'
import { Video } from '../../../Video/Video'

// style
import "./VideoWidget.css"

export const VideoWidget = ({widget, editing}) => {

    return (
        <div className='video-widget-container' >
            <Video video={widget.content.text} looping={widget.content.looping} />
        </div>
    )
}
