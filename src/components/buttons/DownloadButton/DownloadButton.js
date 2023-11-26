import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import { SaveIcon } from '../../Icons/SaveIcon/SaveIcon';

export const DownloadButton = (props) => {
  return (
        <ButtonAnimationWrapper {...props}>
            <SaveIcon />
        </ButtonAnimationWrapper>
  )
}
