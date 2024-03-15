

import React from 'react'
import { useRoutes } from 'react-router'
import { SettingsHeader } from '../../../../components/titles/SettingsHeader/SettingsHeader'
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle'
import { ToggleButton } from '../../../../components/buttons/ToggleButton/ToggleButton'
import { useDispatch, useSelector } from 'react-redux'
import { miscSettingsChannelSpecificStateChange, selectDisableMediaWidgetStatusUpdates, selectMuteSocial, selectSystemNotifcations } from '../MiscellaneousSettings/MiscellaneousSettingsSlice'

const Settings = () => {

    const dispatch = useDispatch();

    const systemNotifcations = useSelector(selectSystemNotifcations);

    const muteSocial = useSelector(selectMuteSocial);

    const disableMediaWidgetStatus = useSelector(selectDisableMediaWidgetStatusUpdates);

    const handleChannelSpecificStateChange = (state) => {
        dispatch(miscSettingsChannelSpecificStateChange(state));
        
    }

    return (
        <div className='settings-wrapper'>
            <SettingsHeader title={"Notifications"} />
            <InputTitle title={"Disable Desktop Pop Up Notifications"} />
            <ToggleButton state={systemNotifcations} action={() => {handleChannelSpecificStateChange('disableSystemNotifications')}} />
            <InputTitle title={"Mute Social Room Overlay Notifications"} />
            <ToggleButton state={muteSocial} action={() => {handleChannelSpecificStateChange('muteSocial')}} />
            <InputTitle title={"Disable Media Widget Status Updates"} />
            <ToggleButton state={disableMediaWidgetStatus} action={() => {handleChannelSpecificStateChange("disableMediaWidgetStatusUpdates")}} />
        </div>
    )
}

export const NotificationSettings = () => useRoutes([
    {path: "notification-settings", element: <Settings />}
])