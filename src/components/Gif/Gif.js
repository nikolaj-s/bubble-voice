import React from 'react'

import ReactFreezeframe from 'react-freezeframe';
import { useSelector } from 'react-redux';
import { selectAppFocusedState, selectEnableGifsOutOfFocusInRoom } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import "./Gif.css";

export const Gif = ({gif, location = "", objectFit = 'contain', width = '100%', height = '100%', overlay = false, alt_trigger = false, borderRadius = 15, cursor = 'default', expand = () => {}, maxHeight = '100%', id, active, posistion, zIndex = 0}) => {
    
    const gifRef = React.useRef();
    
    const focused = useSelector(selectAppFocusedState);

    const allowAnimationOutofFocus = useSelector(selectEnableGifsOutOfFocusInRoom);

    const [loading, toggleLoading] = React.useState(true);

    const [gifToDisplay, setGifToDisplay] = React.useState("");
    
    React.useEffect(() => {

        if (focused) gifRef.current.start();

        if (alt_trigger) {

            if (!allowAnimationOutofFocus && !focused) return;

            if (focused) gifRef.current.start();

            if (active) {
                gifRef?.current?.start();
            } else {
                gifRef?.current?.stop();
            }
        }
    }, [active, allowAnimationOutofFocus, focused])

    React.useEffect(() => {

        if (alt_trigger) return;

        if (focused) {
            gifRef?.current?.start();
        } else {
            gifRef?.current?.stop();
        }

    }, [focused])

    React.useEffect(() => {

        setGifToDisplay(gif);

    }, [gif])

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
            <ReactFreezeframe
            key={gifToDisplay + location}
            style={{
                objectFit: objectFit,
                borderRadius: borderRadius,
                overflow: 'hidden'
            }}
            options={{
                overlay: overlay,
                responsive: true,
                trigger: false
            }}
            src={gifToDisplay} 
            ref={gifRef} />
        </div>
        
        </>
    )
}
