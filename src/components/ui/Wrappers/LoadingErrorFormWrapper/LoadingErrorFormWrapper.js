import React from 'react'
import { useSelector } from 'react-redux'
import SpinnerLoading from '../../../Loading/Spinner/SpinnerLoading'
import TextLabelError from '../../../Error/TextLabelError/TextLabelError'

export const LoadingErrorFormWrapper = ({children, sliceName = ""}) => {

    const {loading, error} = useSelector(state => state[sliceName])

    try {

        return (
            <>
            {children}
            {loading ? <SpinnerLoading /> : null}
            {error ? <TextLabelError label='Error' error={error} /> : null}
            </>
        )

    } catch (error) {
        console.log(error);
        return {children}
    }
    
}
