import React from 'react'

import { NsfwWrapper } from '../../../../../components/ui/Wrappers/NsfwWrapper/NsfwWrapper'

import { ImageComponent } from '../../../../../components/ui/Image/Image'

import { ImageTooltipWrapper } from '../../../../../components/ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper'

import { ImageMasonryWrapper } from '../../../../../components/ui/Wrappers/ImageMasonryWrapper/ImageMasonryWrapper'
import { LongPressGestureWrapper } from '../../../../../components/ui/Gestures/LongPressGestureWrapper'
import { triggerContext } from '../../../../../lib/services/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../../../../../features/Channel/TextChannel/Thunks/sendMessage'
import { closeOverlay } from '../../../../../features/Overlay/overlaySlice'

export const ImageResults = ({images, id = 'image-grid', send = () => {}}) => {

    const dispatch = useDispatch();

    const {currentTextChannel} = useSelector(state => state.textChannelSlice);

    const {showFullResolutionPreviews, autoSendOnClick} = useSelector(state => state.searchSettingsSlice);

    const sendToChannel = (e, image) => {

        if (!currentTextChannel || !autoSendOnClick) return;

        if (autoSendOnClick && currentTextChannel) {
          //  e.stopPropagation();

            dispatch(sendMessage({channel_id: currentTextChannel, text: image.src, ...image}));

            dispatch(closeOverlay());

        }
    
    }

    return (
        <ImageMasonryWrapper>
            {images.map((image, index) => {
                return (
                <LongPressGestureWrapper key={image.src + index}  width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, image.src)}}>   
                    <ImageTooltipWrapper 
                        showCtxButton={true}
                        disableDefaultBehaviour={autoSendOnClick && currentTextChannel}
                        image={image}>
                        <NsfwWrapper 
                        nsfw={{...image}} >
                            <div 
                            style={{width: '100%', height: '100%'}}
                            onClick={(e) => {
                                sendToChannel(e, image);
                            }}
                            >
                                <ImageComponent src={showFullResolutionPreviews ? image.src : image.src.includes('.gif') ? image.src : image.thumbnail} />
                        
                            </div>
                        </NsfwWrapper>
                    </ImageTooltipWrapper>
                </LongPressGestureWrapper> 
                        
                )
            })}
        </ImageMasonryWrapper>
    )
}
