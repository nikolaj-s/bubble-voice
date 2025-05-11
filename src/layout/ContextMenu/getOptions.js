import { Download, Edit2, FilePenLine, FolderPen, FolderPlus, ImageDown, Link, ListPlus, Pause, Pencil, Pin, PinOff, Play, PlaySquare, Plus, Reply, Send, Settings, Settings2, SkipForward, Trash2, Unplug, User2, UserPen, Users, Video } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector,} from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { copyToClipboard, downloadImage } from "../../lib/services/helperFunctions";
import { deleteMessage } from "../../features/Channel/TextChannel/Thunks/deleteMessage";
import { closeOverlay, setOverlay } from "../../features/Overlay/overlaySlice";
import { sendMessage } from "../../features/Channel/TextChannel/Thunks/sendMessage";
import { setCurrentTextChannel, setReplyTo } from "../../features/Channel/TextChannel/textChannelSlice";
import { setFilter, setQuery, setSimilarImageSrc } from "../../features/Search/searchSlice";
import { globalSearch } from "../../features/Search/Thunks/globalSearch";
import { setChannelToEdit } from "../../features/Channel/editChannel/editChannelSlice";
import { pinMessage } from "../../features/Channel/TextChannel/Thunks/pinMessage";
import { toggleMobileMenu } from "../../features/Mobile/mobileSlice";
import { setSelectedCategory } from "../../features/Categories/categoriesSlice";
import { triggerAlert } from "../../features/Alerts/alertsSlice";
import { deleteWidget } from "../../features/Widgets/Thunks/deleteWidget";
import { setManageWidgetsForChannel } from "../../features/Widgets/manageWidgetsSlice";
import { addMediaToPlayer } from "../../features/Channel/MediaPlayer/Thunks/addMediaToPlayer";
import { setMediaPlayerVolume, toggleHideMediaPlayer, toggleIsMediaPlayerOpen } from "../../features/Channel/MediaPlayer/mediaPlayerSlice";
import { toggleVoiceChannelOptions } from "../../features/Channel/VoiceChannel/voiceChannelSlice";
import { toggleAppearanceSetting } from "../../features/Settings/Appearance/appearanceSlice";

export const useContextMenuOptions = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const {hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);

    const getOptions = useCallback(
        (e, permissions, currentTextChannel, channels, currentChannel, user) => {
        try {
            const options = [];

            const path = e.composedPath();

            const data = {};

            for (const el of path) {
            try {
                if (el?.getAttribute("data-context")) {
                    const json = JSON.parse(el.getAttribute("data-context"));

                    data[json.type] = json;
                }
            } catch (error) {
                continue;
            }
            }
            
           

            if (data.widgetsOverlay) {
                if (permissions.user_can_edit_channels) {
                    options.push({
                        label: "Add Widget",
                        type: "button",
                        onClick: () => {
                            dispatch(setManageWidgetsForChannel(data.widgetsOverlay.channel_id));

                            setSearchParams({section: 'addWidget'});

                            dispatch(setOverlay('serverSettings'))
                        },
                    })
                    options.push({
                        label: "Manage Widgets",
                        type: "button",
                        onClick: () => {
                            dispatch(setManageWidgetsForChannel(data.widgetsOverlay.channel_id));

                            setSearchParams({section: "manageWidgets"});

                            dispatch(setOverlay('serverSettings'));
                        },
                    })
                }

                options.push({
                    label: "Close Widgets",
                    onClick: () => {dispatch(closeOverlay())},
                    type: "button"
                })
            }

            if (data.widget) {
                if (permissions.user_can_edit_channels) {
                    options.push({
                        label: "Edit Widget",
                        onClick: () => {},
                        type: "button",
                        icon: <Pencil color="var(--text-color)" />
                    })

                    options.push({
                        label: "Delete Widget",
                        onClick: () => dispatch(deleteWidget(data.widget._id)),
                        type: 'button',
                        icon: <Trash2 color="var(--error-color)" />
                    })
                }
            }

            if (data.channel) {
                const channel = data.channel;

                const root = `/dashboard/server/${channel.server_id}`;

                if (channel.channel_type === "voice") {
                    if (channel.active) {
                    options.push({
                        label: "Leave Channel",
                        onClick: () => navigate(root),
                        type: "button",
                        icon: <Unplug color="var(--text-color)" />
                    });
                    } else {
                    options.push({
                        label: "Join Channel",
                        onClick: () => navigate(`${root}/channel/${channel.channel_id}`),
                        type: "button",
                    });
                    }
                } else {
                    options.push({
                    label: "Open Channel",
                    onClick: () => navigate(`${root}/channel/${channel.channel_id}`),
                    type: "button",
                    });
                }
           
                if (permissions.user_can_edit_channels || permissions.admin) {

                    options.push({
                        label: "Edit Channel",
                        onClick: () => {

                            dispatch(setChannelToEdit(channel));

                            setSearchParams({section: 'editChannel', channel: channel._id});
                            
                            dispatch(setOverlay('serverSettings'));
                        },
                        type: "button",
                        icon: <FilePenLine color="var(--text-color)" />
                    });
                }
            }

            if (data.category) {
                if (permissions.user_can_manage_categories) {
                    options.push({
                        label: "Edit Category",
                        icon: <FolderPen color='var(--text-color)' />,
                        onClick: () => {

                            dispatch(setSelectedCategory(data.category));

                            setSearchParams({section: "editCategory"});

                            dispatch(setOverlay("serverSettings"));

                        },
                        type: "button"
                    })
                }
                
            }

            if (data.channelList || data.mobileMenu) {
                if (permissions.user_can_create_channels) {
                    options.push({
                        label: "Create Channel",
                        onClick: () => {
                            setSearchParams({section: 'createChannel'})
                            dispatch(setOverlay('serverSettings'))
                        },
                        type: "button",
                        icon: <Plus color="var(--text-color)" />
                    })
                    options.push({
                        label: "Create Category",
                        onClick: () => {
                            setSearchParams({section: "createCategory"});
                            dispatch(setOverlay('serverSettings'));
                        },
                        type: 'button',
                        icon: <FolderPlus color="var(--text-color)" />
                    })
                }
            }

            if (data.message) {

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
                    label: data.message.pinned ? "Unpin" : "Pin",
                    onClick: () => {dispatch(pinMessage(data.message))},
                    type: 'button',
                    icon: data.message.pinned ? <PinOff color="var(--text-color)" /> : <Pin color="var(--text-color)" />
                })

                if (data.message.link) {
                    options.push({
                        label: "Copy Link",
                        onClick: () => {copyToClipboard(data.message.link); dispatch(triggerAlert("Link Copied"))},
                        type: 'button',
                        icon: <Link color="var(--text-color)" />
                    })
                }

                if (data.message.image) {
                    options.push({
                        label: "Download Image",
                        onClick: () => {downloadImage(data.message.image)},
                        type: "button",
                        icon: <ImageDown color="var(--text-color)" />
                    })
                    options.push({
                        label: "Find Similar Images",
                        onClick: () => {

                            dispatch(setQuery(""));

                            dispatch(setSimilarImageSrc(data.message.image));

                            dispatch(setFilter({path: 'images', label: "Images"}));

                            dispatch(globalSearch());

                            dispatch(setOverlay('search'));

                        },
                        type: "button"
                    })
                }
                console.log(data.message.user_id, user.user_id)
                if (data.message.user_id === user.user_id || permissions.user_can_delete_other_users_messages) {
                    options.push({
                        label: "Delete Message",
                        onClick: () => {dispatch(deleteMessage({message_id: data.message.message_id}))},
                        type: "button",
                        icon: <Trash2 color="var(--error-color)" />
                    })
                }
            }

            if (data.imageSearchResult) {
                
                if (currentTextChannel && permissions?.user_can_post_in_text_channels) {
                    options.push({
                        label: "Send To Current Channel",
                        onClick: () => {
                            dispatch(sendMessage({channel_id: currentTextChannel, text: data.imageSearchResult.src, ...data.imageSearchResult}));
                            dispatch(closeOverlay());
                        },
                        type: "button",
                        icon: <Send color="var(--text-color)" />
                    })

                }

                if (permissions?.user_can_post_in_text_channels) {

                    let sendToOptions = [];

                    Object.values(channels).forEach(channel => {
                    
                        if (channel.channel_type === 'text' && !channel.locked_channel) {
                            sendToOptions.push({
                                label: channel.channel_name,
                                onClick: () => {
                                    dispatch(closeOverlay());

                                    if (currentChannel?.channel_type === 'voice') {

                                        dispatch(setCurrentTextChannel(channel.channel_id));

                                    } else {

                                        navigate(`/dashboard/server/${channel.server_id}/channel/${channel.channel_id}`);

                                    }

                                    
                                    dispatch(sendMessage({channel_id: channel.channel_id, text: data.imageSearchResult.src, ...data.imageSearchResult}));
                                    
                                },
                                type: "button",
                            })
                        } 

                    })
                  
                    if (sendToOptions.length > 0) {
                        options.push({
                            label: "Send To",
                            submenuOptions: sendToOptions,
                        })
                    }
                
                }

            }

            if (data.image || data.imageSearchResult) {

                if (!data.image?.src && !data.imageSearchResult?.src) return;

                options.push({
                    label: "Find Similar Images",
                    onClick: () => {

                        dispatch(setQuery(""));

                        dispatch(setSimilarImageSrc(data.imageSearchResult?.src || data.image?.src));

                        dispatch(setFilter({path: "images", label: "Images"}));

                        dispatch(globalSearch());

                        dispatch(setOverlay('search'));

                    },
                    type: "button"
                })

                options.push({
                    label: "Copy Link",
                    onClick: () => {copyToClipboard(data.imageSearchResult?.src || data.image?.src); dispatch(triggerAlert('Link Copied'))},
                    type: 'button',
                    icon: <Link color="var(--text-color)" />
                })

                options.push({
                    label: "Download Image",
                    onClick: () => {downloadImage(data.imageSearchResult?.src || data.image?.src)},
                    type: "button",
                    icon: <ImageDown color="var(--text-color)" />
                })
            }

            if (data.video) {

                if ((data.video?.src?.includes('.mp4') || data?.video?.url?.includes('youtu')) && data.video.duration && mediaPlayerState) {
                    options.push({
                        label: mediaPlayerState.currentlyPlaying ? "Add To Queue" : "Play In Channel",
                        onClick: () => {
                            dispatch(closeOverlay());

                            dispatch(addMediaToPlayer(data.video));

                            dispatch(toggleIsMediaPlayerOpen(false));
                        },
                        type: 'button',
                        icon: mediaPlayerState.currentlyPlaying ? <ListPlus color="var(--text-color)" /> : <PlaySquare color="var(--text-color)" />
                    })
                }

                options.push({
                    label: "Copy Link",
                    onClick: () => {copyToClipboard(data.video.src); dispatch(triggerAlert("Link Copied"))},
                    type: 'button',
                    icon: <Link color="var(--text-color)" />
                })
                options.push({
                    label: "Download Video",
                    onClick: () => {downloadImage(data.video.src)},
                    type: "button",
                    icon: <Download color="var(--text-color)" />
                })
            }

            if (data.user) {

                if (permissions.user_can_assign_server_groups) {
                    options.push({
                        label: "Manage User",
                        onClick: () => {

                        },
                        type: "button"
                    })
                }

            }

            if (data.controlBar) {

                options.push({
                    label: "Preview Webcam",
                    icon: <Video color="var(--text-color)"/>,
                    type: "button",
                    onClick: () => {
                        dispatch(setOverlay('webcamOverlay'))
                    }
                })

                options.push({
                    label: "Edit Account",
                    icon: <UserPen color="var(--text-color)" />,
                    type: "button",
                    onClick: () => {
                        setSearchParams({section: 'account'});
                        dispatch(setOverlay("settings"));
                    }
                })
            }


            // mobile menu
            if (data.mobileMenu) {

                options.push({
                    label: "Users",
                    icon: <Users color="var(--text-color)" />,
                    type: 'button',
                    onClick: () => {
                        dispatch(toggleMobileMenu('isUserMenuOpen'))
                    }
                })

                options.push({
                    label: "Bubble Settings",
                    icon: <Settings2 color="var(--text-color)" />,
                    type: "button",
                    onClick: () => {
                        dispatch(setOverlay('serverSettings'))
                    }
                })

                options.push({
                    label: "Settings",
                    icon: <Settings color="var(--text-color)" />,
                    type: "button",
                    onClick: () => {
                        dispatch(setOverlay('settings'))
                    }
                })

            }

            if (data.mediaplayer) {
               
                options.push({
                    label: mediaPlayerState.isPlaying ? 'Pause' : 'Play',
                    type: 'button',
                    icon: mediaPlayerState.isPlaying ? <Pause color="var(--text-color)"  /> : <Play color="var(--text-color)" />
                })
                options.push({
                    label: 'Skip',
                    type: 'button',
                    icon: <SkipForward  color="var(--text-color)" />
                })
                if (mediaPlayerState.hasAudio) {
                    options.push({
                        type: 'range',
                        label: "Change Media Player Volume",
                        onChange: (value) => {
                            dispatch(setMediaPlayerVolume(value));
                        },
                        value: mediaPlayerState.volume,
                        min: 0,
                        max: 1,
                        step: 0.01
                    })
                }
            }

            if (data.room) {
                options.push({
                    label: hideNonVideoUsers ? 'Show Non Video Users' : 'Hide Non Video Users',
                    type: 'button',
                    onClick: () => {dispatch(toggleVoiceChannelOptions('hideNonVideoUsers'))}
                })
                options.push({
                    label: hideChannelBackgrounds ? 'Show Channel Background' : "Hide Channel Background",
                    type: 'button',
                    onClick: () => {
                        dispatch(toggleAppearanceSetting('hideChannelBackgrounds'))
                    }
                })
                options.push({
                    label: mediaPlayerState.hideMediaPlayer ? 'Show Media Player' : "Hide Media Player",
                    type: 'button',
                    onClick: () => {dispatch(toggleHideMediaPlayer())}
                })
            }

            return options;
        } catch (error) {
            console.log(error);
            return [];
        }
        },
        [navigate, dispatch, setSearchParams, hideNonVideoUsers, mediaPlayerState, hideChannelBackgrounds]
    );

  return getOptions;
};
