import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { CopyIcon } from '../../Icons/CopyIcon/CopyIcon';

export const CopyButton = ({width, height, tranparent, action, description}) => {
    return (
        <ButtonAnimationWrapper description={description} width={width} height={height} transparent={tranparent} action={action}>
            <CopyIcon />
        </ButtonAnimationWrapper>
    )
}
