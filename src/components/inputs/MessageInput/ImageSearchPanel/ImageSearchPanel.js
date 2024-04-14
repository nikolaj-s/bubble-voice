// library's
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Loading } from '../../../LoadingComponents/Loading/Loading';
import { AltSearchButton } from '../../../buttons/AltSearchButton/AltSearchButton';

// state
import { selectAccentColor, selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectBannedKeywords, selectPopularSearches, throwServerError } from '../../../../features/server/ServerSlice';

// util
import { ImageSearch } from '../../../../util/ImageSearch';

// style
import "./ImageSearchPanel.css";
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { VideoSearch } from '../../../../util/VideoSearch';
import { VideoPreview } from '../../../VideoPreview/VideoPreview';
import { ImagePreview } from '../../../ImagePreview/ImagePreview';
import { selectSavedMedia } from '../../../../features/SavedMedia/SavedMediaSlice';
import { selectDisableTransparancyEffects, selectShowFullResPreviews } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { ViewSubReddit } from '../../../../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ViewSubReddits/ViewSubReddit';
import { selectLoadingNewMedia, selectMedia, setNewMedia } from '../../../../features/server/ChannelRoom/ServerDashBoard/ServerMedia/ServerMediaSlice';
import { NoSavesIcon } from '../../../Icons/NoSavesIcon/NoSavesIcon';
import { ImageButton } from '../ImageButton/ImageButton';
import { AltImageIcon } from '../../../Icons/AltImageIcon/AltImageIcon';
import { EmojiIcon } from '../../../Icons/EmojiIcon/EmojiIcon';

import { RedditIcon } from '../../../Icons/RedditIcon/RedditIcon'
import { SavesIcon } from '../../../Icons/SavesIcon/SavesIcon'
import { EmojiMenu } from '../../../EmojiPicker/EmojiMenu';
import { ImageSearchFilterMenu } from './ImageSearchFilterMenu/ImageSearchFilterMenu';
export const ImageSearchPanel = ({channelId,hideOptions = false,direct_message, searchingForImage, selectImage, serverId, inputHeight, close, upload_image, persist, postEmoji}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const accentColor = useSelector(selectAccentColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    const recommendations = useSelector(selectPopularSearches);

    const savedMedia = useSelector(selectSavedMedia);

    const showFullResPreviews = useSelector(selectShowFullResPreviews);

    const [mediaType, setMediaType] = React.useState('Images');

    const [format, setFormat] = React.useState("images");

    const [mediaLocation, setMediaLocation] = React.useState("");

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const loadingNewMedia = useSelector(selectLoadingNewMedia);

    const images = useSelector(selectMedia);

    const bannedKeywords = useSelector(selectBannedKeywords);

    const disableTransparancy = useSelector(selectDisableTransparancyEffects);

    const [videos, setVideos] = React.useState([]);

    const [query, setQuery] = React.useState("");

    const handleQuery = (e) => {

        setQuery(e.target.value);

    }

    const handleEmoji = (emoji) => {
        postEmoji(emoji.emoji)
    }

    const search = async () => {

        if (query.length === 0) return;

        let blocked = false;

        for (const word of bannedKeywords) {
            if (query.toLowerCase().includes(word)) {
                dispatch(throwServerError({error: true, errorMessage: `Your Search Has Been Blocked As It Includes A Banned Keyword`}));
                blocked = true;
                break;
            }
        }

        if (blocked) return;

        toggleLoading(true);

        const result = mediaType === 'Videos' ? await VideoSearch(query, serverId) : await ImageSearch(query, serverId, format, mediaLocation);
        
      //  setQuery("");

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
                document.getElementById(`social-input-selector-${channelId}`).focus();
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
console.log(images)
    return (
        <AnimatePresence>
            {searchingForImage ?
            <div onClick={() => {close(false)}} className='image-search-outer-wrapper'>
                <motion.div 
                style={{left: direct_message ? '100px' : null, right: direct_message ? null : '5px', backgroundColor: secondaryColor}}
                onClick={(e) => {e.stopPropagation()}}
                key="message-image-search-container"
                className='message-image-search-container'>
                    <div 
                    style={{
                        backgroundColor: disableTransparancy ? secondaryColor : glassColor,
                        bottom: inputHeight + 10,
                        paddingLeft: hideOptions ? 0 : null,
                        width: hideOptions ? '100%' : null
                    }}
                    className='inner-message-image-search-container'>
                        {hideOptions ? null :
                        <div className='media-search-nav-container'>
                            <div className='inner-media-search-nav-wrapper'>
                                <div className='add-media-nav-button' onClick={() => {handleMediaType("Images")}} style={{color: textColor, backgroundColor: mediaType === 'Images' ? accentColor : primaryColor, opacity: mediaType === 'Images' ? 1 : null, borderRadius: mediaType === "Images" ? 8 : null}}>
                                    <AltImageIcon />
                                </div>
                                <div className='add-media-nav-button' onClick={() => {handleMediaType("Videos")}} style={{color: textColor, backgroundColor: mediaType === 'Videos' ? accentColor : primaryColor, opacity: mediaType === 'Videos' ? 1 : null, borderRadius: mediaType === "Videos" ? 8 : null}}>
                                    <EmojiIcon />
                                </div>
                                <div className='add-media-nav-button' onClick={() => {handleMediaType("Reddit")}} style={{color: textColor, backgroundColor: mediaType === 'Reddit' ? accentColor : primaryColor, opacity: mediaType === 'Reddit' ? 1 : null, borderRadius: mediaType === "Reddit" ? 8 : null}}>
                                    <RedditIcon />
                                </div>
                                <div className='add-media-nav-button' onClick={() => {handleMediaType("Saves")}} style={{color: textColor, backgroundColor: mediaType === 'Saves' ? accentColor : primaryColor, opacity: mediaType === 'Saves' ? 1 : null, borderRadius: mediaType === "Saves" ? 8 : null}}>
                                    <SavesIcon />
                                </div>
                            </div>
                            {persist ? 
                            <div style={{backgroundColor: primaryColor, marginBottom: 10}} onClick={upload_image} className='add-media-nav-button'>
                                <ImageButton />
                            </div>
                            : null}
                        </div>
                            }
                        {mediaType === 'Saves' || mediaType === 'Reddit' || mediaType === "Videos" ? null :
                        <>
                        <div 
                        className='message-image-search-input-wrapper'>
                            <input 
                            id="message-image-search-input"
                            style={{color: textColor, backgroundColor: primaryColor}}
                            maxLength={120} onKeyUp={handleEnter} onChange={handleQuery} value={query} placeholder={`Search For ${mediaType}`} />
                            <div style={{opacity: query.length > 0 ? 1 : 0.5}} className='message-image-search-button'>
                                <AltSearchButton padding={5} active={query.length === 0} action={search} margin={'0 5px 0 10px'} width={20} height={18}  borderRadius={5} />
                            </div>
                        </div>
                        <ImageSearchFilterMenu mediaLocation={mediaLocation} setMediaLocation={(v) => {setMediaLocation(v)}} format={format} updateFormat={(f) => {setFormat(f)}} />
                        </>
                        }
                        <AnimatePresence>
                        <motion.div transition={{duration: 0.1}} key={mediaType} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='message-image-search-results-container'>
                            {mediaType === 'Videos' ?
                                    <EmojiMenu action={handleEmoji} social={true} width={'100%'} height={'100%'} />
                                    : 
                            mediaType === 'Reddit' ?
                            <ViewSubReddit disableFullMode={true} expand={(i) => {handleSelectImage({preview: i, image: i})}} />
                            :
                            <ResponsiveMasonry style={{height: 'auto'}} columnsCountBreakPoints={{1020: 2, 1100: 3}}>
                                <Masonry gutter='5px'>   
                                    {mediaType === 'Saves' ?
                                    savedMedia.length === 0 ?
                                    <NoSavesIcon className={'image-search-panel-no-saves'} />
                                    :
                                    savedMedia.map(media => {
                                        return (
                                            media.type === 'image' ?
                                            <ImagePreview  action={() => {handleSelectImage({preview: media.media, type: 'image', image: media.media})}} image={media.media} />
                                            :
                                            <VideoPreview action={() => {handleSelectImage({preview: media.media, type: 'video', image: media.media})}} video={{preview: media.media}} />
                                        )
                                    })
                                    
                                    : (images?.length > 0 ? images : loading ? [] : recommendations.filter(v => v.type === 'image').slice(0, 40)).map((image, key) => {
                                        return (
                                            <ImagePreview altImage={image.preview} tag_action={handleTag} tags={image.tags} image={showFullResPreviews ? image.image : image.image.includes('gif') ? image.image : image.preview} nsfw={image.nsfw} action={(e) => {handleSelectImage({...image, preview: image.image, fallback_image: image.preview})}} />
                                        )
                                    })}
                                </Masonry>
                            </ResponsiveMasonry>}
                        </motion.div>
                        </AnimatePresence>
                    </div>
                    <Loading backgroundColor={glassColor} loading={loading || loadingNewMedia}  />
                </motion.div>
            </div>
            : null}
        </AnimatePresence>
    )
}
