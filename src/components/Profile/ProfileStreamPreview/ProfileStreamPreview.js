
import MiniStreamIndicator from '../../ui/MiniStreamIndicator/MiniStreamIndicator';
import { Card } from '../../ui/Wrappers/Card/Card';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import TextButton from '../../ui/Buttons/TextButton/TextButton';
import { Eye } from 'lucide-react';
import { setCurrentVoiceChannel, setVoiceChannelFocused } from '../../../features/Channel/VoiceChannel/voiceChannelSlice';

export const ProfileStreamPreview = ({channel_status, _id}) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [sameServer, toggleSameServer] = useState(false);

    const {channels} = useSelector(state => state.channelsSlice);

    const {_id: user_id} = useSelector(state => state.accountSlice.account);

    const {currentVoiceChannel} = useSelector(state => state.voiceChannelSlice);

    useEffect(() => {

        if (channels[channel_status?.currentVoiceChannel]) {
            toggleSameServer(true);
        }

    }, [channel_status, channels])

    const handleJoinChannel = () => {

        const channel = channels[channel_status?.currentVoiceChannel];

        if (!channel) return;

        navigate(`/dashboard/server/${channel?.server_id}`);

        dispatch(setCurrentVoiceChannel(channel._id));

        dispatch(setVoiceChannelFocused(true));


    }

    if (!channel_status?.streamDetails || !sameServer) return null;

    return (
        <Card style={{margin: '0 5px', width: 'calc(100% - 10px)'}}>
            <Subtitle>is streaming in {channels[channel_status?.currentVoiceChannel]?.channel_name}:</Subtitle>
            <MiniStreamIndicator channel={channels[channel_status?.currentVoiceChannel]} streamColor={channel_status?.streamColor} thumbnail={channel_status?.streamPreview} name={channel_status?.streamDetails?.name} />
            {(user_id !== _id && currentVoiceChannel !== channel_status?.currentVoiceChannel) && (<TextButton action={handleJoinChannel} title='Watch Stream' icon={Eye} />)}
        </Card>
    )
}
