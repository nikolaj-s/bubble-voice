import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SkeletonCards } from '../../../components/ui/Loading/SkeletonCards/SkeletonCards';
import { Widgets } from '../../../components/Widgets/Widgets';
import ErrorCard from '../../../components/Error/ErrorCard/ErrorCard';
import { fetchWidgets } from '../../../features/Widgets/Thunks/fetchWidgets';
import { Ellipsis, LayoutDashboard, RefreshCcw } from 'lucide-react';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { useSearchParams } from 'react-router-dom';
import { setManageWidgetsForChannel } from '../../../features/Widgets/manageWidgetsSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';

import ContentHeader from '../../../components/Headers/ContentHeader/ContentHeader';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { ChannelBackground } from '../../../components/ChannelBackground/ChannelBackground';

export const WidgetsOverlay = ({close}) => {

    const dispatch = useDispatch();

    const [, setSearchParams] = useSearchParams();

    const {widgets, loading, error} = useSelector(state => state.widgetsSlice);

    const channel = useSelector(state => state.widgetsSlice.channel);

    const subtitles = [
        "Gadgets for days. Mischief for nights.",
        "Welcome to the Bubbleverse toolkit—bring your own confetti!",
        "Widgets: The secret sauce to your daily Bubble stew.",
        "Don’t just press buttons. Summon mini-miracles.",
        "Widgets? More like wish-granting gremlins.",
        "Add a dash of chaos (the fun kind).",
        "Welcome to Widget City: Population—you and your wild ideas.",
        "These aren’t your grandma’s widgets. (Unless your grandma codes.)",
        "Click, toggle, boom—magic unlocked.",
        "Pet a virtual platypus. (Coming soon. Maybe.)",
        "Release the kraken! (Or just a timer, your call.)",
        "Tools so cool, they need a warning label.",
        "Supercharge your Bubble—zero side effects, infinite possibilities.",
        "From mood lighting to disco ducks—customize it all.",
        "Curated for rebels, dreamers, and anyone bored of boring."
    ]

    React.useEffect(() => {

        if (!channel) return;

        if (!widgets[channel]) {
            dispatch(fetchWidgets(channel));
        }

    }, [channel, widgets, dispatch])

    const refreshWidgets = () => {
        if (loading) return;

        dispatch(fetchWidgets(channel));
    }

    const openAddMoreWidgets = () => {

        dispatch(setManageWidgetsForChannel(channel));

        setSearchParams({section: 'addWidget'});

        dispatch(setOverlay('serverSettings'));
    }

    const channelDetails = useSelector(state => state.channelsSlice.channels[channel])

    return (
        <ScrollLoadWrapper 
        style={{
            background: channelDetails?.channel_background ? `URL(${channelDetails?.channel_background})` : null,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: 'var(--primary-color)'
        }}
        noMoreItems={true} >
            <ContentHeader Icon={LayoutDashboard} title={`${channelDetails?.channel_name} / Widgets`} subTitle={subtitles[Math.floor(Math.random() * subtitles.length)]} />
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
            <LineSpacer margin={'10px 0px'} />
            {loading ?
            <SkeletonCards />
            : error ?
            <ErrorCard  message={error} />      
            :
            <Widgets widgets={widgets[channel] ? widgets[channel] : []} openAddWidgets={openAddMoreWidgets} />
            }
       </ScrollLoadWrapper>
    )
}
