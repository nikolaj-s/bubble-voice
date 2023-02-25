import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const PlayButton = ({action, width = 35, height = 35, padding}) => {

    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper padding={padding} width={width} height={height} action={action} description={"Play"}>
            <svg width="100%" height="100%" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.525 13.025C1.19167 13.2416 0.854333 13.2543 0.513 13.063C0.171666 12.8716 0.000666667 12.5756 0 12.175V1.82497C0 1.42497 0.171 1.12897 0.513 0.936968C0.855 0.744968 1.19233 0.757635 1.525 0.974968L9.675 6.14997C9.975 6.34997 10.125 6.6333 10.125 6.99997C10.125 7.36663 9.975 7.64997 9.675 7.84997L1.525 13.025Z" fill={color}/>
            </svg>


        </ButtonAnimationWrapper>
    )
}
