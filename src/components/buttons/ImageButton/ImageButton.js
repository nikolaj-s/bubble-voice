import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { Image } from '../../Image/Image'

export const ImageButton = (props) => {
    return (
        <ButtonAnimationWrapper {...props}>
            <div style={{width: '100%', height: '100%', borderRadius: 4, overflow: 'hidden'}}>
                <Image cursor='pointer' image={props.image} objectFit='cover' />
            </div>
        </ButtonAnimationWrapper>
    )
}
