import { useDispatch, useSelector } from "react-redux"
import { setFilter, setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from "../features/Search/searchSlice";
import { globalSearch } from "../features/Search/Thunks/globalSearch";
import { setOverlay } from "../features/Overlay/overlaySlice";
import { isValidObjectId } from "../lib/services/helperFunctions";
import { triggerAlert } from "../features/Alerts/alertsSlice";
import { setChannelToEdit } from "../features/Channel/editChannel/editChannelSlice";
import { useSearchParams } from "react-router-dom";
import { setChannelToViewWidgetsOf } from "../features/Widgets/widgetsSlice";
import { setChannelDescription } from "../features/Channel/ChannelDescription/channelDescriptionSlice";

export const useChannelMethods = () => {

    const [_, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const channels = useSelector(state => state.channelsSlice.channels)

    const throwError = (msg = "Invalid Channel") => {
        dispatch(triggerAlert(msg));
    }

    const returnChannelObj = (channel) => {

        let l_channel;

        if (isValidObjectId(channel)) {
            l_channel = channels[channel]
        } else if (channel?._id) {
            l_channel = channel;
        }

        return l_channel;

    } 

    const openPinnedMessages = (channel) => {

        let l_channel = returnChannelObj(channel);

        if (!l_channel) return throwError('Invalid Channel');

        dispatch(setSelectedChannelToFilter(l_channel));

        dispatch(setFilter({path: 'text-channel'}));

        dispatch(setTextChannelFilter({isPinned: true, hasImage: false, hasVideo: false, hasLink: false}));
        
        dispatch(setFromDate(null));

        dispatch(globalSearch());

        dispatch(setOverlay('search'));

    }

    const editSelectedChannel = (channel) => {

        let l_channel = returnChannelObj(channel);

        if (!l_channel) return throwError("Invalid Channel");

        dispatch(setChannelToEdit(l_channel));

        setSearchParams({section: 'editChannel', channel: l_channel._id});

        dispatch(setOverlay('serverSettings'));
    }

    const viewWidgets = (channel) => {

        const l_channel = returnChannelObj(channel);

        if (!l_channel) return throwError("Invalid Channel");

        dispatch(setChannelToViewWidgetsOf(l_channel._id));

        dispatch(setOverlay('widgets'));
    }

    const viewChannelDescription = (channel) => {
        
        const l_channel = returnChannelObj(channel);

        if (!l_channel) return throwError();

        dispatch(setChannelDescription(l_channel));

        dispatch(setOverlay('channelDescription'));
    }

    return {openPinnedMessages, editSelectedChannel, viewWidgets, viewChannelDescription}

}