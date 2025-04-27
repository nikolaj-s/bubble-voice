import React from 'react'
import { FixedSideMenuWrapper } from '../../../components/ui/Wrappers/FixedSideMenuWrapper/FixedSideMenuWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { SkeletonCards } from '../../../components/ui/Loading/SkeletonCards/SkeletonCards';
import { Widgets } from '../../../components/Widgets/Widgets';
import ErrorCard from '../../../components/Error/ErrorCard/ErrorCard';
import { fetchWidgets } from '../../../features/Widgets/Thunks/fetchWidgets';
import Header from '../../../components/ui/Titles/Header/Header';
import { IconPlaceholder } from '../../../components/ui/Placeholders/IconPlaceholder/IconPlaceholder';
import { Ellipsis, LayoutDashboard, RefreshCcw } from 'lucide-react';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { useSearchParams } from 'react-router-dom';
import { setManageWidgetsForChannel } from '../../../features/Widgets/manageWidgetsSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';

export const WidgetsOverlay = ({close}) => {

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const {widgets, loading, error} = useSelector(state => state.widgetsSlice);

    const [channel, setChannel] = React.useState(null);

    const textChannel = useSelector(state => state.textChannelSlice.currentTextChannel);

    const currentChannel = useSelector(state => state.channelsSlice.currentChannel);

    React.useEffect(() => {

        if (textChannel) {
            setChannel(textChannel)
        } else if (currentChannel?.channel_id) {
            setChannel(currentChannel?.channel_id);
        }

    }, [textChannel, currentChannel?.channel_id])

    React.useEffect(() => {

        if (!channel) return;

        if (!widgets[channel]) {
            dispatch(fetchWidgets(channel));
        }

    }, [channel, widgets, dispatch])

    const refreshWidgets = () => {
        if (loading) return;

        dispatch(fetchWidgets(textChannel || currentChannel?.channel_id));
    }

    const openAddMoreWidgets = () => {

        dispatch(setManageWidgetsForChannel(channel));

        setSearchParams({section: 'addWidget'});

        dispatch(setOverlay('serverSettings'));
    }

    return (
        <FixedSideMenuWrapper close={close} >
            <IconPlaceholder icon={LayoutDashboard} />
            <Header text='Widgets' />
            <ToolBar id={'widgets-overlay-nav'} data-context={JSON.stringify({type: 'widgetsOverlay', channel_id: channel})}>
                <IconButton 
                Icon={<RefreshCcw color='var(--text-color' />}
                title={"Refresh"}
                onClick={refreshWidgets}
                />
                <IconButton
                Icon={<Ellipsis color='var(--text-color' />}
                title={'More'} 
                onClick={(e) => {triggerContext(e, 'widgets-overlay-nav')}}
                />
            </ToolBar>
            <LineSpacer />
            {loading ?
            <SkeletonCards />
            : error ?
            <ErrorCard  message={error} />      
            :
            <Widgets widgets={widgets[channel] ? widgets[channel] : []} openAddWidgets={openAddMoreWidgets} />
            }
        </FixedSideMenuWrapper>
    )
}
