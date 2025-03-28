import { FilePenLine, ImageDown, Link, Pin, PinOff, Plus, Send, Trash2, Unplug } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { copyToClipboard, downloadImage } from "../../../../lib/services/helperFunctions";
import { deleteMessage } from "../../../../features/TextChannel/Thunks/deleteMessage";
import { closeOverlay, setOverlay } from "../../../../features/Overlay/overlaySlice";
import { sendMessage } from "../../../../features/TextChannel/Thunks/sendMessage";

export const useContextMenuOptions = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const {user_id} = useSelector(state => state.accountSlice);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getOptions = useCallback(
        (e, permissions, currentTextChannel, channels) => {
        try {
            const options = [];

            const path = e.composedPath();

            const data = {};

            console.log(permissions);

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
                        onClick: () => {},
                        type: "button",
                        icon: <FilePenLine color="var(--text-color)" />
                    });
                }
            }

            if (data.channelList) {
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
                        icon: <Plus color="var(--text-color)" />
                    })
                }
            }

            if (data.message) {

                options.push({
                    label: data.message.pinned ? "Un-Pin" : "Pin",
                    onClick: () => {},
                    type: 'button',
                    icon: data.message.pinned ? <PinOff color="var(--text-color)" /> : <Pin color="var(--text-color)" />
                })

                if (data.message.link) {
                    options.push({
                        label: "Copy Link",
                        onClick: () => {copyToClipboard(data.message.link)},
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
                }

                if (data.message.user_id === user_id || permissions.user_can_delete_other_users_messages) {
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

                    channels.forEach(channel => {
                    
                        if (channel.channel_type === 'text' && !channel.locked_channel) {
                            sendToOptions.push({
                                label: channel.channel_name,
                                onClick: () => {
                                    dispatch(closeOverlay());

                                    navigate(`/dashboard/server/${channel.server_id}/channel/${channel.channel_id}`);

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

                options.push({
                    label: "Copy Link",
                    onClick: () => {copyToClipboard(data.imageSearchResult.src)},
                    type: 'button',
                    icon: <Link color="var(--text-color)" />
                })

                options.push({
                    label: "Download Image",
                    onClick: () => {downloadImage(data.imageSearchResult.src)},
                    type: "button",
                    icon: <ImageDown color="var(--text-color)" />
                })


            }




            return options;
        } catch (error) {
            console.log(error);
            return [];
        }
        },
        [navigate, dispatch]
    );

  return getOptions;
};
