import React from 'react'

import { useSelector } from 'react-redux'

import SpinnerLoading from '../../../ui/Loading/Spinner/SpinnerLoading'

import ErrorPopup from '../../../Error/ErrorPopup/ErrorPopup'

import { AnimatePresence } from 'framer-motion'

export const LoadingErrorFormWrapper = ({children, sliceName = ""}) => {

    const [displayError, setDisplayError] = React.useState(null);

    const {loading, error} = useSelector(state => state[sliceName])

    React.useEffect(() => {

        if (error) {

            setDisplayError(error)
        }

    }, [error])

    try {

        return (
            <>
            {children}
            <AnimatePresence>
            {loading ? <SpinnerLoading key={'loading-spinner'} /> : null}
            {displayError ? 
            <ErrorPopup 
            key={'error-pop-up'}
            errorMessage={displayError}
            onClose={() => setDisplayError(null)}
            />: null}
            </AnimatePresence>
            </>
        )

    } catch (error) {
        console.log(error);
        return {children}
    }
    
}
