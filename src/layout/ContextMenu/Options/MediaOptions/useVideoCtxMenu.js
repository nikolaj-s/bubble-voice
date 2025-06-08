import { Bookmark, Download, Link, ListPlus, ListX, Play, PlaySquare } from "lucide-react";
import { useCallback } from "react";
import { copyToClipboard, downloadImage } from "../../../../lib/services/helperFunctions";
import { useMediaPlayer } from "../../../../hooks/useMediaPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../../features/Overlay/overlaySlice";
import { addMediaToPlayer } from "../../../../features/MediaPlayer/Thunks/addMediaToPlayer";
import { toggleIsMediaPlayerOpen } from "../../../../features/MediaPlayer/mediaPlayerSlice";
import { isMediaSaved } from "../../../../features/MediaPlayer/Helpers/isMediaSaved";
import { removeSavedMediaFromPlayer } from "../../../../features/MediaPlayer/Thunks/removeSavedMediaFromPlayer";
import { saveMediaToPlayer } from "../../../../features/MediaPlayer/Thunks/saveMediaToPlayer";
import { expandVideo } from "../../../../features/Media/ExpandedVideo/expandedVideoSlice";
import { triggerAlert } from "../../../../features/Alerts/alertsSlice";

export const useVideoCtxMenu = () => {

    const dispatch = useDispatch();
    
    const {removeMedia} = useMediaPlayer();

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const savedMediaState = useSelector(state => state.savedMediaSlice);

    const { currentVoiceChannel }= useSelector(state => state.voiceChannelSlice);

    const getVideoOptions = useCallback((options, data) => {
        if ((data.video?.src?.includes('.mp4') || data?.video?.url?.includes('youtu')) && data.video.duration && mediaPlayerState.enabled) {
        
            if (!data.video.inQueue) {
                options.push({
                    label: mediaPlayerState.currentlyPlaying ? "Add To Queue" : "Play In Channel",
                    onClick: () => {
                        dispatch(setOverlay('mediaPlayer'));

                        dispatch(addMediaToPlayer(data.video));

                        dispatch(toggleIsMediaPlayerOpen(false));
                    },
                    type: 'button',
                    icon: mediaPlayerState.currentlyPlaying ? <ListPlus color="var(--text-color)" /> : <PlaySquare color="var(--text-color)" />
                })
            }
            
            const saved = isMediaSaved(savedMediaState, currentVoiceChannel, data.video.src);

            options.push({
                label: saved ? `Unsave ${data.video.title}` : `Save ${data.video.title}`,
                onClick: () => {
                    if (saved) {
                        dispatch(removeSavedMediaFromPlayer(data.video._id));
                    } else {
                        dispatch(saveMediaToPlayer(data.video));
                    }
                    
                }, 
                type: 'button',
                icon: <Bookmark fill={saved ? 'var(--text-color)' : 'transparent'} color="var(--text-color)" /> 
            })
        }

        options.push({
            label: "Preview",
            onClick: () => {
                dispatch(expandVideo(data.video));

                dispatch(setOverlay("expandVideo"))
            },
            type: "button",
            icon: <Play color="var(--text-color)" />
        })

        options.push({
            label: "Copy Link",
            onClick: () => {copyToClipboard(data.video.url || data.video.src); dispatch(triggerAlert("Link Copied"))},
            type: 'button',
            icon: <Link color="var(--text-color)" />
        })

        if (data.video?.src?.includes('.mp4')) {
            options.push({
                label: "Download Video",
                onClick: () => {downloadImage(data.video.src)},
                type: "button",
                icon: <Download color="var(--text-color)" />
            })
        }

        if (data?.video?.inQueue) {
            options.push({
                label: "Remove From Queue",
                onClick: () => {
                    removeMedia(data.video)
                },
                type: 'button',
                icon: <ListX color="var(--error-color)" />,
                color: 'var(--error-color)'
            })
        }
        
    }, [currentVoiceChannel, mediaPlayerState.currentlyPlaying, mediaPlayerState.enabled, savedMediaState, dispatch, removeMedia])

    return {getVideoOptions};
}
