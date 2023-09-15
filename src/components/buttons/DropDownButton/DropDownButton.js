import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { DownIcon } from '../../Icons/DownIcon/DownIcon'

export const DropDownButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <DownIcon />
        </ButtonAnimationWrapper>
    )
}
