import React from 'react'
import { LockedChannelIcon } from '../LockedChannelIcon/LockedChannelIcon'

export const LockedIcon = ({width, height, padding, i_width, i_height}) => {
  return (
    <div style={{width: width, height: height, padding: padding, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <LockedChannelIcon width={i_width} height={i_height} />
    </div>
  )
}
