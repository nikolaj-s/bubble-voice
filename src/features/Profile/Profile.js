import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreatePostMenuOpen, selectProfileTabOpen, toggleCreatePostMenu } from './ProfileSlice'

import "./Profile.css";
import { selectGlassColor, selectGlassState, selectSecondaryColor, selectTextColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Image } from '../../components/Image/Image';
import { selectUserBanner, selectUserImage } from '../settings/appSettings/accountSettings/accountSettingsSlice';
import { AddButton } from '../../components/buttons/AddButton/AddButton';

export const Profile = () => {

    const dispatch = useDispatch();

    const createPostMenuOpen = useSelector(selectCreatePostMenuOpen);

    const visible = useSelector(selectProfileTabOpen);

    const textColor = useSelector(selectTextColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const glassState = useSelector(selectGlassState);

    const glassColor = useSelector(selectGlassColor);

    const userBanner = useSelector(selectUserBanner);

    const userImage = useSelector(selectUserImage);

    const handleToggleCreatePostMenu = () => {
        dispatch(toggleCreatePostMenu(!createPostMenuOpen));
    } 

    return (
        <AnimatePresence>
            {visible ?
            <motion.div 
            initial={{opacity: 0, left: '-600px'}}
            animate={{opacity: 1, left: 55}}
            exit={{opacity: 0, left: '-600px'}}
            style={{backgroundColor: glassState ? glassColor : secondaryColor}}
            className='profile-tab-container'>
                <div className='profile-tab-picture-wrappper'>
                    <Image position='absolute' width='100%' image={userBanner} />
                    <div className='profile-picture-tab-container'>
                        <Image image={userImage} />
                    </div>
                    
                </div>
                <h3 style={{color: textColor, textAlign: 'center'}}>This is a placeholder for future features </h3>
                <div className='add-post-button-container'>
                    <AddButton action={handleToggleCreatePostMenu} desc_font_size={'1.5rem'} invert={true} description={'Create'} />
                </div>
            </motion.div>
            : null}
        </AnimatePresence>
    )
}
