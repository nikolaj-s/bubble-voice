import React from 'react'
import { Message } from '../../../../../components/Message/Message'
import { motion } from 'framer-motion';
import { NoMedia } from '../../../../../components/NoMedia/NoMedia'

export const Pins = ({permission, pins, handlePin, initLoading}) => {
  return (
    <motion.div className='server-media-wrappers' initial={{translateX: '100%'}} animate={{translateX: '0%'}} exit={{translateX: '-100%'}}>
      {initLoading ? null : pins?.length <= 1 ?
      <NoMedia message={"Currently No Pinned Messages"} />
      : pins?.map((p, key) => {
          return p?.no_more_pins ? null : <Message dashboard={true} persist={true} previous_message={key === 0 ? null : pins[key - 1]} current_message={p} index={key} pinMessage={() => {handlePin(p)}} perm={permission?.user_can_post_channel_social} key={p._id} channel_id={p?.channel_id} id={p._id} message={p.content} pinned={p.pinned} />
      })}
    </motion.div>
  )
}
