import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import { useSelector } from 'react-redux'
import { IconPlaceholder } from '../../../components/ui/Placeholders/IconPlaceholder/IconPlaceholder';
import { Hash, Volume1 } from 'lucide-react';
import { ImageComponent } from '../../../components/ui/Image/Image';
import Header from '../../../components/ui/Titles/Header/Header';
import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer';
import { Description } from '../../../components/ui/Description/Description';
import { BoxLabel } from '../../../components/ui/Titles/BoxLabel/BoxLabel';

export const ChannelDescription = ({close}) => {

    const channel = useSelector(state => state.channelDescriptionSlice.selectedChannel);

    return (
        <FullScreenWrapper maxContentWidth={450} onClose={close}>
            
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start'
            }}>
                <BoxLabel label={channel.channel_type} />
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
                <LineSpacer />
                <Description description={channel.channel_description} />
            </div>

        </FullScreenWrapper>
    )
}
