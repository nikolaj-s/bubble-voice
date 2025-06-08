import { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { closeOverlay, setOverlay } from '../../../../features/Overlay/overlaySlice';
import { setManageWidgetsForChannel } from '../../../../features/Widgets/manageWidgetsSlice';

export const useWidgetsCtxMenu = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    
    const getWidgetsOptions = useCallback((options, data, permissions) => {
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

    }, [dispatch, setSearchParams]);

    return {getWidgetsOptions};
}
