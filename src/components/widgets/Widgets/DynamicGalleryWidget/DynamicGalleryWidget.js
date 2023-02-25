// library's
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { wrap } from 'popmotion'

// state
import { selectPrimaryColor, selectSecondaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// components
import { Image } from '../../../Image/Image'

// style
import "./DynamicGalleryWidget.css";
import { GalleryNavigation } from './GalleryNavigation/GalleryNavigation';
import { setExpandedContent } from '../../../../features/ExpandContent/ExpandContentSlice';
import { GalleryTitle } from './GalleryTitle/GalleryTitle';
import { selectDisableTransparancyEffects } from '../../../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

export const DynamicGalleryWidget = ({widget, editing}) => {

    const dispatch = useDispatch();

    const [[page, direction], setPage] = React.useState([0, 0]);

    const images = widget.content.text;

    const color = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const tran = useSelector(selectDisableTransparancyEffects);

    const variants = {
        enter: (direction) => {
          return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1
        },
        exit: (direction) => {
          return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
          };
        }
    };

    const swipeConfidenceThreshold = 10000;

    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const imageIndex = wrap(0, images.length, page)

    const paginate = (newDirection) => {    
        setPage([page + newDirection, newDirection]);
    };
    
    const handleExpansion = () => {
      dispatch(setExpandedContent(images[imageIndex]));
    }

    return (
        <div style={{backgroundColor: tran ? secondaryColor : `rgba(${secondaryColor.split('rgb(')[1].split(')')[0]}, 0.8)`}}
        className='dynamic-gallery-widget'>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                className='image-gallery-animation-wrapper'
                key={page}
                onClick={handleExpansion}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    opacity: { duration: 0.1 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                    }
                }}
                >
                    <Image key={page} image={images[imageIndex]} objectFit='contain' />
                </motion.div>
            </AnimatePresence>
            <div style={{backgroundColor: color}} className="next" onClick={() => paginate(-1)}>
            </div>
            <div style={{backgroundColor: color}} className="prev" onClick={() => paginate(1)}>
            </div>
            <GalleryNavigation images={images} currentIndex={imageIndex} />
            <GalleryTitle title={widget?.content?.query} />
        </div>
    )
}
