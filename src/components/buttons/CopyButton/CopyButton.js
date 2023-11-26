import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { CopyIcon } from '../../Icons/CopyIcon/CopyIcon';

export const CopyButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <CopyIcon />
        </ButtonAnimationWrapper>
    )
}
