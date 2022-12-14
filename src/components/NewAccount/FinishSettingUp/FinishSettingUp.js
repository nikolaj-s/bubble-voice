import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserBanner, selectUserImage } from '../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { ProfileImage } from '../../../features/settings/appSettings/accountSettings/ProfileImage/ProfileImage';

import { InputTitle } from '../../titles/inputTitle/InputTitle';

import { motion } from 'framer-motion';

export const FinishSettingUp = ({setNewUserBanner, setNewUserImage}) => {

    const userImage = useSelector(selectUserImage);

    const userBanner = useSelector(selectUserBanner);

    const getNewUserImage = (image) => {
        setNewUserImage(image);
    }

    const getNewUserBanner = (image) => {
        setNewUserBanner(image);
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className='finish-account-set-up'>
            <InputTitle title={"Finish Account Setup By Adding A Banner and Profile Picture."} />
            <ProfileImage getNewUserBanner={getNewUserBanner} getNewUserImage={getNewUserImage} userBanner={userBanner} userImage={userImage} />
            <InputTitle title={"You Can Update This Later Within Account Settings"} />
        </motion.div>
    )
}
