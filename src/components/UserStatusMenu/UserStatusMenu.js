// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentStatus, selectCustomStatus, selectLoadingStatusChange, setCustomState, updateUserStatus } from '../../features/server/ChannelRoom/UserStatus/UserStatusSlice';
import { selectGlassColor, selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { miscSettingsChannelSpecificStateChange, selectActivityStatus } from '../../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';

import { TextInput } from '../inputs/TextInput/TextInput';
import { Loading } from '../LoadingComponents/Loading/Loading';
import { InputTitle } from '../titles/inputTitle/InputTitle';
import { motion } from 'framer-motion';
// style
import "./UserStatusMenu.css";
import { TextButton } from '../buttons/textButton/TextButton';
import { RadioButton } from '../buttons/RadioButton/RadioButton';
import { DownIcon } from '../Icons/DownIcon/DownIcon';

export const UserStatusMenu = ({close = () => {}}) => {

    const dispatch = useDispatch();

    const [value, setValue] = React.useState("");

    const [changeMade, toggleChangeMade] = React.useState(false);

    const [open, toggleOpen] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const currentStatus = useSelector(selectCurrentStatus);

    const customStatus = useSelector(selectCustomStatus);

    const loadingCustomStatus = useSelector(selectLoadingStatusChange);

    const activityStatus = useSelector(selectActivityStatus);

    const glassColor = useSelector(selectGlassColor);

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        setValue(currentStatus);

    }, [])

    const handleCustomStatus = (value) => {

        if (value.length > 56) return; 

        dispatch(setCustomState(value.toLowerCase()));

        toggleChangeMade(true);
    
    }

    const handleChangeStatus = (value) => {
        setValue(value);

        toggleChangeMade(true);
    }

    const handleDynamicActivityStatus = () => {

        if (activityStatus) {
            dispatch(updateUserStatus({value: customStatus}))
        }

        dispatch(miscSettingsChannelSpecificStateChange('activity'));
        
        toggleChangeMade(true);
    }

    const save = () => {

        dispatch(updateUserStatus({value: value !== 'online' && value !== 'offline' && value !== 'away' ? customStatus : value}))
        
        toggleChangeMade(false);
    }

    return (
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        style={{backgroundColor: primaryColor}}
        className='user-status-menu-container'>
            <TextButton textAlign='start' action={() => {toggleOpen(!open)}} name={'Update Status'} />
            
            <div style={{rotate: open ? '-180deg' : null}} className='drop-down-icon-wrapper'>
                <DownIcon />
            </div>
            {open ?
            <>
                <div style={{backgroundColor: primaryColor}} className='inner-status-menu-container'>
                    <RadioButton margin={"0 0 3px 0"} action={() => {handleChangeStatus('online')}} state={value === 'online'} name={"Online"} />
                    <RadioButton margin={"0 0 3px 0"} action={() => {handleChangeStatus('away')}} state={value === 'away'} name={"Away"} />
                    <RadioButton margin={"0 0 3px 0"} action={() => {handleChangeStatus('offline')}} state={value === 'offline'} name={"Offline"} />
                    
                    <RadioButton margin={"0 0 3px 0"} action={() => {handleChangeStatus(customStatus)}} state={(value !== 'online' && value !== 'away' && value !== 'offline')} name={"Custom"} />
                    {(value !== 'online' && value !== 'away' && value !== 'offline') ?
                    <TextInput invert={true} inputValue={customStatus} action={handleCustomStatus} marginBottom='1%' marginTop='1%' placeholder={'Custom Status'} />
                    : null}
                    <RadioButton margin={"0 0 3px 0"} action={handleDynamicActivityStatus} state={activityStatus} name={"Enable Dynamic Activity Status"} />
                {changeMade ? <TextButton width={'90px'} invert={true} marginBottom={5} name={'Update'} action={save} /> : null}
                </div>
                <Loading loading={loadingCustomStatus} />
            </>
            : null}
        </motion.div>
    )
}
