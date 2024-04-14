import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import "./MusicOverlayButton.css";

export const MusicOverlayButton = ({width, height, action, description, playing = false, borderRadius, padding, backgroundColor, invert}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper invert={invert} background={backgroundColor} desc_width={80} borderRadius={borderRadius} description={description} width={width} height={height} action={action} padding={padding} >
            <div className={`music-overlay-button-wrapper ${playing ? 'music-playing-class' : null}`}>
                <span className='ind-1' style={{backgroundColor: color}} />
                <span className='ind-2' style={{backgroundColor: color}} />
                <span className='ind-3' style={{backgroundColor: color}} />
                <span className='ind-4' style={{backgroundColor: color}} />
            </div>
        </ButtonAnimationWrapper>
    )
}
