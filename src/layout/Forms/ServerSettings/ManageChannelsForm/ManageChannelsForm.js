import React from 'react'
import { NotAuthorized } from '../../../../components/Error/NotAuthorized/NotAuthorized'
import { LoadingErrorFormWrapper } from '../../../../components/ui/Wrappers/LoadingErrorFormWrapper/LoadingErrorFormWrapper'
import { useDispatch, useSelector } from 'react-redux'
import TextButton from '../../../../components/ui/Buttons/TextButton/TextButton'
import { useSearchParams } from 'react-router-dom'
import { setChannelToEdit } from '../../../../features/Channel/editChannel/editChannelSlice'
import { ImageComponent } from '../../../../components/ui/Image/Image'
import { Hash, Volume1 } from 'lucide-react'
import Header from '../../../../components/ui/Titles/Header/Header'
import { LineSpacer } from '../../../../components/ui/Spacers/LineSpacer/LineSpacer'
import Label from '../../../../components/ui/Titles/Label/Label'
import TextInput from '../../../../components/ui/Inputs/TextInput/TextInput'

export const ManageChannelsForm = ({permissions}) => {

    const dispatch = useDispatch();

    const [filter, setFilter] = React.useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    const {channels} = useSelector(state => state.channelsSlice);

    const handleOpenChannelToManage = (channel) => {
        dispatch(setChannelToEdit(channel));

        setSearchParams({section: 'editChannel', channel: channel._id});
    }

    return (
        <NotAuthorized permission={permissions.user_can_edit_channels}>
            <LoadingErrorFormWrapper sliceName='channelsSlice'>
                <Header text='Manage Channels' />
                <Label label='Filter Channels By Name:' />
                <TextInput value={filter} onChange={setFilter} placeholder={'filter'} />
                <LineSpacer />
                {Object.values(channels).sort((a,b) => a.channel_name.localeCompare(b.channel_name)).filter(c => c.channel_name.toLowerCase().includes(filter)).map(channel => (
                    <TextButton 
                    action={() => {handleOpenChannelToManage(channel)}}
                    icon={
                        <>
                        {channel.channel_icon ?
                        <div style={{width: 24, height: 24, borderRadius: '50%', overflow: 'hidden'}}>
                            <ImageComponent src={channel.channel_icon} />
                        </div>
                        : channel.channel_type === 'voice' ?
                        <Volume1 color='var(--text-color)' />
                        :
                        <Hash color='var(--text-color)' />
                        }
                        </>
                    }
                    title={channel.channel_name} 
                    key={channel._id}  
                    />
                ))}
            </LoadingErrorFormWrapper>
        </NotAuthorized>
    )
}
