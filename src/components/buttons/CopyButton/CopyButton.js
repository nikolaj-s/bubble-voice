import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { CopyIcon } from '../../Icons/CopyIcon/CopyIcon';

export const CopyButton = ({width, height, tranparent, action, description, padding, invert, altInvert, desc_width, desc_space, flip_description}) => {
    return (
        <ButtonAnimationWrapper padding={padding} invert={invert} altInvert={altInvert} description={description} flip_description={flip_description} desc_width={desc_width} desc_space={desc_space} width={width} height={height} transparent={tranparent} action={action}>
            <CopyIcon />
        </ButtonAnimationWrapper>
    )
}
