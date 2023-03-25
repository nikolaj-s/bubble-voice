// library's
import React from 'react'
import { motion } from 'framer-motion'

// state
import { useDispatch, useSelector } from 'react-redux';
import { closeReleaseNotesErrorMessage, fetchReleaseNotes, selectLoadingReleaseNotes, selectReleaseNotes, selectReleaseNotesError, selectReleaseNotesErrorMessage } from '../../../app/appSlice';

// components
import { Loading } from '../../../components/LoadingComponents/Loading/Loading';
import { Error } from '../../../components/Error/Error';
import { ReleaseNote } from './ReleaseNote/ReleaseNote';

// style
import "./ReleaseNotes.css";
import { selectGlassColor, selectGlassState, selectSecondaryColor } from '../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ReleaseNotes = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectLoadingReleaseNotes);

    const releaseNotes = useSelector(selectReleaseNotes);

    const error = useSelector(selectReleaseNotesError);

    const errorMessage = useSelector(selectReleaseNotesErrorMessage);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glass = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const handleCloseErrorMessage = () => {
        dispatch(closeReleaseNotesErrorMessage());
    }

    React.useEffect(() => {

        if (loading && releaseNotes.length === 0) {
            dispatch(fetchReleaseNotes());
        }

    // eslint-disable-next-line
    }, [loading, releaseNotes])

    return (
        <motion.div
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0
        }}
        key={'release-notes-wrapper'}
        className='release-notes-wrapper'

        style={{backgroundColor: glass ? glassColor : secondaryColor}}
        >
            {!releaseNotes || releaseNotes.length === 0 ? null :
            releaseNotes.map((note, key) => {
                return <ReleaseNote key={key} data={note} />
            })}
            {error ? <Error action={handleCloseErrorMessage} errorMessage={errorMessage} /> : null}
            <Loading loading={loading} />
        </motion.div>
    )
}
