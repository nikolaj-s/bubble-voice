import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSocket } from '../../context/SocketContext';
import { 
    setMediaPlayerLoadingState,
    toggleMediaPlaying,
    addMediaToQueue,
    playNextInQueue,
    resetMediaPlayer,
    setCurrentChannel,
    incrementCurrentTime,
    setCurrentlyPlaying,
    addMultipleToQueue,
    enableMediaPlayer,
    reorderQueue,
    setColor

} from '../../features/MediaPlayer/mediaPlayerSlice';
import { fetchSavedMedia } from '../../features/MediaPlayer/Thunks/fetchSavedMedia';
import { getImageColor } from '../../lib/services/getImageColor';

export const MediaPlayerProvider = ({children}) => {

    const dispatch = useDispatch();

    const socket = useSocket();

    const {loading, currentlyPlaying} = useSelector(state => state.mediaPlayerSlice);

    const {currentVoiceChannel: channelId} = useSelector(state => state.voiceChannelSlice);

    React.useEffect(() => {
    
      if (currentlyPlaying?.thumbnail) {
        try {
          getImageColor(currentlyPlaying.thumbnail).then(res => {
              if (res?.hex) {
                  dispatch(setColor(res.hex));
              } else {
                  dispatch(setColor(null));
              }
              return;
          })
        } catch (err) {
          dispatch(setColor(null));
        }

      } else {
          dispatch(setColor(null));
      }
    
    }, [currentlyPlaying, dispatch])

    const setMedia = React.useCallback(async () => {
          try {
    
            if (loading || !channelId) return;
    
            dispatch(setMediaPlayerLoadingState(true));
    
            const res = await socket.request('media-widget/details', { channel_id: channelId });
            
            if (res) {
              dispatch(setCurrentlyPlaying(res.currentlyPlaying));
              dispatch(addMultipleToQueue(res.queue || []));
              dispatch(toggleMediaPlaying(res.playing));
              dispatch(incrementCurrentTime(res.currentTime))
            }

            dispatch(fetchSavedMedia(channelId));
    
            dispatch(setMediaPlayerLoadingState(false));
    
          } catch (err) {
            console.warn('Failed to fetch media state:', err);
          }
    
          dispatch(setMediaPlayerLoadingState(false));
    
    }, [socket, dispatch, channelId, loading]);

    React.useEffect(() => {
    
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

            const handleReorder = (data) => {
              dispatch(reorderQueue(data));
            }
    
            socket
            .request('media-widget/check', { channel_id: channelId })
            .then((res) => {
              if (res?.enabled) {
                
                dispatch(enableMediaPlayer(true));
            
                // Setup listeners
                socket.on(`media-widget/toggle-playing/${channelId}`, handleTogglePlaying);
                
                socket.on(`media-widget/new-media/${channelId}`, handleNewMedia);
        
                socket.on(`media-widget/remove-from-queue/${channelId}`, handleRemoveMediaFromQueue);
        
                socket.on(`media-widget/seek/${channelId}`, handleSeek);
    
                socket.on(`media-widget/skipped-media/${channelId}`, handleSkip);

                socket.on(`media-widget/re-order/${channelId}`, handleReorder)
        
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

                socket.off(`media-widget/re-order/${channelId}`, handleReorder);
    
                dispatch(resetMediaPlayer());
    
            };

        }, [socket, channelId, dispatch]);

    return (
        <>
        {children}
        </>
    )
}
