// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentStatus, selectCustomStatus, selectLoadingStatusChange, setCustomState, updateUserStatus } from '../../features/server/ChannelRoom/UserStatus/UserStatusSlice';
import { selectPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { miscSettingsChannelSpecificStateChange, selectActivityStatus } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { BoolButton } from '../buttons/BoolButton/BoolButton'
import { TextInput } from '../inputs/TextInput/TextInput';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { InputTitle } from '../titles/inputTitle/InputTitle';

// style
import "./UserStatusMenu.css";

export const UserStatusMenu = () => {

    const dispatch = useDispatch();

    const primaryColor = useSelector(selectPrimaryColor);

    const currentStatus = useSelector(selectCurrentStatus);

    const customStatus = useSelector(selectCustomStatus);

    const loadingCustomStatus = useSelector(selectLoadingStatusChange);

    const activityStatus = useSelector(selectActivityStatus);

    const handleCustomStatus = (value) => {

        if (value.length > 56) return; 

        dispatch(setCustomState(value.toLowerCase()));
    
    }

    const handleChangeStatus = (value) => {
        dispatch(updateUserStatus({value: value}));
    }

    const handleDynamicActivityStatus = () => {

        if (activityStatus) {
            dispatch(updateUserStatus({value: customStatus}))
        }

        dispatch(miscSettingsChannelSpecificStateChange('activity'));
    }

    return (
        <div 
        className='user-status-menu-container'>
            <div style={{backgroundColor: primaryColor}} className='inner-status-menu-container'>
                <BoolButton action={() => {handleChangeStatus('online')}} state={currentStatus === 'online'} name={"Online"} />
                <BoolButton action={() => {handleChangeStatus('away')}} state={currentStatus === 'away'} name={"Away"} />
                <BoolButton action={() => {handleChangeStatus('offline')}} state={currentStatus === 'offline'} name={"Offline"} />
                <TextInput inputValue={customStatus} action={handleCustomStatus} marginBottom='1%' marginTop='1%' placeholder={'Custom Status'} />
                <BoolButton action={() => {handleChangeStatus(customStatus)}} state={(currentStatus !== 'online' && currentStatus !== 'away' && currentStatus !== 'offline')} name={"Custom"} />
                <BoolButton action={handleDynamicActivityStatus} state={activityStatus} name={"Enable Dynamic Activity Status"} />
            </div>
            <div style={{backgroundColor: primaryColor}} className='inner-status-menu-spacer'></div>
            <Loading loading={loadingCustomStatus} />
        </div>
    )
}
