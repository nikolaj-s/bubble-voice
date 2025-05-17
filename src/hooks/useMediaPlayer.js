import React, {useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../context/SocketContext';
import { setMediaPlayerLoadingState } from '../features/MediaPlayer/mediaPlayerSlice';
import { triggerAlert } from '../features/Alerts/alertsSlice';

/**
 * Custom hook for controlling the media player state.
 *
 * @returns {{
*   toggleIsPlaying: () => Promise<void>,
*   next: () => Promise<void>,
*   seek: (value: number) => Promise<void>,
*   isPlaying: boolean,
*   currentTime: number,
*   volume: number,
*   loading: boolean,
*   error: string|null,
*   isMuted: boolean,
*   hasAudio: boolean,
*   currentlyPlaying: object|null,
*   hideMediaPlayer: boolean,
*   enabled: boolean
* }} Hook object with media player controls and current state.
*/

export const useMediaPlayer = () => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const playerState = useSelector(state => state.mediaPlayerSlice);

    const {loading} = useSelector(state => state.mediaPlayerSlice);
    
    const toggleIsPlaying = useCallback(async () => {
      try {
        
        if (loading || !playerState.enabled) return;

        dispatch(setMediaPlayerLoadingState(true));
        
        await socket.request('media-widget/toggle-playing', !playerState.isPlaying);

        dispatch(setMediaPlayerLoadingState(false));
        return;
      } catch (err) {
        console.warn('Failed to play media:', err);
      }

      dispatch(setMediaPlayerLoadingState(false));
    }, [socket, loading, dispatch, playerState])

    const next = useCallback(async () => {
            try {
    
                if (loading || !playerState.enabled) return;
    
                dispatch(setMediaPlayerLoadingState(true));
    
                await socket.request('media-widget/skip-media');
    
                dispatch(setMediaPlayerLoadingState(false));
    
                return;
    
            } catch (error) {
    
                console.warn('failed to skip media:', error);
            }
    
            dispatch(setMediaPlayerLoadingState(false));
    }, [socket, dispatch, loading, playerState])

    const seek = useCallback(async (value) => {
        try {

        if (loading || !playerState.enabled) return;

        dispatch(setMediaPlayerLoadingState(true));

        await socket.request('media-widget/seek', value);

        } catch (err) {
            dispatch(triggerAlert("Error Seeking Media", 'error'))
        }

        dispatch(setMediaPlayerLoadingState(false));

    }, [socket, dispatch, loading, playerState])  

    return {...playerState, toggleIsPlaying, seek, next}
}
