// library's
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Loading } from '../../../LoadingComponents/Loading/Loading';
import { AltSearchButton } from '../../../buttons/AltSearchButton/AltSearchButton';

// state
import { selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectPopularSearches, throwServerError } from '../../../../features/server/ServerSlice';

// util
import { ImageSearch } from '../../../../util/ImageSearch';

// style
import "./ImageSearchPanel.css";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { VideoSearch } from '../../../../util/VideoSearch';

import { VideoPreview } from '../../../VideoPreview/VideoPreview';
import { ImagePreview } from '../../../ImagePreview/ImagePreview';
import { selectSavedMedia } from '../../../../features/SavedMedia/SavedMediaSlice';
import { selectShowFullResPreviews } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ViewSubReddit } from '../../../../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ViewSubReddits/ViewSubReddit';
import { selectLoadingNewMedia, selectMedia, setNewMedia } from '../../../../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';


export const ImageSearchPanel = ({searchingForImage, selectImage, serverId, inputHeight}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    const recommendations = useSelector(selectPopularSearches);

    const savedMedia = useSelector(selectSavedMedia);

    const showFullResPreviews = useSelector(selectShowFullResPreviews);

    const [mediaType, setMediaType] = React.useState('Images');

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const loadingNewMedia = useSelector(selectLoadingNewMedia);

    const images = useSelector(selectMedia);

    const [videos, setVideos] = React.useState([]);

    const [query, setQuery] = React.useState("");

    const handleQuery = (e) => {

        setQuery(e.target.value);

    }

    const search = async () => {

        if (query.length === 0) return;

        toggleLoading(true);

        const result = mediaType === 'Videos' ? await VideoSearch(query, serverId) : await ImageSearch(query, serverId);
        
        setQuery("");

        if (result.error) {

            toggleLoading(false);

            return dispatch(throwServerError({errorMessage: result.errorMessage}));
        
        }
        
        dispatch(setNewMedia([]));
        
        setTimeout(() => {
            
            toggleLoading(false);
            
            mediaType === 'Images' ? dispatch(setNewMedia(result.media)) : setVideos(result.media);

        }, 100)
        
    }

    const handleEnter = (e) => {

        if (e.keyCode === 13) return search();
    
    }

    const handleSelectImage = (image) => {
        console.log(image)
        selectImage(image)
    }

    const handleMediaType = (page) => {
        setMediaType(page)

        document.getElementById('message-image-search-input')?.focus();
    } 

    React.useEffect(() => {
        try {
            if (searchingForImage) {
                document.getElementById('message-image-search-input').focus();
            } else {
                document.getElementById('social-input-selector').focus();
            }

        } catch (error) {
            console.log(error);
        }
        
    }, [searchingForImage])

    const handleTag = (tag) => {

        if (loading) return;

        setQuery(tag);
        
        setTimeout(() => {
            document.getElementsByClassName('message-image-search-button')[0].click();
        }, 50)
    }

    return (
        <AnimatePresence exitBeforeEnter>
            {searchingForImage ?
            <motion.div 
            key="message-image-search-container"
            className='message-image-search-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor,
                    bottom: inputHeight + 10
                }}
                className='inner-message-image-search-container'>
                    <div className='media-search-nav-container'>
                        <h3 onClick={() => {handleMediaType("Images")}} style={{color: textColor, backgroundColor: mediaType === 'Images' ? primaryColor : null, opacity: mediaType === 'Images' ? 1 : 0.6}}>Images</h3>
                        <h3 onClick={() => {handleMediaType("Videos")}} style={{color: textColor, backgroundColor: mediaType === 'Videos' ? primaryColor : null, opacity: mediaType === 'Videos' ? 1 : 0.6}}>Videos</h3>
                        <h3 onClick={() => {handleMediaType("Reddit")}} style={{color: textColor, backgroundColor: mediaType === 'Reddit' ? primaryColor : null, opacity: mediaType === 'Reddit' ? 1 : 0.6}}>Reddit</h3>
                        <h3 onClick={() => {handleMediaType("Saves")}} style={{color: textColor, backgroundColor: mediaType === 'Saves' ? primaryColor : null, opacity: mediaType === 'Saves' ? 1 : 0.6}}>Saves</h3>
                    </div>
                    {mediaType === 'Saves' || mediaType === 'Reddit' ? null :
                    <div 
                    className='message-image-search-input-wrapper'>
                        <input 
                        id="message-image-search-input"
                        style={{color: textColor, backgroundColor: primaryColor}}
                        maxLength={120} onKeyUp={handleEnter} onChange={handleQuery} value={query} placeholder={`Search For ${mediaType}`} />
                        <div className='message-image-search-button'>
                            <AltSearchButton padding={5} active={query.length === 0} action={search} margin={'0 0 0 10px'} width={30} height={18} invert={true}  borderRadius={0} />
                        </div>
                    </div>}
                    
                    <div className='message-image-search-results-container'>
                    {mediaType === 'Reddit' ?
                    <ViewSubReddit expand={(i) => {handleSelectImage({preview: i, image: i})}} />
                    :
                    <ResponsiveMasonry style={{height: 'auto'}} columnsCountBreakPoints={{1000: 2, 1500: 3}}>
                        <Masonry gutter='5px'>   
                            {mediaType === 'Videos' ?
                            (videos?.length > 0 ? videos : loading ? [] : recommendations.filter(v => v.type === 'video').slice(0, 15)).map(video => {
                                return <VideoPreview video={video} action={handleSelectImage} />
                            })
                            : mediaType === 'Saves' ?
                            savedMedia.map(media => {
                                return (
                                    media.type === 'image' ?
                                    <ImagePreview action={() => {handleSelectImage({preview: media.media, type: 'image', image: media.media})}} image={media.media} />
                                    :
                                    <VideoPreview action={() => {handleSelectImage({preview: media.media, type: 'video', image: media.media})}} video={{preview: media.media}} />
                                )
                            })
                            
                            : (images?.length > 0 ? images : loading ? [] : recommendations.filter(v => v.type === 'image').slice(0, 40)).map((image, key) => {
                                return (
                                    <ImagePreview tag_action={handleTag} tags={image.tags} image={showFullResPreviews ? image.image : image.preview} action={(e) => {handleSelectImage({...image, preview: image.image})}} />
                                )
                            })}
                        </Masonry>
                    </ResponsiveMasonry>}
                    </div>
                </div>
                <Loading backgroundColor={glassColor} loading={loading || loadingNewMedia}  />
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
