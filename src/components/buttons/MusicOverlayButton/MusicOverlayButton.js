import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import "./MusicOverlayButton.css";

export const MusicOverlayButton = ({width, height, action, description, playing = false, borderRadius}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper desc_width={120} borderRadius={borderRadius} description={description} width={width} height={height} action={action} >
            <div className={`music-overlay-button-wrapper ${playing ? 'music-playing-class' : null}`}>
                <span style={{backgroundColor: color}} />
                <span style={{backgroundColor: color}} />
                <span style={{backgroundColor: color}} />
                <span style={{backgroundColor: color}} />
            </div>
        </ButtonAnimationWrapper>
    )
}
