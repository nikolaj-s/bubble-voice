import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { setReplyTo } from '../../../features/Channel/TextChannel/textChannelSlice';
import { closeOverlay, setOverlay } from '../../../features/Overlay/overlaySlice';
import { BookmarkPlus, Copy, ImageDown, Link, Pencil, Pin, PinOff, Reply, Trash2 } from 'lucide-react';
import { pinMessage } from '../../../features/Channel/TextChannel/Thunks/pinMessage';
import { copyToClipboard, downloadImage } from '../../../lib/services/helperFunctions';
import { triggerAlert } from '../../../features/Alerts/alertsSlice';
import { clearExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import { setFilter, setQuery, setSimilarImageSrc } from '../../../features/Search/searchSlice';
import { globalSearch } from '../../../features/Search/Thunks/globalSearch';
import { deleteMessage } from '../../../features/Channel/TextChannel/Thunks/deleteMessage';
import { addMessageToMoment, setIsSelecting } from '../../../features/Moments/momentsSlice';
import { useSearchParams } from 'react-router-dom';
import { setMessageToEdit } from '../../../features/EditMessage/editMessageSlice';

export const useMessageCtxMenu = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [,setSearchParams] = useSearchParams();

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {isSelecting, selectedMessages} = useSelector(state => state.momentsSlice);

    const {_id: user_id} = useSelector(state => state.accountSlice.account) || {};

    const getMessageOptions = useCallback((options, data, permissions) => {

        options.push({
            label: "Reply",
            onClick: () => {

                if (currentTextChannel !== data.message.channel_id) navigate(`/dashboard/server/${data.message.server_id}/channel/${data.message.channel_id}`);

                dispatch(setReplyTo(data.message));

                dispatch(closeOverlay());
            },
            type: 'button',
            icon: <Reply color="var(--text-color)" />
        })

        options.push({
            label: (data.message.pinned ? "Unpin" : "Pin") + ' Message',
            onClick: () => {dispatch(pinMessage(data.message))},
            type: 'button',
            icon: data.message.pinned ? <PinOff color="var(--text-color)" /> : <Pin color="var(--text-color)" />
        })

        if (permissions.user_can_create_moments) {
            options.push({
                label: (isSelecting && Object.values(selectedMessages).length > 0) ? "Create Moment" : !isSelecting ? "Create A Moment" : "Stop Selecting",
                onClick: () => {
                    if (isSelecting && Object.values(selectedMessages).length > 0) {
                        setSearchParams({section: 'createMoment'});
                        dispatch(setOverlay('serverSettings'));
                    } else if (!isSelecting) {
                        dispatch(setIsSelecting(true));
                        dispatch(addMessageToMoment(data.message));
                    } else {
                        dispatch(setIsSelecting(false));
                    }
                },
                type: 'button',
                icon: <BookmarkPlus color='var(--text-color)' />
            })
        }

        if (isSelecting && Object.values(selectedMessages).length > 0) {
            options.push({
                label: "Stop Selecting Messages",
                onClick: () => {
                    dispatch(setIsSelecting(false));
                },
                type: 'button',
                color: 'var(--error-color)'
            })
        }
        
        if (data.message.link) {
            options.push({
                label: "Copy Link",
                onClick: () => {copyToClipboard(data.message.link); dispatch(triggerAlert("Link Copied"))},
                type: 'button',
                icon: <Link color="var(--text-color)" />
            })
        }

        if (data.message.text) {
            options.push({
                label: "Copy Text",
                onClick: () => {
                    copyToClipboard(data.message.text); 
                    dispatch(triggerAlert('Text Copied'))
                },
                type: 'button',
                icon: <Copy color="var(--text-color)" />
            })
        }

        if (data.message.image) {
            options.push({
                label: "Download Image",
                onClick: () => {downloadImage(data.message.image)},
                type: "button",
                icon: <ImageDown color="var(--text-color)" />
            })

            if (data.message.tags) {
                options.push({
                    label: "Find Similar Images",
                    onClick: () => {

                        dispatch(clearExpandedImage());

                        dispatch(setQuery(""));

                        dispatch(setSimilarImageSrc(data.message.image + `?similarTags=${data.message.tags}`));

                        dispatch(setFilter({path: 'images', label: "Images"}));

                        dispatch(globalSearch());

                        dispatch(setOverlay('search'));

                    },
                    type: "button"
                })
            }
          
        }

        // copy message link ctx button
        if (data.message._id) {

            options.push({
                label: "Copy Message Link",
                onClick: () => {
                    const res = copyToClipboard(`${window.location.origin}/dashboard/server/${data.message.server_id}/channel/${data.message.channel_id}?message=${data.message._id}`);

                    if (res?.error) return dispatch(triggerAlert("Error Copying To Clipboard", 'error'));

                    dispatch(triggerAlert('Link Copied!'))
                },
                type: "button",
                icon: <Link color='var(--text-color)' />,
            })

        }

        if (data.message.user_id === user_id) {
            options.push({
                label: "Edit Message",
                icon: <Pencil color='var(--text-color)' />,
                type: 'button',
                onClick: () => {
                    dispatch(setOverlay('editMessage'));

                    dispatch(setMessageToEdit(data.message));
                }
            })
        }

        if (data.message.user_id === user_id || permissions.user_can_delete_other_users_messages) {
            options.push({
                label: "Delete Message",
                onClick: () => {dispatch(deleteMessage({message_id: data.message.message_id}))},
                type: "button",
                icon: <Trash2 color="var(--error-color)" />,
                color: 'var(--error-color)'
            })
        }

    }, [currentTextChannel, dispatch, navigate, user_id, isSelecting, selectedMessages]) 
    
    return {getMessageOptions};
}

