// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router';

// components
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { Loading } from '../../../../components/LoadingComponents/Loading/Loading';
import { Error } from '../../../../components/Error/Error';
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton';
import { AltError } from '../../../../components/AltError/AltError';
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader'

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { miscSettingsChannelSpecificStateChange, miscSettingsClearError, miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, selectHardwareAcceleration, selectMiscSettingsDisableGifProfiles, selectMiscSettingsDisableMessagePopUp, selectMiscSettingsError, selectMiscSettingsErrorMessage, selectMiscSettingsHideChannelBackground, selectMiscSettingsHideNonVideoParticapents, selectMiscSettingsLoading, selectRestartNotice } from './MiscellaneousSettingsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const loading = useSelector(selectMiscSettingsLoading);

    const hardwareAcceleration = useSelector(selectHardwareAcceleration);

    const error = useSelector(selectMiscSettingsError);

    const errorMessage = useSelector(selectMiscSettingsErrorMessage);

    const restartNotice = useSelector(selectRestartNotice);

    const disableGifProfiles = useSelector(selectMiscSettingsDisableGifProfiles);

    const disableMessagePopUp = useSelector(selectMiscSettingsDisableMessagePopUp);

    const hideChannelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Miscellaneous Settings"))
        
    // eslint-disable-next-line
    }, [])

    const handleClearLocalData = () => {

        dispatch(miscSettingsClearLocalData());
        
    }

    const handleToggleHardwareAcceleration = () => {

        dispatch(miscSettingsToggleHardwareAcceleration());
        
    }

    const closeErrorMessage = () => {
        
        dispatch(miscSettingsClearError());
    
    }

    const handleChannelSpecificStateChange = (state) => {
        dispatch(miscSettingsChannelSpecificStateChange(state));
    }

    return (
        <>
        <div className='settings-wrapper'>
            <SettingsHeader title={"Channel Specific"} />
            <InputTitle title={"Disable Message Pop Up's"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("disableMessagePopUp")}} state={disableMessagePopUp} />
            <InputTitle title={"Hide Channel Backgrounds"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideChannelBackground")}} state={hideChannelBackground} />
            <InputTitle title={"Hide Non Video Particapents"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideNonVideoParticapents")}} state={hideNonVideoParticapents} />
            <InputTitle title={"Disable Gif Profile Pictures / Banners"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("disableGifProfiles")}} state={disableGifProfiles} />
            <SettingsHeader title={"App Specific"} />
            <InputTitle title={"Disable Hardware Acceleration"} />
            <ToggleButton action={handleToggleHardwareAcceleration} state={hardwareAcceleration} />
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={handleClearLocalData} name={"Clear Data"} />
            <AltError marginTop={'2%'} errorMessage={"Toggling Harware Acceleration Requires An App Restart"} error={restartNotice} />
            <Loading loading={loading} />
        </div>
        {error ? <Error action={closeErrorMessage} errorMessage={errorMessage} /> : null}
        </>
    )
}

export const MiscellaneousSettings = () => useRoutes([
    { path: 'local-data', element: <Settings /> }
])