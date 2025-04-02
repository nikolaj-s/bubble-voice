import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import {motion} from 'framer-motion';

import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper';

import { setOverlay } from '../../../features/Overlay/overlaySlice';

import { AlertTriangle } from "lucide-react";

import styles from "./ExpandedImage.module.css"; // Assuming you use module.css
import SpinnerLoading from '../../../components/ui/Loading/Spinner/SpinnerLoading';


export const ExpandedImage = ({ close }) => {
    const dispatch = useDispatch();
    
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    
    const image = useSelector(state => state.expandedImageSlice.expandedImage);
    const data = useSelector(state => state.expandedImageSlice.expandedImageData);

    const handleClose = () => {
        if (data) {
            dispatch(setOverlay("search"));
        } else {
            close();
        }
    };

    return (
        <FullScreenWrapper onClose={handleClose}>
            <div
                data-context={data ? JSON.stringify({ ...data, type: "imageSearchResult" }) : JSON.stringify({src: image, type: 'image'})}
                className={styles.container}
                onClick={handleClose}
            >   
                {loading && (<SpinnerLoading />)}
                {error ? (
                    // 🛑 Error State: Show Lucide error icon
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.errorContainer}
                    >
                        <AlertTriangle size={48} color="var(--error-color)" />
                        <p className={styles.errorText}>Failed to load image</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        className={styles.imageWrapper}
                        initial={{ opacity: 0 }}
                        animate={loading 
                            ? { opacity: 0.5, scale: [1, 1.02, 1],} // Breathing effect
                            : { opacity: 1, scale: 1 } // Fade in when loaded
                        }
                        transition={loading 
                            ? { repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatType: "mirror" }
                            : { duration: 0.5, ease: "easeOut" }
                        }
                    >
                        <img
                            src={image}
                            alt="expanded-image"
                            className={styles.image}
                            onLoad={() => setLoading(false)}
                            onError={() => { setLoading(false); setError(true); }}
                        />
                    </motion.div>
                )}
            </div>
        </FullScreenWrapper>
    );
};
