import React from 'react'
import { SocialIcon } from '../../Icons/SocialIcon/SocialIcon'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const AltSocialButton = (props) => {

    return (
        <ButtonAnimationWrapper {...props}>
            <SocialIcon  />
        </ButtonAnimationWrapper>
    )
}
