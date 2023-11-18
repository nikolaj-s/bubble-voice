import React from 'react'

import { motion } from 'framer-motion'

import "./ActivityBoard.css";
import { useDispatch, useSelector } from 'react-redux';
import { ServerWelcomeMessage } from './ServerWelcomeMessage/ServerWelcomeMessage';
import { DividerButton } from '../../../../../components/Spacers/DividerButton/DividerButton';
import { ImageOfTheDay } from './ImageOfTheDay/ImageOfTheDay';
import { selectHideActivityFeed, selectHideImageOfTheDay, toggleHideActivityFeed, toggleHideImageOfTheDay } from '../ServerDashBoardSlice';
import { ActivityFeed } from './ActivityFeed/ActivityFeed';
import { selectImageOfTheDay } from '../../../ServerSlice';
import { selectDisableTransitionAnimations } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const ActivityBoard = ({loading}) => {

    const [time, setTime] = React.useState(0);

    const dispatch = useDispatch();

    const hideActivityFeed = useSelector(selectHideActivityFeed);

    const hideImageOfTheDay = useSelector(selectHideImageOfTheDay);

    const imageOfTheDay = useSelector(selectImageOfTheDay);

    const disableTransition = useSelector(selectDisableTransitionAnimations);


    React.useEffect(() => {
        try {
            const t = Math.floor(Math.floor(((Date.now() - imageOfTheDay.date) / 1000) / 60) / 60);
    
            setTime(24 - t);
        } catch (err) {
            return;
        }

    }, [imageOfTheDay])

    return (
        <>
        {loading ? null :
        <motion.div 
        transition={disableTransition ? {duration: 0} : null}
        style={{padding: 0, width: '100%', height: '100%',
        }} 
        className='server-media-wrappers' 
        initial={{translateX: '100%'}} animate={{translateX: '0%'}} 
        exit={{translateX: '-100%'}}>

            <div className='server-activity-wrapper'>
                <ServerWelcomeMessage />
                <DividerButton extra={time >= 1 ? `Updates In: ${time} hour${time === 1 ? "" : 's'}` : null} action={() => {dispatch(toggleHideImageOfTheDay())}} state={hideImageOfTheDay} name={"Image of The Day"} />
                {hideImageOfTheDay ? null : <ImageOfTheDay imageOfTheDay={imageOfTheDay} />}
                <DividerButton action={() => {dispatch(toggleHideActivityFeed())}} state={hideActivityFeed} name={"Activity Feed"} />
                {hideActivityFeed ? null : <ActivityFeed />}
            </div>
        </motion.div>
        }
        </>
    )
}
