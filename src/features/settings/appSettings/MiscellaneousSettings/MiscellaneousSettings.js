// library's
import React from 'react'
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { Error } from '../../../../components/Error/Error';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { AltError } from '../../../../components/AltError/AltError';

// state
import { clearLocalData, fetchHardWareAcceleration, saveHardwareAcceleration } from '../../../../util/LocalData';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const [loading, toggleLoading] = React.useState(false);

    const [hardwareAcceleration, toggleHardwareAcceleration] = React.useState(false);

    const [error, setError] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState("");

    const [restartNotice, setRestartNotice] = React.useState(false);

    const handleSavedHardwarePref = async () => {

        const data = await fetchHardWareAcceleration();

        if (data.error) return;

        toggleHardwareAcceleration(data.toggled);
    
    }

    React.useEffect(() => {

        dispatch(setHeaderTitle("Miscellaneous Settings"))

        handleSavedHardwarePref();

    }, [])

    const handleClearLocalData = () => {

        toggleLoading(true);

        clearLocalData();

        setTimeout(() => {
            toggleLoading(false);
        }, 200)
    }

    const handleToggleHardwareAcceleration = () => {

        toggleHardwareAcceleration(!hardwareAcceleration);

        setRestartNotice(true);

        saveHardwareAcceleration(!hardwareAcceleration);
        
    }

    const closeErrorMessage = () => {
        
        setError(false);
        
        setErrorMessage("");
    
    }

    return (
        <>
        <div className='settings-wrapper'>
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={handleClearLocalData} name={"Clear Data"} />
            <InputTitle title={"Disable Hardware Acceleration"} />
            <ToggleButton action={handleToggleHardwareAcceleration} state={hardwareAcceleration} />
            <AltError marginTop={'2%'} errorMessage={"Toggling Harware Acceleration Requires An App Restart"} error={restartNotice} />
            <InputTitle title={"Disable Gif Profile Pictures / Banners"} />
            <ToggleButton />
            
            <Loading loading={loading} />
        </div>
        {error ? <Error action={closeErrorMessage} errorMessage={errorMessage} /> : null}
        </>
    )
}

export const MiscellaneousSettings = () => useRoutes([
    { path: 'local-data', element: <Settings /> }
])