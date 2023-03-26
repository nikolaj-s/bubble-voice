import React from 'react'
import { Message } from '../../../../../components/Message/Message'

import { NoMedia } from '../../../../../components/NoMedia/NoMedia'

export const Pins = ({permission, pins, handlePin}) => {
  return (
    <>
      {pins.length === 0 ?
      <NoMedia message={"Currently No Pinned Messages"} />
      : pins?.map((p, key) => {
          return <Message persist={true} previous_message={key === 0 ? null : pins[key - 1]} current_message={p} index={key} pinMessage={() => {handlePin(p)}} perm={permission?.user_can_post_channel_social} key={p._id} channel_id={p?.channel_id} id={p._id} message={p.content} pinned={p.pinned} />
      })}
    </>
  )
}