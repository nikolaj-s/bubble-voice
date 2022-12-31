import React from 'react'
import { Iframe } from '../../../Iframe/Iframe';
import { Video } from '../../../Video/Video'

// style
import "./VideoWidget.css"

export const VideoWidget = ({widget, editing}) => {

    const [nonVideo, setNonVideo] = React.useState(false);

    React.useEffect(() => {

        let iFrame;

        if (widget.content.text.includes('redgif')) {
                
            iFrame = "https://redgifs.com/ifr/" + (widget.content.text.split('redgifs.com/')[1]?.includes('watch') ? widget.content.text.split('redgifs.com/')[1]?.split('watch/')[1].toLowerCase() : widget.content.text.split('redgifs.com/')[1]?.split('-')[0].toLowerCase());
        
        } else if (widget.content.text.includes('youtu')) {

            iFrame = "https://www.youtube.com/embed/" + (widget.content.text.split('/')[3].includes('watch?') ? widget.content.text.split('/')[3].split('watch?v=')[1].split('&')[0] : widget.content.text.split('/')[3]);

        } else if (widget.content.text.includes('pornhub')) {

            iFrame = "https://www.pornhub.com/embed/" + (widget.content.text.split('viewkey=')[1])

        } else  if (widget.content.text.includes('xvideos')) {

            iFrame = "https://www.xvideos.com/embedframe/" + (widget.content.text.split('video')[1].split('/')[0]);
            
        } else {
            iFrame = null;
        }

        setNonVideo(iFrame);

    }, [widget])
    
    return (
        <div className='video-widget-container' >
            {nonVideo ?
            <Iframe link={nonVideo} />
            : 
            <Video  mutedToggled={widget.content.audio} video={widget.content.text} looping={widget.content.looping} />}
        </div>
    )
}
