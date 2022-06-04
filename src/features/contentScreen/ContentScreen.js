// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { NoServerSelectedDisplay } from './NoServerSelectedDisplay/NoServerSelectedDisplay';
import { SettingsRoutesWrapper } from './SettingsRoutestWrapper/SettingsRoutesWrapper';
import { CreateServerMenu } from '../createServer/createServerMenu/CreateServerMenu';

// state
import { selectSecondaryColor } from '../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { HeaderTitle } from '../../components/titles/headerTitle/headerTitle';
import { selectHeaderTitle } from './contentScreenSlice';

// style's
import "./ContentScreen.css";


export const ContentScreen = () => {
    // color schema
    const secondaryColor = useSelector(selectSecondaryColor);

    // content display state
    
    const headerTitleState = useSelector(selectHeaderTitle);
    
    return (
        <motion.div className='content-screen-container' >
            <HeaderTitle title={headerTitleState} />
            <div style={{backgroundColor: secondaryColor}} className='content-screen-inner-container'>
                <NoServerSelectedDisplay />
                <SettingsRoutesWrapper />
                <CreateServerMenu />
            </div>
        </motion.div>
    )
}
