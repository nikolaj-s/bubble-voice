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
  } from '../features/Channel/MediaPlayer/mediaPlayerSlice';

  import { useSocket } from './SocketContext';
    
  import { setMediaPlayerLoadingState } from '../features/Channel/MediaPlayer/mediaPlayerSlice';
  
  const MediaPlayerContext = createContext(null);
  
  export const MediaPlayerProvider = ({ children, channelId }) => {
    const dispatch = useDispatch();

    const socket = useSocket();

    const initialized = useRef(false);

    const [enabled, setEnabled] = useState(false);
  
    const playerState = useSelector((state) => state.mediaPlayerSlice);

    const {loading} = useSelector(state => state.mediaPlayerSlice);
  
    // === Server-driven actions ===
    const toggleIsPlaying = useCallback(async () => {
      try {
        
        if (loading) return;

        dispatch(setMediaPlayerLoadingState(true));
        
        await socket.request('media-widget/toggle-playing');

        dispatch(setMediaPlayerLoadingState(false));
        return;
      } catch (err) {
        console.warn('Failed to play media:', err);
      }

      dispatch(setMediaPlayerLoadingState(false));
    }, [socket, loading, dispatch]);

    const next = useCallback(async () => {
        try {

            if (loading) return;

            dispatch(setMediaPlayerLoadingState(true));

            await socket.request('media-widget/skip');

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
        
        if (res) {
          dispatch(setCurrentlyPlaying(res.currentlyPlaying));
          dispatch(addMultipleToQueue(res.queue || []));
        }

        dispatch(setMediaPlayerLoadingState(false));

      } catch (err) {
        console.warn('Failed to fetch media state:', err);
      }

      dispatch(setMediaPlayerLoadingState(false));

    }, [socket, dispatch, channelId, loading]);
  
    // === Initialization: only if channel has media widget ===
    useEffect(() => {

        if (!socket || !channelId) return;

        const handleTogglePlaying = (data) => {
            console.log(data);
        }

        const handleNewMedia = (data) => {
            dispatch(addMediaToQueue(data.media));
        }

        const handleRemoveMediaFromQueue = (data) => {
            console.log(data);
        }

        const handleSeek = (data) => {
            console.log(data);
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

            socket.off(`media-widget/skipped-media/${channelId}`, handleSkip)

        //  dispatch(resetMediaPlayer());

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
  