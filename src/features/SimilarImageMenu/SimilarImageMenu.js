import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSimilarImagesMenu, selectLoadingSimilarImages, selectSimilarImageMenuPosX, selectSimilarImageMenuPosY, selectSimilarImages, selectSimilarImagesMenuOpen } from './SimilarImageSlice'
import { selectPrimaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import "./SimilarImageMenu.css";
import { motion } from 'framer-motion';
import { ImagePreview } from '../../components/ImagePreview/ImagePreview';
import { Loading } from '../../components/LoadingComponents/Loading/Loading';
import { setExpandedContent, setMetaData } from '../ExpandContent/ExpandContentSlice';

export const SimilarImageMenu = () => {

    const dispatch = useDispatch();

    const [cordinates, setCordinates] = React.useState({x: 0, y: 0});

    const posX = useSelector(selectSimilarImageMenuPosX);

    const posY = useSelector(selectSimilarImageMenuPosY);

    const menuOpen = useSelector(selectSimilarImagesMenuOpen);

    const images = useSelector(selectSimilarImages);

    const loading = useSelector(selectLoadingSimilarImages);

    const primaryColor = useSelector(selectPrimaryColor);

    const textColor = useSelector(selectTextColor);

    const handleCloseSimilarImagesMenu = () => {
        dispatch(closeSimilarImagesMenu());
    }

    const expand = (i) => {
        dispatch(setExpandedContent(i))
    }

    const sendMetaData = (data = {}) => {
        dispatch(setMetaData(data))
    }

    React.useEffect(() => {

        const windowHeight = window.innerHeight;

        const windowWidth = window.innerWidth;

        let xCord = 0;

        let yCord = 0;

        if (windowWidth - posX < 460) {
            xCord = windowWidth - 475;
        } else {
            xCord = posX;
        }

        if (windowHeight - posY < 460) {
            yCord = windowHeight - 475;
        } else {
            yCord = posY;
        }

        setCordinates({x: xCord, y: yCord});

    }, [posX, posY])

    return (
        <>
        {menuOpen ?
            <div 
        onClick={handleCloseSimilarImagesMenu}
        className='similar-image-menu-wrapper'>
            <motion.div 
            initial={{scale: 0}}
            animate={{scale: 1}}
            onClick={(e) => {e.stopPropagation()}}
            style={{
                backgroundColor: primaryColor,
                top: cordinates.y,
                left: cordinates.x,
                border: `solid 5px ${primaryColor}`
            }}
            className='similar-image-container'>
                <h3 style={{color: textColor}}>Similar Image Results:</h3>
                <ResponsiveMasonry style={{height: 'auto'}} columnsCountBreakPoints={{0: 2}}>
                    <Masonry gutter='5px'> 
                        {images.map(image => {
                            return (
                               <ImagePreview action={() => {sendMetaData(image)}} expand={expand} key={image.image} altImage={image.preview} image={image.image} /> 
                            )
                        })}
                    </Masonry>
                </ResponsiveMasonry>
                <Loading loading={loading} />
            </motion.div>
        </div>
        
        : null}
        </>
    )
}
