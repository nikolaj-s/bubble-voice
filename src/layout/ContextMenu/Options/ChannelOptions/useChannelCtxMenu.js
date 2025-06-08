import { FilePenLine, LayoutDashboard } from "lucide-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setChannelToViewWidgetsOf } from "../../../../features/Widgets/widgetsSlice";
import { setOverlay } from "../../../../features/Overlay/overlaySlice";
import { useNavigate } from "react-router";
import { setChannelToEdit } from "../../../../features/Channel/editChannel/editChannelSlice";
import { useSearchParams } from "react-router-dom";


export const useChannelCtxMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getChannelOptions = useCallback((options, data, permissions) => {
        const channel = data.channel;

        const root = `/dashboard/server/${channel.server_id}`;

        options.push({
            label: "View Widgets",
            icon: <LayoutDashboard color="var(--text-color)" />,
            onClick: () => {

                dispatch(setChannelToViewWidgetsOf(channel._id));

                dispatch(setOverlay('widgets'));

            },
            type: 'button'
        })

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
    }, [dispatch, navigate, setSearchParams])
    
    return {getChannelOptions};
}
