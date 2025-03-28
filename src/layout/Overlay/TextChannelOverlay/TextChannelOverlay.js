import React from 'react'
import { useSelector } from 'react-redux'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper';
import { TextChannel } from '../../../pages/server/channel/TextChannel/TextChannel';
import { ChannelProvider } from '../../../providers/ChannelProvider/ChannelProvider';

export const TextChannelOverlay = () => {

    const channel = useSelector(state => state.textChannelSlice.currentTextChannel);

    return (
        <FullScreenWrapper>
            <ChannelProvider overlay={true} channel_id_prop={channel}>
                <TextChannel channel={channel} />
            </ChannelProvider>
        </FullScreenWrapper>
    )
}
