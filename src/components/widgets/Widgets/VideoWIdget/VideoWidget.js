import React from 'react'
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
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
            
        } else if (widget.content.text.includes('vimeo')) {
                        
            iFrame = "https://player.vimeo.com/video/" + widget.content.text.split('com/')[1].split('/').join('?h=');

        } else if (widget.content.text.includes('erothots')) { 

            iFrame = "https://erothots.co/embed/video/" + widget.content.text.split('video/')[1].split('/')[0];

        } 
        
        else {
            iFrame = null;
        }

        setNonVideo(iFrame);

    }, [widget])
    
    const secondaryColor = useSelector(selectSecondaryColor);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    return (
        <div style={{backgroundColor: disableTransparancyEffects ? secondaryColor : `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}} className='video-widget-container' >
            {nonVideo ?
            <Iframe link={nonVideo} />
            : 
            <Video  mutedToggled={widget.content.audio} video={widget.content.text} looping={widget.content.looping} />}
        </div>
    )
}
