import { ChevronRight, LayoutDashboard } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOverlay } from "../../../../features/Overlay/overlaySlice";
import { setChannelToViewWidgetsOf } from "../../../../features/Widgets/widgetsSlice";


export const useViewWidgetsCtxMenu = () => {

    const dispatch = useDispatch();

    const channels = useSelector(state => state.channelsSlice.channels);

    const getViewWidgetsOption = useCallback((options) => {
        let widget_options = [];

        Object.values(channels).sort((a, b) => 
            a.channel_name.localeCompare(b.channel_name, undefined, { sensitivity: 'base' })
            ).forEach(channel => { 

            widget_options.push({
                label: channel.channel_name,
                type: 'button',
                icon: <LayoutDashboard color="var(--text-color)" />,
                onClick: () => {
                    dispatch(setChannelToViewWidgetsOf(channel._id));

                    dispatch(setOverlay('widgets'));
                }
            })

        })

        options.push({
            label: "View Widgets From",
            submenuOptions: widget_options,
            icon: <ChevronRight color="var(--text-color)" />,
            useFilter: true
        })

    }, [dispatch, channels]);

    return {getViewWidgetsOption};
}
