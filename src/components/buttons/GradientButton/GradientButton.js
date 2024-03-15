import React from 'react'

import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectPrimaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const GradientButton = ({action, gradient, active, description}) => {
    const primaryColor = useSelector(selectPrimaryColor);
    return (
        <ButtonAnimationWrapper
        action={action}
        width={35}
        height={35}
        padding={5}
        description={description}
        active={active}
        margin={"5px"}
        invert={true}
        desc_space={15}
        desc_width='100px'
        active_background={primaryColor}
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
