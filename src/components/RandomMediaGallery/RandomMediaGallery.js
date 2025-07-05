import React, { useMemo } from 'react';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import styles from './RandomMediaGallery.module.css';

import { ImageComponent } from '../ui/Image/Image';
import { NsfwWrapper } from '../ui/Wrappers/NsfwWrapper/NsfwWrapper';
import OverlayActionButton from '../ui/Buttons/OverlayActionButton/OverlayActionButton';
import { ImageTooltipWrapper } from '../ui/Wrappers/ImageTooltipWrapper/ImageTooltipWrapper';
import { MediaTitle } from '../ui/Titles/MediaTitle/MediaTitle';
import { Images } from 'lucide-react';
import { LongPressGestureWrapper } from '../ui/Gestures/LongPressGestureWrapper';
import { triggerContext } from '../../lib/services/helperFunctions';
import { VideoPreview } from '../ui/Video/VideoPreview/VideoPreview';
import { Card } from '../ui/Wrappers/Card/Card';

const RandomMediaGallery = ({ media = [], title = "", action = () => {} }) => {

    const randomMedia = useMemo(() => {
        const shuffled = [...media].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 9);
    }, [media]);

    return (
        <Card>
            <MediaTitle icon={Images} title={title} />
            <ResponsiveMasonry className={styles.galleryContainer} columnsCountBreakPoints={{ 1000: 3, }}>
                <Masonry gutter="16px">
                    {randomMedia.map((item, idx) => (
                    <div key={idx} className={styles.card} >
                        <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, item.src)}} >
                            <NsfwWrapper nsfw={item}>
                                {item.type === 'video' ? (
                                    <VideoPreview action={action} {...item} />
                                ) : (
                                
                                    <ImageTooltipWrapper image={item}>
                                        <ImageComponent objectFit='cover' src={item.thumbnail} />
                                    </ImageTooltipWrapper>
                                
                                )}
                        
                            </NsfwWrapper>
                        </LongPressGestureWrapper>
                    </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
            <OverlayActionButton action={action} title={"See more..."} />
        </Card>
    );
};

export default RandomMediaGallery;
