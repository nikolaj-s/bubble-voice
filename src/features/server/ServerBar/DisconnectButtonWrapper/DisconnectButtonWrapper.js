import React from 'react';
import { motion } from 'framer-motion';
import { DisconnectButton } from '../../../../components/buttons/DisconnectButton/DisconnectButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserImage } from '../../../settings/appSettings/accountSettings/accountSettingsSlice';
import { ProfilePictureButton } from '../../../../components/buttons/ProfilePictureButton/ProfilePictureButton';
import { LeaveServerButton } from '../../../../components/buttons/LeaveServerButton/LeaveServerButton';
import { selectStatusMenuState, toggleStatusMenu } from '../../ChannelRoom/UserStatus/UserStatusSlice';
import { UserStatusMenu } from '../../../../components/UserStatusMenu/UserStatusMenu';
import { ConnectionIndicator } from '../../../../components/connectionIndicator/ConnectionIndicator';
import { selectPrimaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const DisconnectButtonWrapper = ({disconnect, leave, channel_id}) => {

    const dispatch = useDispatch();

    const profilePic = useSelector(selectUserImage);

    const statusMenuOpen = useSelector(selectStatusMenuState);

    const primaryColor = useSelector(selectPrimaryColor);

    const handleToggleStatusMenu = () => {
        dispatch(toggleStatusMenu(!statusMenuOpen))
    }

    return (
        <>
        {statusMenuOpen ? <UserStatusMenu /> : null}
        <motion.div 
        style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}
        initial={{display: 'none'}}
        animate={{display: 'flex'}}
        className='leave-server-button'>
            <div 
            style={{backgroundColor: primaryColor}}
            className='profile-connection-wrapper'>
                <ProfilePictureButton action={handleToggleStatusMenu} image={profilePic} width={25} height={25} padding={1} />
                {channel_id !== null ? <ConnectionIndicator  active={true} /> : null}
            </div>
            <LeaveServerButton desc_space={15} description={"Leave Server"} margin={"0px"} width={channel_id ? 50 : 150} padding={5} height={25} borderRadius={5} id='disconnect-from-server-button' action={() => {leave(false)}} name={"Leave Server"} />
            {channel_id !== null ? <DisconnectButton desc_space={15} action={disconnect} padding={5} width={50} height={25}  /> : null}
        </motion.div>
        </>
    )
}
