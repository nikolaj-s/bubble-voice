import { Pencil, Trash2 } from 'lucide-react';
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteWidget } from '../../../../features/Widgets/Thunks/deleteWidget';

export const useWidgetCtxMenu = () => {

    const dispatch = useDispatch();

    const getWidgetOptions = useCallback((options, data, permissions) => {

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

    }, [dispatch])

    return {getWidgetOptions}
}
