import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { AltEditIcon } from '../../Icons/AltEditIcon/AltEditIcon'

export const StatusButton = ({width, height, action, description}) => {
    return (
        <ButtonAnimationWrapper
        width={width}
        height={height}
        action={action}
        description={description}
        >
            <AltEditIcon />
        </ButtonAnimationWrapper>
    )
}
