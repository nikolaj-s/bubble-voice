// library's
import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageOverlay } from './MessageOverlay/MessageOverlay';
import { NowPlayingOverlay } from './NowPlayingOverlay/NowPlayingOverlay';

// state
import { removeWidgetActionFromQueue, selectOverlayQueue } from './RoomActionOverlaySlice'
import { SongStatusOverlay } from './SongStatusOverlay/SongStatusOverlay';
import { WheelSpinOverlay } from './WheelSpinOverlay/WheelSpinOverlay';

import "./RoomActionOverlay.css";

export const RoomActionOverlay = ({page}) => {

    const dispatch = useDispatch();

    const overlayQueue = useSelector(selectOverlayQueue);

    const handleOnEnd = () => {

        dispatch(removeWidgetActionFromQueue());

    }

    return (
        <>
        <AnimatePresence mode='wait' >
            <div className='room-action-overlay-wrapper'>
                {overlayQueue.slice(0, 4).map((data, key) => {
                    return (
                    overlayQueue[key]?.action === 'song-status' ? <SongStatusOverlay data={overlayQueue[key]} key={'song-status-overlay'} onEnd={handleOnEnd} /> :
                    overlayQueue[key]?.action === 'wheel-spin' ? <WheelSpinOverlay page={page} key={"wheel-spin-overlay"} data={overlayQueue[key]} onEnd={handleOnEnd} /> : 
                    overlayQueue[key]?.action === 'new-message' ? <MessageOverlay page={page} key={'message-overlay'} data={overlayQueue[key]} onEnd={handleOnEnd} />  : 
                    overlayQueue[key]?.action === 'now-playing' ? <NowPlayingOverlay page={page} data={overlayQueue[key]} onEnd={handleOnEnd} /> : null
                    )
                })}
            </div>
        </AnimatePresence>
        </>
    )
}
