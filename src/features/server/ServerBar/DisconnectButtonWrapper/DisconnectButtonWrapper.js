import React from 'react';
import { motion } from 'framer-motion';
import { DisconnectButton } from '../../../../components/buttons/DisconnectButton/DisconnectButton';
import { useSelector } from 'react-redux';
import { selectUserImage } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { ProfilePictureButton } from '../../../../components/buttons/ProfilePictureButton/ProfilePictureButton';
import { LeaveServerButton } from '../../../../components/buttons/LeaveServerButton/LeaveServerButton';

export const DisconnectButtonWrapper = ({disconnect, leave, channel_id}) => {

    const profilePic = useSelector(selectUserImage);

    return (
        <motion.div 
        style={{
            display: 'flex',
            justifyContent: 'flex-start'
        }}
        initial={{display: 'none'}}
        animate={{display: 'flex'}}
        className='leave-server-button'>
            <ProfilePictureButton image={profilePic} width={35} height={35} padding={2} />
            <LeaveServerButton description={"Leave Server"} margin={"0 16px"} width={channel_id ? 80 : 195} height={25} borderRadius={10} id='disconnect-from-server-button' action={() => {leave(false)}} name={"Leave Server"} />
            {channel_id !== null ? <DisconnectButton action={disconnect}  width={80} height={25} /> : null}
        </motion.div>
    )
}
