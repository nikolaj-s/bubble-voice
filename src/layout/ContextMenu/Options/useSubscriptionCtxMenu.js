import { BellOff, Eye, RefreshCcw } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { unSubscribe } from "../../../features/Subscriptions/Thunks/unSubscribe";
import { getSubscriptions } from "../../../features/Subscriptions/Thunks/getSubscriptions";

export const useSubscriptionCtxMenu = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {loading, error, subscriptions} = useSelector(state => state.subscriptionsSlice);

    const getSubscriptionOptions = useCallback((options, subscription) => {

        options.push({
            label: "View Channel",
            icon: <Eye color="var(--text-color)" />,
            type: 'button',
            onClick: () => {

                navigate(`/dashboard/server/${subscription?.server_id?._id}/channel/${subscription?.channel_id?._id}`);

            }
        })

        options.push({
            label: "Refresh Subscriptions",
            icon: <RefreshCcw color="var(--text-color)" />,
            type: 'button',
            onClick: () => {
                if (loading) return;

                dispatch(getSubscriptions(true));
                
            }
        })

        options.push({
            label: `Unsubscribe from ${subscription?.channel_id?.channel_name}`,
            icon: <BellOff color="var(--error-color)" />,
            type: 'button',
            onClick: () => {

                if (loading) return;

                dispatch(unSubscribe(subscription?._id))
            },
            color: 'var(--error-color)'
        })

    }, [navigate, dispatch, loading, subscriptions]);

    return getSubscriptionOptions;

}