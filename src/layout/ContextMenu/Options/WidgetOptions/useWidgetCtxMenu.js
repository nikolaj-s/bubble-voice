import { Pin, PinOff, Trash2 } from 'lucide-react';
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWidget } from '../../../../features/Widgets/Thunks/deleteWidget';
import { editWidget } from '../../../../features/Widgets/Thunks/editWidget';

export const useWidgetCtxMenu = () => {

    const dispatch = useDispatch();

    const {disable_pinning_widgets} = useSelector(state => state.serverDetailsSlice.details)

    const getWidgetOptions = useCallback((options, data, permissions) => {

        if (permissions.user_can_edit_channels) {
            
            if (!data.pinned && !disable_pinning_widgets) {
                options.push({
                    label: data.pinned ? "Unpin Widget From Dashboard" : "Pin Widget To Dashboard",
                    onClick: () => {
                        dispatch(editWidget({...data, pinned: !data.pinned, pinning: !data.pinned}));
                    },
                    type: 'button',
                    icon: data.pinned ? <PinOff color='var(--text-color)' /> : <Pin color='var(--text-color)' />
                })
            }

            options.push({
                label: "Delete Widget",
                onClick: () => dispatch(deleteWidget(data._id)),
                type: 'button',
                icon: <Trash2 color="var(--error-color)" />
            })
        }

    }, [dispatch, disable_pinning_widgets])

    return {getWidgetOptions}
}
