import React from 'react'
import { useSelector } from 'react-redux'
import { selectHideUserStatus, selectMiscSettingsHideChannelBackground } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice'
import { selectRoomColor } from '../../features/server/ServerSlice'
import { selectBehindState } from '../../features/server/ChannelRoom/Room/Music/MusicSlice'

export const RoomAmbiance = () => {


    const [size, setWidth] = React.useState({w: 0, h: 0})

    const channelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const roomColor = useSelector(selectRoomColor);

    const behind = useSelector(selectBehindState);

    const hideStatusBar = useSelector(selectHideUserStatus);

    const resize = () => {
        const el = document.getElementsByClassName('room-wrapper-outer')[0];

        if (el) {
            setWidth({w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height})
        }

        setTimeout(() => {
            const el = document.getElementsByClassName('room-wrapper-outer')[0];

            if (el) {
                setWidth({w: el.getBoundingClientRect().width, h: el.getBoundingClientRect().height})
            }
        }, 100)
    }

    React.useEffect(() => {

        setTimeout(() => {
            resize();
        }, )
        
    }, [behind])

    React.useEffect(() => {
        setTimeout(() => {
            resize();
        }, )
    }, [hideStatusBar])

    React.useEffect(() => {

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        }

    }, [])

    return (
        <>
        {!channelBackground ?
        <div className='room-ambiance-background' style={{opacity: 1,zIndex: 0,boxShadow: `0 0 40px 40px ${roomColor}`,width: size.w, position: 'fixed', left: 269, top: 31, height: size.h, borderRadius: 20}}>

        </div> : null}
        </>
    )
}
