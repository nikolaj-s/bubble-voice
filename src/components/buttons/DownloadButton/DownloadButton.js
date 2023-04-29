import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import { SaveIcon } from '../../Icons/SaveIcon/SaveIcon';

export const DownloadButton = ({width, height, action, margin}) => {
  return (
        <ButtonAnimationWrapper margin={margin} description={'Download'} width={width} height={height} action={action}>
            <SaveIcon />
        </ButtonAnimationWrapper>
  )
}
