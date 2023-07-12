import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import {PokeIcon } from '../../Icons/PokeIcon/PokeIcon';

export const PokeButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <PokeIcon />
        </ButtonAnimationWrapper>
    )
}
