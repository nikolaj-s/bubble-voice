// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentStatus, selectCustomStatus, selectLoadingStatusChange, setCustomState, updateUserStatus } from '../../features/server/ChannelRoom/UserStatus/UserStatusSlice';
import { selectGlassColor, selectPrimaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { miscSettingsChannelSpecificStateChange, selectActivityStatus } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { BoolButton } from '../buttons/BoolButton/BoolButton'
import { TextInput } from '../inputs/TextInput/TextInput';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { InputTitle } from '../titles/inputTitle/InputTitle';
import { motion } from 'framer-motion';
// style
import "./UserStatusMenu.css";
import { ApplyCancelButton } from '../buttons/ApplyCancelButton/ApplyCancelButton';

export const UserStatusMenu = ({close = () => {}}) => {

    const dispatch = useDispatch();

    const [value, setValue] = React.useState("");

    const primaryColor = useSelector(selectPrimaryColor);

    const currentStatus = useSelector(selectCurrentStatus);

    const customStatus = useSelector(selectCustomStatus);

    const loadingCustomStatus = useSelector(selectLoadingStatusChange);

    const activityStatus = useSelector(selectActivityStatus);

    const glassColor = useSelector(selectGlassColor);

    React.useEffect(() => {

        setValue(currentStatus);

    }, [])

    const handleCustomStatus = (value) => {

        if (value.length > 56) return; 

        dispatch(setCustomState(value.toLowerCase()));
    
    }

    const handleChangeStatus = (value) => {
        setValue(value);
    }

    const handleDynamicActivityStatus = () => {

        if (activityStatus) {
            dispatch(updateUserStatus({value: customStatus}))
        }

        dispatch(miscSettingsChannelSpecificStateChange('activity'));
    }

    const save = () => {
        dispatch(updateUserStatus({value: value === 'custom' ? customStatus : value}))
        
        close();
    }

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        style={{backgroundColor: glassColor}}
        className='user-status-menu-container'>
            <div style={{backgroundColor: primaryColor}} className='inner-status-menu-container'>
                <InputTitle title={'Change User Status'} />
                <BoolButton action={() => {handleChangeStatus('online')}} state={value === 'online'} name={"Online"} />
                <BoolButton action={() => {handleChangeStatus('away')}} state={value === 'away'} name={"Away"} />
                <BoolButton action={() => {handleChangeStatus('offline')}} state={value === 'offline'} name={"Offline"} />
                <TextInput inputValue={customStatus} action={handleCustomStatus} marginBottom='1%' marginTop='1%' placeholder={'Custom Status'} />
                <BoolButton action={() => {handleChangeStatus(customStatus)}} state={(value !== 'online' && value !== 'away' && value !== 'offline')} name={"Custom"} />
                <BoolButton action={handleDynamicActivityStatus} state={activityStatus} name={"Enable Dynamic Activity Status"} />
                <ApplyCancelButton apply={save} cancel={close} />
            </div>
            <Loading loading={loadingCustomStatus} />
        </motion.div>
    )
}
