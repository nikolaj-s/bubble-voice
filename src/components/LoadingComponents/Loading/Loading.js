// library's
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { LoadingError } from './LoadingError/LoadingError';
import { LoadingSpinner } from './Spinner/LoadingSpinner';
import { LoadingSuccess } from './LoadingSuccess/LoadingSuccess';

// state
import { selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./Loading.css";


export const Loading = ({backgroundColor, loading = false, error = false, overflow = true, success_size = {width: 75, height: 75}, show_success = true, zIndex = 6, forceStop}) => {

    const [localLoading, toggleLoading] = React.useState(false);

    const [success, toggleSuccess] = React.useState(false);

    const [localError, toggleError] = React.useState(false);

    const [mounted, toggleMounted] = React.useState(false)

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {

        let el = document.getElementsByClassName('content-screen-inner-container')[0]

        if (loading === true) {

            if (el && overflow) {
                el.style.overflowY = 'hidden'
                el.scrollTo(0, 0)
            }

            toggleLoading(true)
            toggleMounted(true)
        } else if (mounted === true && show_success) {

            if (el && overflow) {
                el.style.overflowY = 'auto'
            }

            toggleLoading(false);

            if (error) {
                toggleError(true)
            } else {
                toggleSuccess(true)
            }

            setTimeout(() => {
                toggleError(false)
                toggleSuccess(false)
            }, 300)
        } else {
            toggleLoading(false)
            toggleSuccess(false)
        }

        return () => {
            if (el && overflow) {
                el.style.overflowY = 'auto'
            }
            toggleMounted(false)
            toggleLoading(false)
            toggleError(false)
            toggleSuccess(false)
        }
    // eslint-disable-next-line
    }, [error, loading])

    React.useEffect(() => {

        if (loading === false && forceStop) {
            toggleMounted(false)
            toggleLoading(false)
            toggleError(false)
            toggleSuccess(false)
        }

    }, [loading])

    return (
        <>
        <AnimatePresence mode='await' >
        {localLoading === false && success === false && localError === false ?
        null :
        <motion.div 
        key={"loading-background-color"}
        
        style={{
            zIndex: zIndex,
            backgroundColor: backgroundColor
        }}
        className='loading-container' >
            
                {localLoading ? <LoadingSpinner width={success_size.width} height={success_size.height} key={"loading-spinner"} /> : null}
                {success ? <LoadingSuccess width={success_size.width} height={success_size.height} key={"loading-success"} /> : null}
                {localError ? <LoadingError width={success_size.width} height={success_size.height} key={"loading-error"} /> : null}
           
        </motion.div>
        }
        </AnimatePresence>
        </>
    )
}
