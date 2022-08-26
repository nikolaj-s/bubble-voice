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


export const Loading = ({loading = false, error = false, overflow = true}) => {

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
        } else if (mounted === true) {

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

    return (
        <>
        <AnimatePresence exitBeforeEnter={true} >
        {localLoading === false && success === false && localError === false ?
        null :
        <motion.div 
        key={"loading-background-color"}
        initial={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0] + ', 0)'}`}}
        animate={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0] + ', 0.7)'}`}}
        exit={{backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0] + ', 0)'}`}}
        style={{
            backgroundColor: `rgba(${secondaryColor.split('rgb(')[1].split(')')[0] + ', 0.7)'}`
        }}
        className='loading-container' >
            
                {localLoading ? <LoadingSpinner key={"loading-spinner"} /> : null}
                {success ? <LoadingSuccess key={"loading-success"} /> : null}
                {localError ? <LoadingError key={"loading-error"} /> : null}
           
        </motion.div>
        }
        </AnimatePresence>
        </>
    )
}
