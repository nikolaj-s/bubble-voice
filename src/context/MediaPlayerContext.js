import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useCallback,
    useState,
  } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {
    setCurrentlyPlaying,
    toggleMediaPlaying,
    addMultipleToQueue,
    addMediaToQueue,
    playNextInQueue,
    clearQueue,
    resetMediaPlayer,
    setCurrentChannel,
    incrementCurrentTime
  } from '../features/Channel/MediaPlayer/mediaPlayerSlice';

  import { useSocket } from './SocketContext';
    
  import { setMediaPlayerLoadingState } from '../features/Channel/MediaPlayer/mediaPlayerSlice';
import { triggerAlert } from '../features/Alerts/alertsSlice';
  
  const MediaPlayerContext = createContext(null);
  
  export const MediaPlayerProvider = ({ children, channelId }) => {
    const dispatch = useDispatch();

    const socket = useSocket();

    const [enabled, setEnabled] = useState(false);
  
    const playerState = useSelector((state) => state.mediaPlayerSlice);

    const {loading} = useSelector(state => state.mediaPlayerSlice);
  
    // === Server-driven actions ===
    const toggleIsPlaying = useCallback(async () => {
      try {
        
        if (loading) return;

        dispatch(setMediaPlayerLoadingState(true));
        
        await socket.request('media-widget/toggle-playing', !playerState.isPlaying);

        dispatch(setMediaPlayerLoadingState(false));
        return;
      } catch (err) {
        console.warn('Failed to play media:', err);
      }

      dispatch(setMediaPlayerLoadingState(false));
    }, [socket, loading, dispatch, playerState]);

    const next = useCallback(async () => {
        try {

            if (loading) return;

            dispatch(setMediaPlayerLoadingState(true));

            await socket.request('media-widget/skip-media');

            dispatch(setMediaPlayerLoadingState(false));

            return;

        } catch (error) {

            console.warn('failed to skip media:', error);
        }

        dispatch(setMediaPlayerLoadingState(false));
    }, [socket, dispatch, loading])
  
    const setMedia = useCallback(async () => {
      try {

        if (loading) return;

        dispatch(setMediaPlayerLoadingState(true));

        const res = await socket.request('media-widget/details', { channel_id: channelId });
        console.log(res)
        if (res) {
          dispatch(setCurrentlyPlaying(res.currentlyPlaying));
          dispatch(addMultipleToQueue(res.queue || []));
          dispatch(toggleMediaPlaying(res.playing));
          dispatch(incrementCurrentTime(res.currentTime))
        }

        dispatch(setMediaPlayerLoadingState(false));

      } catch (err) {
        console.warn('Failed to fetch media state:', err);
      }

      dispatch(setMediaPlayerLoadingState(false));

    }, [socket, dispatch, channelId, loading]);

    const seek = useCallback(async (value) => {
      try {

        if (loading) return;

        dispatch(setMediaPlayerLoadingState(true));

        await socket.request('media-widget/seek', value);

      } catch (err) {
        dispatch(triggerAlert("Error Seeking Media", 'error'))
      }

      dispatch(setMediaPlayerLoadingState(false));
    }, [socket, dispatch, loading])  
  
    // === Initialization: only if channel has media widget ===
    useEffect(() => {

        if (!socket || !channelId) return;

        const handleTogglePlaying = (data) => {
          console.log(data)
            dispatch(toggleMediaPlaying(data?.playing));
        }

        const handleNewMedia = (data) => {
            dispatch(addMediaToQueue(data.media));
        }

        const handleRemoveMediaFromQueue = (data) => {
            console.log(data);
        }

        const handleSeek = (data) => {
            dispatch(incrementCurrentTime(data.new_time));
        }

        const handleSkip = (data) => {
            dispatch(playNextInQueue());
        }

        socket
        .request('media-widget/check', { channel_id: channelId })
        .then((res) => {
          if (res?.enabled) {
            
            setEnabled(true);
        
            // Setup listeners
            socket.on(`media-widget/toggle-playing/${channelId}`, handleTogglePlaying);
            
            socket.on(`media-widget/new-media/${channelId}`, handleNewMedia);
    
            socket.on(`media-widget/remove-from-queue/${channelId}`, handleRemoveMediaFromQueue);
    
            socket.on(`media-widget/seek/${channelId}`, handleSeek);

            socket.on(`media-widget/skipped-media/${channelId}`, handleSkip);
    
            dispatch(setCurrentChannel(channelId));
        
            setMedia();

          }
        })
        .catch((err) => {
          console.warn('Media widget check failed:', err);
        });

        return () => {

            socket.off(`media-widget/toggle-playing/${channelId}`, handleTogglePlaying);

            socket.off(`media-widget/new-media/${channelId}`, handleNewMedia);

            socket.off(`media-widget/remove-from-queue/${channelId}`, handleRemoveMediaFromQueue);

            socket.off(`media-widget/seek/${channelId}`, handleSeek);

            socket.off(`media-widget/skipped-media/${channelId}`, handleSkip);

            socket.off(`media-widget/seek/${channelId}`, handleSeek);

            dispatch(resetMediaPlayer());

        };
    }, [socket, channelId, dispatch]);
  
    return (
      <MediaPlayerContext.Provider
        value={{
          enabled,
          ...playerState,
          toggleIsPlaying,
          setMedia,
          next,
          seek
        }}
      >
        {children}
      </MediaPlayerContext.Provider>
    );
  };
  
  export const useMediaPlayer = () => {
    const context = useContext(MediaPlayerContext);
    if (!context) throw new Error('useMediaPlayer must be used within a MediaPlayerProvider');
    return context;
  };
  