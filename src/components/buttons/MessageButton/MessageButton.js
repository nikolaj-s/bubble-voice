import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { AltMessageIcon } from '../../Icons/AltMessageIcon/AltMessageIcon'

export const MessageButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <AltMessageIcon />
        </ButtonAnimationWrapper>
    )
}
