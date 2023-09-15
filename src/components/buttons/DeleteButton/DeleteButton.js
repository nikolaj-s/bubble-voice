import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { DeleteIcon } from '../../Icons/DeleteIcon/DeleteIcon'

export const DeleteButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <DeleteIcon />
        </ButtonAnimationWrapper>
    )
}
