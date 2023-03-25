import React from 'react'

import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const GradientButton = ({action, gradient, active, description}) => {

    return (
        <ButtonAnimationWrapper
        action={action}
        width={35}
        height={35}
        padding={5}
        description={description}
        active={active}
        margin={"5px"}
        desc_space={15}
        >
            <div
            style={{
                width: 30,
                height: 30,
                flexShrink: 0,
                border: `solid 2px white`,
                borderRadius: '50%',
                background: gradient
            }}
            ></div>
        </ButtonAnimationWrapper>
    )
}
