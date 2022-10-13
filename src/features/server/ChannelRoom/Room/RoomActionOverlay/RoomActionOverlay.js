// library's
import { AnimatePresence } from 'framer-motion';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageOverlay } from './MessageOverlay/MessageOverlay';
import { NowPlayingOverlay } from './NowPlayingOverlay/NowPlayingOverlay';

// state
import { removeWidgetActionFromQueue, selectOverlayQueue } from './RoomActionOverlaySlice'
import { WheelSpinOverlay } from './WheelSpinOverlay/WheelSpinOverlay';

export const RoomActionOverlay = () => {

    const dispatch = useDispatch();

    const overlayQueue = useSelector(selectOverlayQueue);

    const handleOnEnd = () => {

        dispatch(removeWidgetActionFromQueue());

    }

    return (
        <>
        <AnimatePresence exitBeforeEnter={true} >
            {overlayQueue[0]?.action === 'wheel-spin' ? <WheelSpinOverlay key={"wheel-spin-overlay"} data={overlayQueue[0]} onEnd={handleOnEnd} /> : null}
            {overlayQueue[0]?.action === 'new-message' ? <MessageOverlay key={'message-overlay'} data={overlayQueue[0]} onEnd={handleOnEnd} />  : null}
            {overlayQueue[0]?.action === 'now-playing' ? <NowPlayingOverlay data={overlayQueue[0]} onEnd={handleOnEnd} /> : null}
        </AnimatePresence>
        </>
    )
}
