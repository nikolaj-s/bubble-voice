// library's
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

// components
import { Loading } from '../../../LoadingComponents/Loading/Loading';
import { Image } from '../../../Image/Image';
import { AltSearchButton } from '../../../buttons/AltSearchButton/AltSearchButton';
import { InputTitle } from '../../../titles/inputTitle/InputTitle';

// state
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectPopularSearches, throwServerError } from '../../../../features/server/ServerSlice';

// util
import { ImageSearch } from '../../../../util/ImageSearch';

// style
import "./ImageSearchPanel.css";


export const ImageSearchPanel = ({searchingForImage, selectImage, serverId}) => {

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const textColor = useSelector(selectTextColor);

    const recommendations = useSelector(selectPopularSearches);

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [images, setImages] = React.useState([]);

    const [query, setQuery] = React.useState("");

    const handleQuery = (e) => {
        setQuery(e.target.value);
    }

    const search = async () => {

        if (query.length === 0) return;

        toggleLoading(true);

        const result = await ImageSearch(query, serverId);

        setQuery("");

        toggleLoading(false);

        if (result.error) return dispatch(throwServerError({errorMessage: result.errorMessage}));

        setImages(result.images);

    }

    const handleEnter = (e) => {

        if (e.keyCode === 13) return search();
    
    }

    const handleSelectImage = (image) => {
        selectImage(image)
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

    return (
        <AnimatePresence exitBeforeEnter>
            {searchingForImage ?
            <motion.div 
            initial={{maxHeight: '0%', opacity: 0}}
            animate={{maxHeight: '85%', opacity: 1}}
            exit={{maxHeight: '0%', opacity: 0}}
            transition={{duration: 0.1}}
            key="message-image-search-container"
            style={{
                backgroundColor: primaryColor
            }}
            className='message-image-search-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor
                }}
                className='inner-message-image-search-container'>
                    <div 
                    style={{backgroundColor: primaryColor}}
                    className='message-image-search-input-wrapper'>
                        <input 
                        id="message-image-search-input"
                        style={{color: textColor}}
                        maxLength={120} onKeyUp={handleEnter} onChange={handleQuery} value={query} placeholder={"Search For Images"} />
                        <AltSearchButton action={search} margin={'0 0 0 10px'} width={20} height={20} invert={true} borderRadius={10} />
                    </div>
                    {images.length === 0 && recommendations.length > 1 ? <InputTitle title={"Results Based On Previous Searches"} /> : null}
                    <div className='message-image-search-results-container'>
                        
                        {(images.length > 0 ? images : recommendations).map((image, key) => {
                            return (
                                <div
                                onClick={() => {handleSelectImage(image)}}
                                key={key} className='message-image-result-container'>
                                    <Image cursor='pointer' image={image} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Loading loading={loading} />
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
