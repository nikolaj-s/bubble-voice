import React from 'react';
import { motion } from 'framer-motion';
import { DisconnectButton } from '../../../../components/buttons/DisconnectButton/DisconnectButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserImage } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { ProfilePictureButton } from '../../../../components/buttons/ProfilePictureButton/ProfilePictureButton';
import { LeaveServerButton } from '../../../../components/buttons/LeaveServerButton/LeaveServerButton';
import { selectStatusMenuState, toggleStatusMenu } from '../../ChannelRoom/UserStatusBar/UserStatusSlice';
import { UserStatusMenu } from '../../../../components/UserStatusMenu/UserStatusMenu';

export const DisconnectButtonWrapper = ({disconnect, leave, channel_id}) => {

    const dispatch = useDispatch();

    const profilePic = useSelector(selectUserImage);

    const statusMenuOpen = useSelector(selectStatusMenuState);

    const handleToggleStatusMenu = () => {
        dispatch(toggleStatusMenu(!statusMenuOpen))
    }

    return (
        <>
        {statusMenuOpen ? <UserStatusMenu /> : null}
        <motion.div 
        style={{
            display: 'flex',
            justifyContent: 'flex-start'
        }}
        initial={{display: 'none'}}
        animate={{display: 'flex'}}
        className='leave-server-button'>
            <ProfilePictureButton action={handleToggleStatusMenu} image={profilePic} width={25} height={25} padding={2} />
            <LeaveServerButton description={"Leave Server"} margin={"0 12px"} width={channel_id ? 80 : 190} height={25} borderRadius={10} id='disconnect-from-server-button' action={() => {leave(false)}} name={"Leave Server"} />
            {channel_id !== null ? <DisconnectButton action={disconnect}  width={80} height={25} /> : null}
        </motion.div>
        </>
    )
}
