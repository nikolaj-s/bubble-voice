import React from 'react'
import { useSelector } from 'react-redux'
import { TextChannel } from '../TextChannel/TextChannel';
import { ChannelProvider } from '../../../../providers/ChannelProvider/ChannelProvider';
import { AbsoluteContentWrapper } from '../../../../components/ui/Wrappers/AbsoluteContentWrapper/AbsoluteContentWrapper';

export const TextChannelOverlay = () => {

    const channel = useSelector(state => state.textChannelSlice.currentTextChannel);

    return (
        <AbsoluteContentWrapper>
            <ChannelProvider overlay={true} channel_id_prop={channel}>
                <TextChannel channel={channel} />
            </ChannelProvider>
        </AbsoluteContentWrapper>
    )
}
