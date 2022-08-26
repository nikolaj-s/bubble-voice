// library's
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import { LoadingBar } from '../../components/LoadingComponents/LoadingBar/LoadingBar';
import { Error } from '../../components/Error/Error';

// state
import { retryLoadingApplication, selectLoadingError, selectLoadingErrorMessage, selectLoadingPercent, selectLoadingState } from './initializingAppScreenSlice';
import { selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./InitializingAppScreen.css";


export const InitializingAppScreen = () => {

    const dispatch = useDispatch();

    const secondaryColor = useSelector(selectSecondaryColor);

    const loadingState = useSelector(selectLoadingState);

    const loadingPercent = useSelector(selectLoadingPercent);

    const error = useSelector(selectLoadingError);

    const errorMessage = useSelector(selectLoadingErrorMessage);

    const handleRetry = () => {
        dispatch(retryLoadingApplication());
    }

    return (
        <div className='loading-app-outer-container'>
            <div
            style={{
                backgroundColor: secondaryColor
            }}
            className='loading-app-inner-container'>
                <div className='content-wrapper'>
                    <h1>{loadingState}</h1>
                    <h1>{loadingPercent} %</h1>
                    <LoadingBar percent={loadingPercent} />
                </div>
                <AnimatePresence>
                    {error ? <Error errorMessage={errorMessage} buttonLabel={"Retry"} action={handleRetry}  /> : null}
                </AnimatePresence>
            </div>
        </div>
    )
}
