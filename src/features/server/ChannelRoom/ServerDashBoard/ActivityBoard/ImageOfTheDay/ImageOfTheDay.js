import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import "./ImageOfTheDay.css";
import { Image } from '../../../../../../components/Image/Image';
import { selectGlassPrimaryColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { setExpandedContent, setMetaData } from '../../../../../ExpandContent/ExpandContentSlice';
import { AltImageIcon } from '../../../../../../components/Icons/AltImageIcon/AltImageIcon';
import { VideoCard } from '../../../../../../components/VideoCard/VideoCard';
import { RedditPost } from '../../../../../../components/RedditPost/RedditPost';
import YouTube from 'react-youtube';

export const ImageOfTheDay = ({imageOfTheDay}) => {

    const dispatch = useDispatch();

    const glassColor = useSelector(selectGlassPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const handleExpand = (d) => {
        dispatch(setExpandedContent(imageOfTheDay.image));
        dispatch(setMetaData(imageOfTheDay))
    }

    const secondaryColor = useSelector(selectSecondaryColor);

    const primaryColor = useSelector(selectPrimaryColor);

    return (
        <div 
        style={{backgroundColor: secondaryColor}}
        className='image-of-the-day-container'>
            {imageOfTheDay && imageOfTheDay?.date ?
            <>
            <div 
            style={{
                height: imageOfTheDay?.type === 'video' || imageOfTheDay?.type === 'subreddit' ? 'auto' : 500
            }}
            className='image-of-the-day-wrapper'>
                {
                imageOfTheDay?.type === 'subreddit' ?
                <RedditPost mediaOfTheDay={true} action={(data) => {dispatch(setExpandedContent(data))}} data={imageOfTheDay?.media_data} />
                :
                imageOfTheDay?.type === 'video' ?
                <VideoCard mediaOfTheDay={true} data={imageOfTheDay} message={true} />
                : 
                imageOfTheDay?.type === 'song' ?
                <YouTube 
                width={'100%'}
                style={{
                    width: '100%',
                    height: 500
                }}
                opts={{
                    width: '100%',
                    height: '100%'
                }}
                videoId={imageOfTheDay?.content?.song?.id}
                />
                :
                <>
                <Image nsfw={imageOfTheDay.nsfw} zIndex={2} objectFit='contain' minLoadHeight={150} expandContent={handleExpand} cursor='pointer' borderRadius={'10px'} image={imageOfTheDay.image} alt_image={imageOfTheDay.preview} />
                <img alt="BLUR" className='back-drop-blur-image-of-the-day' src={imageOfTheDay.preview || imageOfTheDay.thumbnail} />
                </>
                }
                
            </div>
            <div 
            style={{backgroundColor: primaryColor}}
            className='image-info-wrapper'>
                <p
                style={{color: textColor}}
                >
                {imageOfTheDay?.type === "subreddit" ?
                `Top post selected randomly from one of the added subreddit channels`
                :
                imageOfTheDay?.type === 'song' ?
                `Random Youtube Video From Previous Results: ${imageOfTheDay?.content?.song?.title}`
                :
                `Found Related To The Query: ${(imageOfTheDay.query || imageOfTheDay.tags)}`
                }
                </p>
            </div>
            </>
            :
            <div
            style={{backgroundColor: primaryColor}}
            className='no-image-of-the-day'>
                <AltImageIcon />
                <p style={{color: textColor}} >No Image of The Day Available To Display</p>
            </div>
            
            }
        </div>
    )
}
