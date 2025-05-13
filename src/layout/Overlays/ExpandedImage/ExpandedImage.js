import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import {motion} from 'framer-motion';

import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper';

import { AlertTriangle } from "lucide-react";

import styles from "./ExpandedImage.module.css"; // Assuming you use module.css
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading';
import { SwipeGestureWrapper } from '../../../components/ui/Gestures/SwipeGestureWrapper';
import { LongPressGestureWrapper } from '../../../components/ui/Gestures/LongPressGestureWrapper';
import { triggerContext } from '../../../lib/services/helperFunctions';
import { enqueueMediaDeletion } from '../../../features/MediaDeletion/mediaDeletionSlice';
import ZoomableImage from '../../../components/ui/ZoomableImage/ZoomableImage';


export const ExpandedImage = ({ close = () => {} }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
  
    const image = useSelector(state => state.expandedImageSlice.expandedImage);
    const data = useSelector(state => state.expandedImageSlice.expandedImageData);
  
    const handleClose = () => close();
  
    const showFallback = error || loading;

    const handleError = () => {
      if (data?._id) {
        dispatch(enqueueMediaDeletion(data?._id))
      }
    }
   
    return (
      <FullScreenWrapper onClose={handleClose} backgroundColor="none" width="auto" maxContentWidth={'100%'}>
        <SwipeGestureWrapper onSwipeUp={close} onSwipeDown={handleClose}>
          <LongPressGestureWrapper onTouchContext={(e) => triggerContext(e, 'expanded-image')}>
            <div
              id="expanded-image"
              data-context={data ? JSON.stringify({ ...data, type: 'imageSearchResult' }) : JSON.stringify({ src: image, type: 'image' })}
              className={styles.container}
              onClick={handleClose}
            >
              {loading && <SpinnerLoading />}
  
              <motion.div
                className={styles.imageWrapper}
                initial={{ opacity: 0 }}
                animate={
                  loading
                    ? { opacity: 0.5, scale: [1, 1.02, 1] }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  loading
                    ? { repeat: Infinity, duration: 1.8, ease: 'easeInOut', repeatType: 'mirror' }
                    : { duration: 0.5, ease: 'easeOut' }
                }
              >
                {showFallback && data?.thumbnail && (
                  <img
                    src={data.thumbnail}
                    alt="thumbnail-fallback"
                    className={styles.image}
                    draggable={false}
                  />
                )}
                {!error && 
                <ZoomableImage 
                src={image}
                onLoad={() => {setLoading(false)}}
                onError={() => {
                  setLoading(false);
                  setError(true)
                  handleError()
                }}
                />}
              </motion.div>
              {error && !data?.thumbnail && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={styles.errorContainer}
                >
                  <AlertTriangle size={48} color="var(--error-color)" />
                  <p className={styles.errorText}>Failed to load image</p>
                </motion.div>
              )}
            </div>
          </LongPressGestureWrapper>
        </SwipeGestureWrapper>
      </FullScreenWrapper>
    );
  };
  
