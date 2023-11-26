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

export const RoomActionOverlay = ({page}) => {

    const dispatch = useDispatch();

    const overlayQueue = useSelector(selectOverlayQueue);

    const handleOnEnd = () => {

        dispatch(removeWidgetActionFromQueue());

    }

    return (
        <>
        <AnimatePresence mode='wait' >
            {overlayQueue[0]?.action === 'song-status' ? <SongStatusOverlay data={overlayQueue[0]} key={'song-status-overlay'} onEnd={handleOnEnd} /> : null}
            {overlayQueue[0]?.action === 'wheel-spin' ? <WheelSpinOverlay page={page} key={"wheel-spin-overlay"} data={overlayQueue[0]} onEnd={handleOnEnd} /> : null}
            {overlayQueue[0]?.action === 'new-message' ? <MessageOverlay page={page} key={'message-overlay'} data={overlayQueue[0]} onEnd={handleOnEnd} />  : null}
            {overlayQueue[0]?.action === 'now-playing' ? <NowPlayingOverlay page={page} data={overlayQueue[0]} onEnd={handleOnEnd} /> : null}
        </AnimatePresence>
        </>
    )
}
