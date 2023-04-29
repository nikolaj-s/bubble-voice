import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import { SavesIcon } from '../../Icons/SavesIcon/SavesIcon'
import { SavedIcon } from '../../Icons/SavedIcon/SavedIcon'

export const SaveButton = ({width, height, action, description}) => {
    return (
        <ButtonAnimationWrapper width={width} height={height} action={action} description={description}>
            {description === 'Save' ?
            <SavesIcon />
            : 
            <SavedIcon />
            }
        </ButtonAnimationWrapper>
    )
}
