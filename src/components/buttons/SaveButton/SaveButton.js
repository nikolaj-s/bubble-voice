import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

import { SavesIcon } from '../../Icons/SavesIcon/SavesIcon'
import { SavedIcon } from '../../Icons/SavedIcon/SavedIcon'

export const SaveButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            {props.description === 'Save' ?
            <SavesIcon />
            : 
            <SavedIcon />
            }
        </ButtonAnimationWrapper>
    )
}
