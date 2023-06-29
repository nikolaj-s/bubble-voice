import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { DisconnectButton } from '../../../../components/buttons/DisconnectButton/DisconnectButton';
import { LeaveServerButton } from '../../../../components/buttons/LeaveServerButton/LeaveServerButton';
import { selectStatusMenuState } from '../../ChannelRoom/UserStatus/UserStatusSlice';
import { UserStatusMenu } from '../../../../components/UserStatusMenu/UserStatusMenu';
import { ConnectionIndicator } from '../../../../components/connectionIndicator/ConnectionIndicator';
import { selectPrimaryColor } from '../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const DisconnectButtonWrapper = ({disconnect, leave, channel_id}) => {

    const statusMenuOpen = useSelector(selectStatusMenuState);

    const primaryColor = useSelector(selectPrimaryColor);

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
                {channel_id !== null ? <ConnectionIndicator width={53} active={true} /> : null}
            </div>
            <LeaveServerButton desc_space={15} description={"Leave Server"} margin={"0px"} width={channel_id ? 53 : 190} padding={5} height={25} borderRadius={5} id='disconnect-from-server-button' action={() => {leave(false)}} name={"Leave Server"} />
            {channel_id !== null ? <DisconnectButton desc_space={15} action={disconnect} padding={5} width={53} height={25}  /> : null}
        </motion.div>
        </>
    )
}
