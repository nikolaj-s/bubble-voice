import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectMusicPlayingState, selectMusicQueue, selectMusicVolume, throwMusicError, updateMusicState } from '../../../ServerSlice';

export const Music = () => {

    // handling of music

    const dispatch = useDispatch();

    const [currentlyPlaying, setCurrentlyPlaying] = React.useState("");

    const [init, setInit] = React.useState(false);

    const musicQueue = useSelector(selectMusicQueue);

    const musicPlaying = useSelector(selectMusicPlayingState);

    const volume = useSelector(selectMusicVolume);
 
    React.useEffect(() => {

        const musicPlayer = document.getElementById('room-music-player');

        if (musicPlaying === true) {
            musicPlayer.play()
        } else if (musicPlaying === false) {
            document.getElementById('room-music-player').pause()
        }


    }, [musicPlaying])

    React.useEffect(() => {

        if (musicQueue[0]?.url !== currentlyPlaying) {
            setCurrentlyPlaying(musicQueue[0]?.url);
        }    
        
    }, [musicQueue])

    // handle on volume change
    React.useEffect(() => {

        document.getElementById('room-music-player').volume = volume;

    }, [volume])

    const syncInitial = (e) => {
        if (musicQueue[0]?.current && init === false && e.target.src) {
            e.target.currentTime = musicQueue[0].current;
            setInit(true);
        }
    }

    const handleStreamError = () => {
        if (musicQueue.length === 0) return;

        dispatch(throwMusicError({error: true, errorMessage: `error streaming access to ${musicQueue[0].title} has been rejected`}));

    }

    return (
        <>
        <audio onError={handleStreamError} onPlay={syncInitial}  id='room-music-player' autoPlay={true} src={currentlyPlaying} />
        </>
    )
}
