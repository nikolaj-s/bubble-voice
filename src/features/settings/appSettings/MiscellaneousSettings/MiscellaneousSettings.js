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
import { DropDownList } from '../../../../components/DropDownList/DropDownList';
import { SettingsSpacer } from '../../../../components/Spacers/SettingsSpacer/SettingsSpacer'

// state
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { miscSettingsChannelSpecificStateChange, miscSettingsClearError, miscSettingsClearLocalData, miscSettingsToggleHardwareAcceleration, selectActivityStatus, selectAutoPlayNativeVideos, selectDefaultServer, selectDisableChannelIcons, selectDisableMediaWidget, selectDisableTransparancyEffects, selectHardwareAcceleration, selectHideUserStatus, selectMiscSettingsDisableGifProfiles, selectMiscSettingsDisableMessagePopUp, selectMiscSettingsError, selectMiscSettingsErrorMessage, selectMiscSettingsHideChannelBackground, selectMiscSettingsHideNonVideoParticapents, selectMiscSettingsLoading, selectMuteSocialVideos, selectPopOutUserStreams, selectRestartNotice, selectShowFullResPreviews, selectSystemNotifcations, setDefaultServer } from './MiscellaneousSettingsSlice';
import { selectServerList } from '../../../sideBar/sideBarSlice';

const Settings = () => {

    const dispatch = useDispatch();

    const [serversToSelectFrom, setServersToSelectFrom] = React.useState([])

    const loading = useSelector(selectMiscSettingsLoading);

    const hardwareAcceleration = useSelector(selectHardwareAcceleration);

    const error = useSelector(selectMiscSettingsError);

    const errorMessage = useSelector(selectMiscSettingsErrorMessage);

    const restartNotice = useSelector(selectRestartNotice);

    const disableGifProfiles = useSelector(selectMiscSettingsDisableGifProfiles);

    const disableMessagePopUp = useSelector(selectMiscSettingsDisableMessagePopUp);

    const hideChannelBackground = useSelector(selectMiscSettingsHideChannelBackground);

    const hideNonVideoParticapents = useSelector(selectMiscSettingsHideNonVideoParticapents);

    const hideUserStatusBar = useSelector(selectHideUserStatus);

    const defaultServer = useSelector(selectDefaultServer);

    const servers = useSelector(selectServerList);

    const systemNotifcations = useSelector(selectSystemNotifcations);

    const autoPlaySocialVideos = useSelector(selectAutoPlayNativeVideos);

    const muteSocialVideos = useSelector(selectMuteSocialVideos);

    const activityStatus = useSelector(selectActivityStatus);

    const disableMediaWidget = useSelector(selectDisableMediaWidget);

    const disableTransparancyEffects = useSelector(selectDisableTransparancyEffects);

    const showFullResPreviews = useSelector(selectShowFullResPreviews);

    const disableChannelIcons = useSelector(selectDisableChannelIcons);

    const popOutUserStreams = useSelector(selectPopOutUserStreams);

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

    const handleSetDefaultServer = (state, value) => {
        dispatch(setDefaultServer(value));
    }

    return (
        <>
        <div className='settings-wrapper'>
            <SettingsHeader title={"Default Server"} />
            <InputTitle title={"Select Server To Auto Join On App Launch"} />
            <DropDownList action={handleSetDefaultServer} selectedItem={defaultServer.label} list={serversToSelectFrom} />
            <SettingsHeader title={"System Notifcations"} />
            <InputTitle title={"Disable System Notifications"} />
            <ToggleButton state={systemNotifcations} action={() => {handleChannelSpecificStateChange('disableSystemNotifications')}} />
            <SettingsHeader title={"Activity"} />
            <InputTitle title={"Display Current Activity As Custom Status Message"} />
            <ToggleButton state={activityStatus} action={() => {handleChannelSpecificStateChange('activity')}} />
            <SettingsHeader title={"Channel Specific"} />
            <InputTitle title={"Disable Message Pop Up's"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("disableMessagePopUp")}} state={disableMessagePopUp} />
            <InputTitle title={"Hide Channel Backgrounds"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideChannelBackground")}} state={hideChannelBackground} />
            <InputTitle title={"Hide Non Video Particapents"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("hideNonVideoParticapents")}} state={hideNonVideoParticapents} />
            <InputTitle title={"Hide User Status Bar When In A Channel"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange('hideUserStatus')}} state={hideUserStatusBar} />
            <InputTitle title={"Disable Popping Out User Streams On Tab Change"} /> 
            <ToggleButton state={popOutUserStreams} action={() => {handleChannelSpecificStateChange("popOutUserStreams")}} />
            <InputTitle title={'Disable Channel Icons'} />
            <ToggleButton action={() => {handleChannelSpecificStateChange('disableChannelIcons')}} state={disableChannelIcons} />
            <InputTitle title={"Disable Gif Profile Pictures / Banners"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("disableGifProfiles")}} state={disableGifProfiles} />
            <SettingsHeader title={"Social"} />
            <InputTitle title={"Toggle Auto Play Native Videos"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange('autoPlayNativeVideos')}} state={autoPlaySocialVideos}  />
            <InputTitle title={"Mute Videos By Default Within Social"} />
            <ToggleButton action={() => {handleChannelSpecificStateChange("muteSocialVideos")}} state={muteSocialVideos}  /> 
            <SettingsHeader title={"App Specific"} />
            <InputTitle title={"Disable Transparency Effects"} />
            <ToggleButton state={disableTransparancyEffects} action={() => {handleChannelSpecificStateChange('disableTransparancyEffects')}} />
            <InputTitle title={"Disable Hardware Acceleration"} />
            <ToggleButton action={handleToggleHardwareAcceleration} state={hardwareAcceleration} />
            <SettingsHeader title={"Bandwith"} />
            <InputTitle title={"Disable Media Widget"} />
            <ToggleButton state={disableMediaWidget} action={() => {handleChannelSpecificStateChange('disableMediaWidget')}} />
            <InputTitle title={"Show Full Resolution Previews of Images"} />
            <ToggleButton state={showFullResPreviews} action={() => {handleChannelSpecificStateChange('showFullResPreviews')}} />
            <InputTitle title={"Clear Local Data"} />
            <TextButton action={handleClearLocalData} name={"Clear Data"} />
            <SettingsSpacer />
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