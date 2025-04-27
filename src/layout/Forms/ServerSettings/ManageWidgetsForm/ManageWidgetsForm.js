import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWidgetsToManage } from '../../../../features/Widgets/Thunks/fetchWidgetsToManage'
import { Widgets } from '../../../../components/Widgets/Widgets'
import Header from '../../../../components/ui/Titles/Header/Header'
import { useSearchParams } from 'react-router-dom'
import { reorderWidgets } from '../../../../features/Widgets/Thunks/reorderWidgets'

export const ManageWidgetsForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const {widgets, loading, channel_id} = useSelector(state => state.manageWidgetsSlice);

    const channel = useSelector(state => state.channelsSlice.channels.find(c => c._id === channel_id))

    React.useEffect(() => {

        if (!permissions.user_can_edit_channels) return;

        if (loading) return;

        dispatch(fetchWidgetsToManage());

    }, [])

    const handleReorderWidgets = (newOrder) => {
        if (loading) return;

        dispatch(reorderWidgets(newOrder));
    }

    const openAddWdigets = () => {

        setSearchParams({section: 'addWidget'});

    }

    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName='manageWidgetsSlice'>
                <Header text={`Manage Widgets For ${channel.channel_name}`} />
                <Widgets onReorder={handleReorderWidgets} openAddWidgets={openAddWdigets} widgets={widgets} editing={true} />
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
