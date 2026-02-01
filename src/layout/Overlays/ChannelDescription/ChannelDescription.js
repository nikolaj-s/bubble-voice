
import { useSelector } from 'react-redux'
import { IconPlaceholder } from '../../../components/ui/Placeholders/IconPlaceholder/IconPlaceholder';
import { Hash, Pencil, Pin, Volume2 } from 'lucide-react';
import { ImageComponent } from '../../../components/ui/Image/Image';
import Header from '../../../components/ui/Titles/Header/Header';
import { Description } from '../../../components/ui/Description/Description';
import { BoxLabel } from '../../../components/ui/Titles/BoxLabel/BoxLabel';
import { ToolBar } from '../../../components/ui/Wrappers/ToolBar/ToolBar';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import { ChannelBackground } from '../../../components/ChannelBackground/ChannelBackground';
import { useChannelMethods } from '../../../hooks/useChannelMethods';
import { MenuCloseHeader } from '../../../components/Headers/MenuCloseHeader/MenuCloseHeader';

export const ChannelDescription = ({close}) => {

    const {user_id} = useSelector(state => state.accountSlice.account);

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const permissions = useSelector(state => state.serverPermissionsSlice.permissions[user?.server_group]);

    const channel = useSelector(state => state.channelDescriptionSlice.selectedChannel);

    const {openPinnedMessages, editSelectedChannel} = useChannelMethods();

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start',
                position: 'relative',
                backgroundColor: 'var(--card-background-color)',
                borderRadius: 10,
                margin: '0 auto',
                maxWidth: '600px',
                minWidth: 300,
                overflow: 'hidden',
                width: '100%'
            }}>
                <MenuCloseHeader title={'Channel Details'} onClose={close} />
                <div style={{
                    display: 'flex',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    padding: 'var(--padding)',
                    boxSizing: 'border-box'
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
                    <IconPlaceholder icon={Volume2} />
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
                        onClick={() => {editSelectedChannel(channel)}}
                        />)}
                    {channel?.channel_type === 'text' && <IconButton
                        onClick={() => {openPinnedMessages(channel)}}
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
