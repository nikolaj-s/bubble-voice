
import { ChannelProvider } from '../../../providers/ChannelProvider/ChannelProvider';

import { useSelector } from 'react-redux';

import { TextChannel } from './TextChannel/TextChannel';

export const Channel = () => {

    const textChannel = useSelector(state => state.textChannelSlice.currentTextChannel);
   
    return (
        <ChannelProvider>
            {textChannel ?
            <TextChannel channel={textChannel} />
            : null}
        </ChannelProvider>
    )
}
