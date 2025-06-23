import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../features/Channel/TextChannel/Thunks/sendMessage';
import { closeOverlay, setOverlay } from '../../../../features/Overlay/overlaySlice';
import { setVoiceChannelFocused } from '../../../../features/Channel/VoiceChannel/voiceChannelSlice';
import { clearExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import { ChevronRight, Hash, ImageDown, Link, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { copyToClipboard, downloadImage } from '../../../../lib/services/helperFunctions';
import { setFilter, setQuery, setSimilarImageSrc } from '../../../../features/Search/searchSlice';
import { globalSearch } from '../../../../features/Search/Thunks/globalSearch';
import { triggerAlert } from '../../../../features/Alerts/alertsSlice';

export const useImageCtxMenu = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const channels = useSelector(state => state.channelsSlice.channels)

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const getImageOptions = useCallback((options, data, permissions) => {

        if (currentTextChannel && permissions?.user_can_post_in_text_channels && data.imageSearchResult) {
            options.push({
                label: "Send To Current Channel",
                onClick: () => {
                    dispatch(sendMessage({channel_id: currentTextChannel, text: data.imageSearchResult.src, ...data.imageSearchResult, ...data?.image}));
                    dispatch(closeOverlay());
                    dispatch(setVoiceChannelFocused(false));
                    dispatch(clearExpandedImage());
                },
                type: "button",
                icon: <Send color="var(--text-color)" />
            })

        }
      
        if (permissions?.user_can_post_in_text_channels && channels) {

            let sendToOptions = [];

            Object.values(channels).forEach(channel => {
            
                if (channel.channel_type === 'text' && !channel.locked_channel) {
                    sendToOptions.push({
                        label: channel.channel_name,
                        onClick: () => {
                            dispatch(closeOverlay());

                            navigate(`/dashboard/server/${channel.server_id}/channel/${channel.channel_id}`);
                            
                            dispatch(sendMessage({channel_id: channel.channel_id, text: data?.imageSearchResult?.src || data?.image?.src, ...data?.imageSearchResult, ...data?.image}));
                            
                            dispatch(setVoiceChannelFocused(false));

                            dispatch(clearExpandedImage());
                        },
                        icon: <Hash color="var(--text-color)" />,
                        type: "button",
                    })
                } 

            })
            
            if (sendToOptions.length > 0) {
                options.push({
                    label: "Send Image To",
                    submenuOptions: sendToOptions.sort((a, b) => 
            a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
            ),
                    icon: <ChevronRight color="var(--text-color)" />,
                    useFilter: true
                })
            }
        }

        if (data.imageSearchResult?.tags || data.image?.tags) {
            options.push({
                label: "Find Similar Images",
                onClick: () => {

                    dispatch(setQuery(""));
                    console.log(data.imageSearchResult, data.image)
                    dispatch(setSimilarImageSrc((data.imageSearchResult?.thumbnail || data.image?.thumbnail) + `?similarTags=${data.image?.tags || data?.imageSearchResult?.tags}`));

                    dispatch(setFilter({path: "images", label: "Images"}));

                    dispatch(globalSearch());

                    dispatch(setOverlay('search'));

                    dispatch(clearExpandedImage())

                },
                type: "button"
            })
        }

        options.push({
            label: "Copy Image Link",
            onClick: () => {copyToClipboard(data.imageSearchResult?.src || data.image?.src); dispatch(triggerAlert('Link Copied'))},
            type: 'button',
            icon: <Link color="var(--text-color)" />
        })
        
        options.push({
            label: "Download Image",
            onClick: () => {

                if (window?.electron) return window?.electron?.downloadFile(data.imageSearchResult?.src || data.image?.src).then(res => {
                    if (res?.status === 'success') {
                        dispatch(triggerAlert('Image downloaded', 'success'))
                    } else {
                        dispatch(triggerAlert('Failed to download image', 'error'))
                    }
                }).catch(err => dispatch(triggerAlert('Failed to download image', 'error')));

                downloadImage(data.imageSearchResult?.src || data.image?.src)
            },
            type: "button",
            icon: <ImageDown color="var(--text-color)" />
        })
    
        
    }, [currentTextChannel, channels, dispatch, navigate])

    return {getImageOptions};
}
