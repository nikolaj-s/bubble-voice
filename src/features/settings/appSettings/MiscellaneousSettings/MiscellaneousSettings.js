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
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer'

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { miscSettingsChannelSpecificStateChange, miscSettingsClearError, miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, selectActivityStatus, selectAutoPlayNativeVideos, selectDefaultServer, selectDisableChannelIcons, selectDisableMediaWidget, selectDisableTransparancyEffects, selectHardwareAcceleration, selectHideCustomChannelIcons, selectHideUserStatus, selectMiscSettingsDisableGifProfiles, selectMiscSettingsDisableMessagePopUp, selectMiscSettingsError, selectMiscSettingsErrorMessage, selectMiscSettingsHideChannelBackground, selectMiscSettingsHideNonVideoParticapents, selectMiscSettingsLoading, selectMuteSocialVideos, selectPopOutUserStreams, selectRestartNotice, selectShowFullResPreviews, selectSystemNotifcations, setDefaultServer } from './MiscellaneousSettingsSlice';
import { selectServerList } from '../../../sideBar/sideBarSlice';
import { clearSaves } from '../../../SavedMedia/SavedMediaSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const [serversToSelectFrom, setServersToSelectFrom] = React.useState([])

    const loading = useSelector(selectMiscSettingsLoading);

    const hardwareAcceleration = useSelector(selectHardwareAcceleration);

    const error = useSelector(selectMiscSettingsError);

    const errorMessage = useSelector(selectMiscSettingsErrorMessage);

    const restartNotice = useSelector(selectRestartNotice);
    
    const hideChannelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    const hideUserStatusBar = useSelector(selectHideUserStatus);

    const servers = useSelector(selectServerList);

    const systemNotifcations = useSelector(selectSystemNotifcations);

    const activityStatus = useSelector(selectActivityStatus);

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const showFullResPreviews = useSelector(selectShowFullResPreviews);

    const disableChannelIcons = useSelector(selectDisableChannelIcons);

    React.useEffect(() => {

        dispatch(setHeaderTitle("Miscellaneous Settings"));

        setServersToSelectFrom([{label: 'Default', id: ""}, ...servers.map(s => ({label: s.server_name, id: s.server_id}))])
        
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
            <SettingsHeader title={"System Notifcations"} />
            <InputTitle title={"Disable System Notifications"} />
            <ToggleButton state={systemNotifcations} action={() => {handleChannelSpecificStateChange('disableSystemNotifications')}} />
            <SettingsHeader title={"Activity"} />
            <InputTitle title={"Display Current Activity As Custom Status Message"} />
            <ToggleButton state={activityStatus} action={() => {handleChannelSpecificStateChange('activity')}} />
            <SettingsHeader title={"Channel Specific"} />
            
            <InputTitle title={"Hide Channel Backgrounds"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideChannelBackground")}} state={hideChannelBackground} />
            <InputTitle title={"Hide Non Video Particapents"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideNonVideoParticapents")}} state={hideNonVideoParticapents} />
            <InputTitle title={"Hide User Status Bar When In A Channel"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange('hideUserStatus')}} state={hideUserStatusBar} />
            <InputTitle title={'Hide Custom Channel Icons'} />
            <ToggleButton action={() => {handleChannelSpecificStateChange('disableChannelIcons')}} state={disableChannelIcons} />
            <SettingsHeader title={"App Specific"} />
            <InputTitle title={"Disable Transparency Effects"} />
            <ToggleButton state={disableTransparancyEffects} action={() => {handleChannelSpecificStateChange('disableTransparancyEffects')}} />
            <InputTitle title={"Disable Hardware Acceleration"} />
            <ToggleButton action={handleToggleHardwareAcceleration} state={hardwareAcceleration} />
            <AltError marginTop={'2%'} errorMessage={"Toggling Harware Acceleration Requires An App Restart"} error={restartNotice} />
            <Loading loading={loading} />
            <SettingsHeader title={"Bandwith"} />
            <InputTitle title={"Disable Media Widget"} />
            <ToggleButton state={disableMediaWidget} action={() => {handleChannelSpecificStateChange('disableMediaWidget')}} />
            <InputTitle title={"Show Full Resolution Previews of Images"} />
            <ToggleButton state={showFullResPreviews} action={() => {handleChannelSpecificStateChange('showFullResPreviews')}} />
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={handleClearLocalData} name={"Clear Data"} />
            <InputTitle title={"Clear Saves"} />
            <TextButton action={() => {dispatch(clearSaves())}} name={"Clear Saved Media"} />
            <SettingsSpacer />
           
        </div>
        {error ? <Error action={closeErrorMessage} errorMessage={errorMessage} /> : null}
        </>
    )
}

export const MiscellaneousSettings = () => useRoutes([
    { path: 'local-data', element: <Settings /> }
])