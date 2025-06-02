import { Bookmark, BookmarkCheck, ChevronRight, Cog, Copy, Download, FilePenLine, FolderPen, FolderPlus, Hash, History, ImageDown, LayoutDashboard, LayoutDashboardIcon, Link, ListPlus, ListX, Mic, Music2, Pause, Pencil, Pin, PinOff, Play, PlaySquare, Plus, Reply, Search, Send, Settings, Settings2, SkipForward, Trash2, Unplug, UserPen, Users, Video } from "lucide-react";
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
import { addMediaToPlayer } from "../../features/MediaPlayer/Thunks/addMediaToPlayer";
import { setMediaPlayerVolume, toggleHideMediaPlayer, toggleIsMediaPlayerOpen } from "../../features/MediaPlayer/mediaPlayerSlice";
import { setCurrentVoiceChannel, setVoiceChannelFocused, toggleVoiceChannelOptions } from "../../features/Channel/VoiceChannel/voiceChannelSlice";
import { toggleAppearanceSetting } from "../../features/Settings/Appearance/appearanceSlice";
import { useMediaPlayer } from "../../hooks/useMediaPlayer";
import { saveMediaToPlayer } from "../../features/MediaPlayer/Thunks/saveMediaToPlayer";
import { removeSavedMediaFromPlayer } from "../../features/MediaPlayer/Thunks/removeSavedMediaFromPlayer";
import { isMediaSaved } from "../../features/MediaPlayer/Helpers/isMediaSaved";
import { useGlobalVolume } from "../../context/GlobalVolumeContext";
import { toggleUsingPushToTalk } from "../../features/Channel/MediaControl/mediaControlSlice";
import { setChannelToViewWidgetsOf } from "../../features/Widgets/widgetsSlice";
import { expandVideo } from "../../features/Media/ExpandedVideo/expandedVideoSlice";

export const useContextMenuOptions = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const {volumes, changeVolume} = useGlobalVolume();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const mediaPlayerState = useSelector(state => state.mediaPlayerSlice);

    const savedMediaState = useSelector(state => state.savedMediaSlice);

    const {hideNonVideoUsers, currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    const {usingPushToTalk} = useSelector(state => state.mediaControlSlice);

    const {server_id} = useSelector(state => state.serverDetailsSlice);

    const {hideChannelBackgrounds} = useSelector(state => state.appearanceSlice);

    const {toggleIsPlaying, next, removeMedia} = useMediaPlayer();

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

            if (data.appSubmenu) {

                if (server_id) {
                    let widget_options = [];

                    Object.values(channels).sort((a, b) => 
                    a.channel_name.localeCompare(b.channel_name, undefined, { sensitivity: 'base' })
                    ).forEach(channel => { 

                        widget_options.push({
                            label: channel.channel_name,
                            type: 'button',
                            icon: <LayoutDashboardIcon color="var(--text-color)" />,
                            onClick: () => {
                                dispatch(setChannelToViewWidgetsOf(channel._id));

                                dispatch(setOverlay('widgets'));
                            }
                        })

                    })

                    options.push({
                        label: "View Widgets From",
                        submenuOptions: widget_options,
                        icon: <ChevronRight color="var(--text-color)" />
                    })
                }

            }

            if (data.userStreamSource) {
                if (data.userStreamSource.user_id !== user.user_id) {

                    const volume_source_key = `screen-audio-source-${data.userStreamSource.user_id}`;

                    options.push({
                        label: "Disable Stream",
                        type: 'button',
                        onClick: () => {

                        }
                    })
                    options.push({
                        label: "Change Stream Volume",
                        type: 'range',
                        min: 0,
                        max: 2.5,
                        step: 0.01,
                        value: typeof volumes[volume_source_key] === 'number' ? volumes[volume_source_key] : 0.5,
                        onChange: (value) => {changeVolume(volume_source_key, value)}
                    })
                }
            }
            
            if (data.mediaplayer) {

                if (mediaPlayerState.currentlyPlaying) {
                    const saved = isMediaSaved(savedMediaState, currentVoiceChannel, mediaPlayerState.currentlyPlaying.src);

                    options.push({
                        label: saved ? `Unsave ${mediaPlayerState.currentlyPlaying.title}` : `Save ${mediaPlayerState.currentlyPlaying.title}`,
                        onClick: () => {
                            if (saved) {
                                dispatch(removeSavedMediaFromPlayer(mediaPlayerState.currentlyPlaying._id));
                            } else {
                                dispatch(saveMediaToPlayer(mediaPlayerState.currentlyPlaying));
                            }
                            
                        },
                        type: 'button',
                        icon: <Bookmark fill={saved ? 'var(--text-color)' : 'transparent'} color="var(--text-color)" /> 
                    })
                }

                options.push({
                    label: 'Search',
                    type: 'button',
                    icon: <Search color="var(--text-color)" />,
                    onClick: () => {
                        dispatch(setFilter({path: 'videos'}));

                        dispatch(setOverlay('search'));
                    }
                })

                options.push({
                    label: "View Saves",
                    type: 'button',
                    icon: <BookmarkCheck color="var(--text-color" />,
                    onClick: () => {

                        dispatch(setChannelToViewWidgetsOf(currentVoiceChannel));

                        dispatch(setOverlay('widgets'));

                         setTimeout(() => {

                            document.getElementById('media-player-widget-saves')?.scrollIntoView({behavior: 'instant'});
                        
                        }, 100)
                    }
                })

                options.push({
                    label: "View History",
                    type: 'button',
                    icon: <History color="var(--text-color)" />,
                    onClick: () => {
                        dispatch(setOverlay('mediaPlayerHistory'));
                    }
                })
               
                options.push({
                    label: mediaPlayerState.isPlaying ? 'Pause' : 'Play',
                    type: 'button',
                    icon: mediaPlayerState.isPlaying ? <Pause color="var(--text-color)"  /> : <Play color="var(--text-color)" />,
                    onClick: () => {toggleIsPlaying()}
                })
                options.push({
                    label: 'Skip',
                    type: 'button',
                    icon: <SkipForward  color="var(--text-color)" />,
                    onClick: () => {next()}
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


            if (data.user) {

                if (data.user.user_id !== user.user_id) {
                   
                    options.push({
                        label: "Change User Volume",
                        min: 0,
                        max: 2.5,
                        step: 0.01,
                        value: typeof volumes[data.user.user_id] === 'number' ? volumes[data.user.user_id] : 0.5,
                        onChange: (value) => {changeVolume(data?.user?.user_id, value)},
                        type: 'range'
                    })
                }

                if (permissions.user_can_assign_server_groups) {
                    options.push({
                        label: "Manage User",
                        onClick: () => {

                        },
                        type: "button"
                    })
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

                if (data.message.text) {
                    options.push({
                        label: "Copy Text",
                        onClick: () => {copyToClipboard(data.message.text); dispatch(triggerAlert('Text Copied'))},
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
                
            }

            if (data.imageSearchResult) {
                
                if (currentTextChannel && permissions?.user_can_post_in_text_channels) {
                    options.push({
                        label: "Send To Current Channel",
                        onClick: () => {
                            dispatch(sendMessage({channel_id: currentTextChannel, text: data.imageSearchResult.src, ...data.imageSearchResult}));
                            dispatch(closeOverlay());
                            dispatch(setVoiceChannelFocused(false));
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
                                    
                                    dispatch(setVoiceChannelFocused(false));
                                },
                                icon: <Hash color="var(--text-color)" />,
                                type: "button",
                            })
                        } 

                    })
                  
                    if (sendToOptions.length > 0) {
                        options.push({
                            label: "Send To",
                            submenuOptions: sendToOptions,
                            icon: <ChevronRight color="var(--text-color)" />
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
                    label: usingPushToTalk ? "Use Voice Detection" : "Use Push To Talk",
                    icon: <Mic color="var(--text-color)" />,
                    type: 'button',
                    onClick: () => {
                        dispatch(toggleUsingPushToTalk());
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

                options.push({
                    label: "Voice / Video Settings",
                    icon: <Settings color="var(--text-color)" />,
                    type: "button",
                    onClick: () => {
                        setSearchParams({section: "voiceVideo"});

                        dispatch(setOverlay('settings'));
                    }
                })

                options.push({
                    label: "Manage Keybinds",
                    type: 'button',
                    onClick: () => {
                        setSearchParams({section: 'keybinds'});
                        dispatch(setOverlay('settings'))
                    }
                })
            }


            // mobile menu
            if (data.mobileMenu) {

                if (currentTextChannel || currentVoiceChannel) {
                    options.push({
                        label: "Widgets",
                        icon: <LayoutDashboard color="var(--text-color)"/>,
                        type: 'button',
                        onClick: () => {
                            dispatch(setChannelToViewWidgetsOf(currentTextChannel || currentVoiceChannel))
                            dispatch(setOverlay("widgets"))
                        }
                    })
                }

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

            if (data.room || data.appSubmenu) {
                if (currentVoiceChannel) {
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
                        onClick: () => {dispatch(toggleHideMediaPlayer())},
                        icon: <Music2 color="var(--text-color)" />
                    })

                    if (permissions.user_can_edit_channels) {
                        options.push({
                            label: "Edit Channel",
                            type: 'button',
                            onClick: () => {

                                dispatch(setChannelToEdit(channels[currentVoiceChannel]));

                                setSearchParams({section: 'editChannel', channel: currentVoiceChannel});

                                dispatch(setOverlay('serverSettings'))
                            },
                            icon: <Pencil color="var(--text-color)" />
                        })
                    }
                }
            }

            if (data.channel || data.room || data.controlBar || data.appSubmenu) {

                if (currentVoiceChannel) {
                    options.push({
                        label: "Disconnect",
                        onClick: () => {dispatch(setCurrentVoiceChannel(null))},
                        type: "button",
                        icon: <Unplug color="var(--error-color)" />,
                        color: 'var(--error-color)'
                    });
                } 
            }

            if (data.message) {
                if (data.message.user_id === user.user_id || permissions.user_can_delete_other_users_messages) {
                    options.push({
                        label: "Delete Message",
                        onClick: () => {dispatch(deleteMessage({message_id: data.message.message_id}))},
                        type: "button",
                        icon: <Trash2 color="var(--error-color)" />,
                        color: 'var(--error-color)'
                    })
                }
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

            return options;
        } catch (error) {
            console.log(error);
            return [];
        }
        },
        [navigate, dispatch, setSearchParams, hideNonVideoUsers, mediaPlayerState, hideChannelBackgrounds, savedMediaState, currentVoiceChannel, server_id, volumes, usingPushToTalk]
    );

  return getOptions;
};
