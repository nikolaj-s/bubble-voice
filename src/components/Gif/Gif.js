import React from 'react'

import { useSelector } from 'react-redux';
import { selectAppFocusedState, selectEnableGifsOutOfFocusInRoom } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import "./Gif.css";

export const Gif = ({gif, gifFrame, location = "", objectFit = 'contain', width = '100%', height = '100%', overlay = false, alt_trigger = false, borderRadius = 15, cursor = 'default', expand = () => {}, maxHeight = '100%', id, active, posistion, zIndex = 0}) => {
    
    const gifRef = React.useRef();
    
    const focused = useSelector(selectAppFocusedState);

    const allowAnimationOutofFocus = useSelector(selectEnableGifsOutOfFocusInRoom);

    const [loading, toggleLoading] = React.useState(true);

    const [playing, togglePlaying] = React.useState(false);
    
    React.useEffect(() => {

        if (alt_trigger) {

            if (!allowAnimationOutofFocus && !focused) return;

            if (active) {
                togglePlaying(true);
            } else {
                togglePlaying(false);
            }
        }
    }, [active, allowAnimationOutofFocus, focused])

    React.useEffect(() => {

        if (alt_trigger) return;

        if (focused) {
            togglePlaying(true);
        } else {
            togglePlaying(false);
        }

    }, [focused])

    return (
        <>
        <div 
        id={id}
        onClick={() => {expand(gif)}}
        style={{
            width: width,
            height: height,
            overflow: 'hidden',
            borderRadius: borderRadius,
            cursor: cursor,
            maxHeight: maxHeight,
            objectFit: objectFit,
            position: posistion,
            zIndex: zIndex
        }}
        className='gif-container-wrapper'>
            <img 
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }}
            src={playing ? gif : gifFrame} />
        </div>
        
        </>
    )
}
