// library's
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Loading } from '../../../LoadingComponents/Loading/Loading';
import { AltSearchButton } from '../../../buttons/AltSearchButton/AltSearchButton';

// state
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectPopularSearches, throwServerError } from '../../../../features/server/ServerSlice';

// util
import { ImageSearch } from '../../../../util/ImageSearch';

// style
import "./ImageSearchPanel.css";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { VideoSearch } from '../../../../util/VideoSearch';

import { VideoPreview } from '../../../VideoPreview/VideoPreview';
import { ImagePreview } from '../../../ImagePreview/ImagePreview';


export const ImageSearchPanel = ({searchingForImage, selectImage, serverId}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const recommendations = useSelector(selectPopularSearches);

    const [mediaType, setMediaType] = React.useState('Images');

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [images, setImages] = React.useState([]);

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
        
        setImages([]);

        setTimeout(() => {
            
            toggleLoading(false);
            console.log(result.media)
            mediaType === 'Images' ? setImages(result.media) : setVideos(result.media);

        }, 100)
        
    }

    const handleEnter = (e) => {

        if (e.keyCode === 13) return search();
    
    }

    const handleSelectImage = (image) => {
       
        selectImage(image)
    }

    const handleMediaType = (page) => {
        setMediaType(page)

        document.getElementById('message-image-search-input').focus();
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.1}}
            key="message-image-search-container"
            className='message-image-search-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor
                }}
                className='inner-message-image-search-container'>
                    <div 
                    className='message-image-search-input-wrapper'>
                        <input 
                        id="message-image-search-input"
                        style={{color: textColor, backgroundColor: primaryColor}}
                        maxLength={120} onKeyUp={handleEnter} onChange={handleQuery} value={query} placeholder={`Search For ${mediaType}`} />
                        <div className='message-image-search-button'>
                            <AltSearchButton active={query.length === 0} action={search} margin={'0 0 0 10px'} width={15} height={15} invert={true}  borderRadius={5} />
                        </div>
                    </div>
                    <div className='media-search-nav-container'>
                        <h3 onClick={() => {handleMediaType("Images")}} style={{color: textColor, backgroundColor: mediaType === 'Images' ? primaryColor : null, opacity: mediaType === 'Images' ? 1 : 0.6}}>Images</h3>
                        <h3 onClick={() => {handleMediaType("Videos")}} style={{color: textColor, backgroundColor: mediaType === 'Videos' ? primaryColor : null, opacity: mediaType === 'Videos' ? 1 : 0.6}}>Videos</h3>
                    </div>
                    <div className='message-image-search-results-container'>
                    <ResponsiveMasonry columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3}}>
                        <Masonry gutter='5px'>   
                            {mediaType === 'Videos' ?
                            (videos?.length > 0 ? videos : loading ? [] : recommendations.filter(v => v.type === 'video').slice(0, 15)).map(video => {
                                return <VideoPreview video={video} action={handleSelectImage} />
                            })
                            : (images?.length > 0 ? images : loading ? [] : recommendations.filter(v => v.type === 'image').slice(0, 15)).map((image, key) => {
                                return (
                                    <ImagePreview tag_action={handleTag} tags={image.tags} image={image.preview} action={(e) => {handleSelectImage(image)}} />
                                )
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                    </div>
                </div>
                <Loading loading={loading} />
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
