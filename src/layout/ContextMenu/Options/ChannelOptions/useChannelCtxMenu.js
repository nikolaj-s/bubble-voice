import { FilePenLine, LayoutDashboard } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { BoolIndicator } from "../../../../components/ui/BoolIndicator/BoolIndicator";
import { unSubscribe } from "../../../../features/Subscriptions/Thunks/unSubscribe";
import { subscribe } from "../../../../features/Subscriptions/Thunks/subscribe";
import { useChannelMethods } from "../../../../hooks/useChannelMethods";

export const useChannelCtxMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {account} = useSelector(state => state.accountSlice);

    const subscriptions = useSelector(state => state.subscriptionsSlice.subscriptions);

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {viewWidgets, editSelectedChannel} = useChannelMethods();

    const getChannelOptions = useCallback((options, data, permissions) => {

        const channel = data.channel;

        const root = `/dashboard/server/${channel.server_id}`;

        options.push({
            label: "View Widgets",
            icon: <LayoutDashboard color="var(--text-color)" />,
            onClick: () => {

                viewWidgets(channel);

            },
            type: 'button'
        })

        if (channel.channel_type === "voice") {
            
        } else if (channel._id !== currentTextChannel && channel.channel_type === 'text') {
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

                    editSelectedChannel(channel);

                },
                type: "button",
                icon: <FilePenLine color="var(--text-color)" />
            });
        }

        if (channel.channel_type === 'text') {


            let subscribed = false;

            for (const sub of subscriptions) {
                if (sub?.channel_id?._id === channel?._id) {
                    subscribed = sub;
                    break;
                }
            }

            const userAuthorized =
            permissions.user_can_edit_channels ||
            channel?.authorized_users?.[account._id];

            // Only show the option if:
            // - The channel is not locked, OR
            // - The user is authorized (can manage locked channels), OR
            // - The user is already subscribed (can unsubscribe)
            const canShowSubscribeOption =
            !channel.locked_channel || userAuthorized || subscribed;

            if (canShowSubscribeOption) {

                options.push({
                    label: subscribed ? "Unsubscribe" : "Subscribe",
                    type: "button",
                    icon: <BoolIndicator active={subscribed} />,
                    onClick: () => {
                            if (subscribed) {
                                dispatch(unSubscribe(subscribed?._id));
                            } else {
                                dispatch(subscribe(channel));
                            }
                    },
                });
            }


        }

    }, [dispatch, navigate, setSearchParams, account, subscriptions, currentTextChannel])
    
    return {getChannelOptions};
}
