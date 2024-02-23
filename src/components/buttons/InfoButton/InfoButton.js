import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { InfoIcon } from '../../Icons/InfoIcon/InfoIcon'

export const InfoButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <InfoIcon />
        </ButtonAnimationWrapper>
    )
}
