import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannelId, selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError } from '../../../ServerSlice';
import { addNewWidgetOverlayToQueue } from '../RoomActionOverlay/RoomActionOverlaySlice';

export const Music = () => {

    // handling of music

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [init, setInit] = React.useState(false);

    const musicQueue = useSelector(selectMusicQueue);

    const musicPlaying = useSelector(selectMusicPlayingState);

    const volume = useSelector(selectMusicVolume);

    const channelId = useSelector(selectCurrentChannelId);
 
    React.useEffect(() => {

        const musicPlayer = document.getElementById('room-music-player');

        if (musicPlaying === true) {
            musicPlayer.play()
        } else if (musicPlaying === false) {
            document.getElementById('room-music-player').pause()
        }

    // eslint-disable-next-line
    }, [musicPlaying])

    React.useEffect(() => {

        if (musicQueue[0]?.url !== currentlyPlaying) {

            setCurrentlyPlaying(musicQueue[0]?.url);

            if (window.location.hash.includes(channelId)) {
                if (musicQueue[0]?.url !== undefined) {

                    dispatch(addNewWidgetOverlayToQueue({action: 'now-playing', image: musicQueue[0]?.thumbnail, name: musicQueue[0]?.title}));
                
                }
            
            }

        }    
    // eslint-disable-next-line    
    }, [musicQueue])

    // handle on volume change
    React.useEffect(() => {

        document.getElementById('room-music-player').volume = volume;
    // eslint-disable-next-line
    }, [volume])

    const syncInitial = (e) => {
        setTimeout(() => {
            if (musicQueue[0]?.current && init === false && e.target.src) {
                e.target.currentTime = musicQueue[0].current;
                setInit(true);
            }
        }, 20)   
    }

    const handleStreamError = () => {
        if (musicQueue.length === 0) return;

        dispatch(throwMusicError({error: true, errorMessage: `error streaming access to ${musicQueue[0].title} has been rejected`}));

    }

    return (
        <>
        <audio onError={handleStreamError} onPlay={syncInitial}  id='room-music-player' autoPlay={true} src={`https://bubble-music.herokuapp.com/audio-stream?song=${currentlyPlaying}`} />
        </>
    )
}
