import React from 'react';
import { motion } from 'framer-motion';
import { TextButton } from '../../../../components/buttons/textButton/TextButton';
import { DisconnectButton } from '../../../../components/buttons/DisconnectButton/DisconnectButton';
import { useSelector } from 'react-redux';
import { selectUserImage } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { ProfilePictureButton } from '../../../../components/buttons/ProfilePictureButton/ProfilePictureButton';

export const DisconnectButtonWrapper = ({disconnect, leave, channel_id}) => {

    const profilePic = useSelector(selectUserImage);
   
    return (
        <motion.div 
        initial={{display: 'none'}}
        animate={{display: 'flex'}}
        className='leave-server-button'>
            <ProfilePictureButton image={profilePic} width={45} height={45} />
            <TextButton id='disconnect-from-server-button' action={() => {leave(false)}} name={"Leave Server"} />
            {channel_id !== null ? <DisconnectButton action={disconnect} width={35} height={35} /> : null}
        </motion.div>
    )
}
