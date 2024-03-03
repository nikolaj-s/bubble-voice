import React from 'react'

import { motion } from 'framer-motion'

import "./ActivityBoard.css";
import { useDispatch, useSelector } from 'react-redux';
import { ServerWelcomeMessage } from './ServerWelcomeMessage/ServerWelcomeMessage';
import { DividerButton } from '../../../../../components/Spacers/DividerButton/DividerButton';
import { ImageOfTheDay } from './ImageOfTheDay/ImageOfTheDay';
import { selectHideActivityFeed, selectHideImageOfTheDay, selectHideRecentPin, selectPinnedMessages, selectPinnedSubreddits, toggleHideActivityFeed, toggleHideImageOfTheDay, toggleRecentPinnedMessage } from '../ServerDashBoardSlice';
import { ActivityFeed } from './ActivityFeed/ActivityFeed';
import { selectImageOfTheDay } from '../../../ServerSlice';
import { selectDisableTransitionAnimations, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AltImageIcon } from '../../../../../components/Icons/AltImageIcon/AltImageIcon';
import { AltActivityIcon } from '../../../../../components/Icons/AltActivityIcon/AltActivityIcon';
import { PinnedSubRedditWrapper } from '../../../../../components/PinnedSubReddit/PinnedSubRedditWrapper';
import { PinIcon } from '../../../../../components/Icons/PinIcon/PinIcon';
import { RecentPin } from './RecentPin/RecentPin';

export const ActivityBoard = ({loading}) => {

    const [time, setTime] = React.useState(0);

    const dispatch = useDispatch();

    const hideActivityFeed = useSelector(selectHideActivityFeed);

    const hideImageOfTheDay = useSelector(selectHideImageOfTheDay);

    const hideRecentPin = useSelector(selectHideRecentPin);

    const imageOfTheDay = useSelector(selectImageOfTheDay);

    const textColor = useSelector(selectTextColor);

    const disableTransition = useSelector(selectDisableTransitionAnimations);

    const pins = useSelector(selectPinnedMessages);

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
        style={{padding: 0, width: '100%', height: '100%',
        }} 
        className='server-media-wrappers' 
        initial={{translateX: '100%'}} animate={{translateX: '0%'}} 
        exit={{translateX: '-100%'}}>

            <div className='server-activity-wrapper'>
                <ServerWelcomeMessage />
                <DividerButton textMargin={5} icon={<AltImageIcon width='30px' />} extra={time >= 1 ? `Updates In: ${time} hour${time === 1 ? "" : 's'}` : null} action={() => {dispatch(toggleHideImageOfTheDay())}} state={hideImageOfTheDay} name={"Image of The Day"} />
                {hideImageOfTheDay ? null : <ImageOfTheDay imageOfTheDay={imageOfTheDay} />}
                <DividerButton state={hideRecentPin} action={() => {dispatch(toggleRecentPinnedMessage())}} textMargin={5} icon={<PinIcon color={textColor} />} name={"Recently Pinned Message"} />
                {hideRecentPin ? null : <RecentPin message={pins[0]} />}
                <DividerButton icon={<AltActivityIcon width={30} height={30} />} textMargin={5} action={() => {dispatch(toggleHideActivityFeed())}} state={hideActivityFeed} name={"Activity Feed"} />
                {hideActivityFeed ? null : <ActivityFeed />}
                
            </div>
        </motion.div>
        }
        </>
    )
}
