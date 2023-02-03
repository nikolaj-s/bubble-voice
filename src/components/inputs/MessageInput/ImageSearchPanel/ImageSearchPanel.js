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
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';


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

        if (result.error) {

            toggleLoading(false);

            return dispatch(throwServerError({errorMessage: result.errorMessage}));
        
        }
        
        setImages([]);

        setTimeout(() => {
            
            toggleLoading(false);

            setImages(result.images);

        }, 100)
        
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.1}}
            key="message-image-search-container"
            style={{borderTop: `solid 3px ${primaryColor}`}}
            className='message-image-search-container'>
                <div 
                style={{
                    backgroundColor: secondaryColor
                }}
                className='inner-message-image-search-container'>
                    <div 
                    style={{backgroundColor: primaryColor, borderBottom: `solid 5px ${secondaryColor}`}}
                    className='message-image-search-input-wrapper'>
                        <input 
                        id="message-image-search-input"
                        style={{color: textColor}}
                        maxLength={120} onKeyUp={handleEnter} onChange={handleQuery} value={query} placeholder={"Search For Images"} />
                        <AltSearchButton active={query.length === 0} action={search} margin={'0 0 0 10px'} width={20} height={20} invert={true}  borderRadius={10} />
                    </div>
                    {images.length === 0 && recommendations.length > 1 ? <InputTitle title={"Results Based On Previous Searches"} /> : null}
                    <div className='message-image-search-results-container'>
                    <ResponsiveMasonry columnsCountBreakPoints={{800: 1, 1000: 2, 1500: 3, 1900: 4, 2500: 5}}>
                        <Masonry gutter='5px'>   
                            {(images.length > 0 ? images : loading ? [] : recommendations.slice(0, 15)).map((image, key) => {
                                return (
                                    <div onClick={() => {handleSelectImage(image)}} key={image + key} className='image-search-result-container'>
                                        <Image hideOnError={true} cursor='pointer' image={image} />
                                    </div> 
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
