import React from 'react'

import { motion } from 'framer-motion'

import "./ActivityBoard.css";
import { useDispatch, useSelector } from 'react-redux';
import { ServerWelcomeMessage } from './ServerWelcomeMessage/ServerWelcomeMessage';
import { DividerButton } from '../../../../../components/Spacers/DividerButton/DividerButton';
import { ImageOfTheDay } from './ImageOfTheDay/ImageOfTheDay';
import { selectHideActivityFeed, selectHideImageOfTheDay, selectHidePinnedSubreddit, selectHideRecentPin, selectMediaOfTheDay, selectPinnedMessages, selectPinnedSubreddits, toggleHideActivityFeed, toggleHideImageOfTheDay, toggleHidePinnedSubreddit, toggleRecentPinnedMessage } from '../ServerDashBoardSlice';
import { ActivityFeed } from './ActivityFeed/ActivityFeed';
import { selectImageOfTheDay } from '../../../ServerSlice';
import { selectDisableTransitionAnimations, selectGlassColor, selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { AltImageIcon } from '../../../../../components/Icons/AltImageIcon/AltImageIcon';
import { AltActivityIcon } from '../../../../../components/Icons/AltActivityIcon/AltActivityIcon';
import { PinnedSubRedditWrapper } from '../../../../../components/PinnedSubReddit/PinnedSubRedditWrapper';
import { PinIcon } from '../../../../../components/Icons/PinIcon/PinIcon';
import { RecentPin } from './RecentPin/RecentPin';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { PinnedSubReddit } from '../../../../../components/PinnedSubReddit/PinnedSubReddit';

export const ActivityBoard = ({loading}) => {

    const [time, setTime] = React.useState(0);

    const dispatch = useDispatch();

    const hideActivityFeed = useSelector(selectHideActivityFeed);

    const hideImageOfTheDay = useSelector(selectHideImageOfTheDay);

    const hideRecentPin = useSelector(selectHideRecentPin);

    const imageOfTheDay = useSelector(selectMediaOfTheDay);

    const hidePinnedSubreddit = useSelector(selectHidePinnedSubreddit);

    const textColor = useSelector(selectTextColor);

    const disableTransition = useSelector(selectDisableTransitionAnimations);

    const glassColor = useSelector(selectGlassColor);

    const pins = useSelector(selectPinnedMessages);

    const pinnedSubreddits = useSelector(selectPinnedSubreddits);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

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
        justifyContent: 'center',
        display: 'flex'
        }} 
        className='server-media-wrappers' 
        initial={{opacity: 0}} animate={{opacity: 1}} 
        exit={{opacity: 0}}>

            <div className='server-activity-wrapper'>
                
                <ResponsiveMasonry columnsCountBreakPoints={{0: 1, 1200: 2, 1921: 3}} style={{width: 'calc(100% - 10px)'}}>
                    <Masonry gutter='5px' >
                        <div style={{border: `solid 2px ${glassColor}`}} className='wrapper'>
                            <ServerWelcomeMessage />
                        </div>
                        <div
                        style={{border: `solid 2px ${glassColor}`}}
                        className='wrapper'>
                            <DividerButton textMargin={5} icon={<AltImageIcon width='30px' />} action={() => {dispatch(toggleHideImageOfTheDay())}} state={hideImageOfTheDay} name={"Media of The Day"} />
                            {hideImageOfTheDay ? null : <ImageOfTheDay updatesIn={time >= 1 ? `Updates In: ${time} hour${time === 1 ? "" : 's'}` : null} imageOfTheDay={imageOfTheDay} />}
                            
                        </div>  
                        <div 
                        style={{border: `solid 2px ${glassColor}`}}
                        className='wrapper'> 
                            <DividerButton state={hideRecentPin} action={() => {dispatch(toggleRecentPinnedMessage())}} textMargin={5} icon={<PinIcon color={textColor} />} name={"Recently Pinned Message"} />
                            {hideRecentPin ? null : <RecentPin message={pins[0]} />}
                        </div> 
                        <div 
                        style={{border: `solid 2px ${glassColor}`}}
                        className='wrapper'>
                            <DividerButton icon={<AltActivityIcon width={30} height={30} />} textMargin={5} action={() => {dispatch(toggleHideActivityFeed())}} state={hideActivityFeed} name={"Activity Feed"} />
                            {hideActivityFeed ? null : <ActivityFeed />}
                        </div>
                        {pinnedSubreddits.length > 0 ?
                        <div 
                        style={{backgroundColor: secondaryColor, borderRadius: 10, border: `solid 2px ${glassColor}`}}
                        className='wrapper'>
                            <DividerButton state={hidePinnedSubreddit} action={() => {dispatch(toggleHidePinnedSubreddit())}} textMargin={5} icon={<PinIcon color={textColor} />} name={"Pinned Subreddit"} />
                            {!hidePinnedSubreddit ?
                            <div style={{borderRadius: 10, width: '100%'}}>
                                <PinnedSubReddit mediaOfTheDay={true} subreddit={pinnedSubreddits[Math.floor(Math.random() * pinnedSubreddits.length)]} />
                            </div> 
                            : null}
                       </div>
                        : null}
                    </Masonry>
                </ResponsiveMasonry>
                
                
            </div>
            
        </motion.div>
        }
        </>
    )
}
