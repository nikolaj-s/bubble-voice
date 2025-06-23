
import { useDispatch, useSelector } from 'react-redux'
import { IconPlaceholder } from '../../../components/ui/Placeholders/IconPlaceholder/IconPlaceholder';
import { Hash, Pencil, Pin, Volume1 } from 'lucide-react';
import { ImageComponent } from '../../../components/ui/Image/Image';
import Header from '../../../components/ui/Titles/Header/Header';
import { Description } from '../../../components/ui/Description/Description';
import { BoxLabel } from '../../../components/ui/Titles/BoxLabel/BoxLabel';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { useSearchParams } from 'react-router-dom';
import { setChannelToEdit } from '../../../features/Channel/editChannel/editChannelSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';
import { setFilter, setFromDate, setSelectedChannelToFilter, setTextChannelFilter } from '../../../features/Search/searchSlice';
import { globalSearch } from '../../../features/Search/Thunks/globalSearch';
import { ChannelBackground } from '../../../components/ChannelBackground/ChannelBackground';

export const ChannelDescription = ({close}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    const {user_id} = useSelector(state => state.accountSlice.account);

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const permissions = useSelector(state => state.serverPermissionsSlice.permissions[user?.server_group]);

    const channel = useSelector(state => state.channelDescriptionSlice.selectedChannel);

    const openEditChannel = () => {
        dispatch(setChannelToEdit(channel));

        setSearchParams({section: 'editChannel', channel: channel._id});

        dispatch(setOverlay('serverSettings'));
    }

    const handleOpenPins = () => {

        dispatch(setSelectedChannelToFilter(channel));

        dispatch(setFilter({path: 'text-channel'}));

        dispatch(setTextChannelFilter({isPinned: true, hasImage: false, hasVideo: false, hasLink: false}));

        dispatch(setFromDate(null));

        dispatch(globalSearch());

        dispatch(setOverlay('search'));

    }

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start',
                position: 'relative',
                padding: 'var(--padding)',
                backgroundColor: 'var(--card-background-color)',
                borderRadius: 10,
                margin: '0 auto',
                maxWidth: '400px',
                minWidth: 300,
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'flex',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 2,
                    width: '100%'
                }}>
                <BoxLabel label={`${channel.channel_type} channel`} />
                {channel.channel_icon ?
                <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    overflow: 'hidden'
                }}>
                    <ImageComponent src={channel.channel_icon} />
                </div>
                :
                channel.channel_type === 'voice' ?
                <IconPlaceholder icon={Volume1} />
                :
                <IconPlaceholder icon={Hash} />
                }
                <Header margin={0} text={channel.channel_name} />

                <Description description={channel.channel_description} />
                <ToolBar>
                    {permissions?.user_can_edit_channels && 
                    (<IconButton 
                    title={'Edit Channel'}
                    Icon={<Pencil size={15} color='var(--text-color)' />}
                    onClick={openEditChannel}
                    />)}
                   {channel?.channel_type === 'text' && <IconButton
                    onClick={handleOpenPins}
                    title={'See Pinned Content'}
                    Icon={<Pin size={15} color='var(--text-color)' />}
                    />}

                </ToolBar>
                </div>
                <ChannelBackground {...channel} />
            </div>
        </>
    )
}
