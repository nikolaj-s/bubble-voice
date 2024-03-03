import React from 'react'
import { Message } from '../../../../../components/Message/Message'
import { motion } from 'framer-motion';
import { NoMedia } from '../../../../../components/NoMedia/NoMedia'
import { useSelector } from 'react-redux';
import { selectDisableTransitionAnimations, selectSecondaryColor, selectTextColor } from '../../../../settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { selectPinnedSubreddits } from '../ServerDashBoardSlice';
import { PinnedSubRedditWrapper } from '../../../../../components/PinnedSubReddit/PinnedSubRedditWrapper';
import { PinIcon } from '../../../../../components/Icons/PinIcon/PinIcon';
import { SettingsHeader } from '../../../../../components/titles/SettingsHeader/SettingsHeader';

export const Pins = ({permission, pins, handlePin, initLoading}) => {

  const [page, setPage] = React.useState('messages');

  const disableTransition = useSelector(selectDisableTransitionAnimations);

  const pinnedSubreddits = useSelector(selectPinnedSubreddits);

  const textColor = useSelector(selectTextColor);

  const secondaryColor = useSelector(selectSecondaryColor);

  return (
    <motion.div
    transition={disableTransition ? {duration: 0} : {duration: 0.2}}
    style={{padding: 0, width: '100%', height: '100%'}} className='server-media-wrappers' initial={{translateX: '100%'}} animate={{translateX: '0%'}} exit={{translateX: '-100%'}}>
      <div className='pins-sub-nav'>
        <h3 onClick={() => {setPage('messages')}} style={{color: textColor, opacity: page === 'messages' ? 1 : 0.5}}>Messages</h3>
        <h2 style={{color: textColor}}>/</h2>
        <h3 onClick={() => {setPage('subreddits')}} style={{color: textColor, marginRight: 5, opacity: page === 'subreddits' ? 1 : 0.5}}>Subreddits</h3>
        <div style={{width: '100%', height: 2, borderRadius: 10, backgroundColor: textColor}} />
      </div>
      {page === 'subreddits' ?
      <PinnedSubRedditWrapper subreddits={pinnedSubreddits} /> 
      : 
      <>
      {initLoading ? null : pins?.length <= 1 ?
        <NoMedia message={"Currently No Pinned Messages"} />
        : pins?.map((p, key) => {
            return p?.no_more_pins ? null : <Message dashboard={true} persist={true} previous_message={key === 0 ? null : pins[key - 1]} current_message={p} index={key} pinMessage={() => {handlePin(p)}} perm={permission?.user_can_post_channel_social} key={p._id} channel_id={p?.channel_id} id={p._id} message={p.content} pinned={p.pinned} />
      })}
      </>
      }
      
      
    </motion.div>
  )
}
