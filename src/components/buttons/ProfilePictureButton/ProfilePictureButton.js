

import React from 'react'
import { Image } from '../../Image/Image'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const ProfilePictureButton = ({image, width, height}) => {
  return (
    <ButtonAnimationWrapper
    width={width}
    height={height}
    active={true}
    invert={true}
    >
        <div
        style={{
            width: width,
            height: height,
            borderRadius: '50%',
            overflow: 'hidden'
        }}
        >   
            <Image image={image} objectFit='cover' />
        </div>
    </ButtonAnimationWrapper>
  )
}
