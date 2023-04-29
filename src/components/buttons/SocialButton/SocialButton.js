import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SocialButton = ({action, width, padding, height, borderRadius, margin, zIndex, flip_description, desc_o_mouse_leave, o_mouseLeave, desc_space, description = 'Social'}) => {

    const color = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper altInvert={true} desc_space={desc_space} o_mouseLeave={o_mouseLeave} desc_o_mouse_leave={desc_o_mouse_leave} flip_description={flip_description} zIndex={zIndex} padding={padding} description={description} margin={margin} width={width} height={height} action={action} borderRadius={borderRadius}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1337_4)">
<path d="M5.5 11.493L7.5 14.491L9.5 11.493H13.5C13.7652 11.493 14.0196 11.3876 14.2071 11.2001C14.3946 11.0125 14.5 10.7582 14.5 10.493V1.49998C14.5 1.3687 14.4741 1.23871 14.4239 1.11745C14.3736 0.996176 14.2999 0.886002 14.207 0.793224C14.1142 0.700445 14.0039 0.62688 13.8826 0.576734C13.7613 0.526589 13.6313 0.500846 13.5 0.500977H1.5C1.23478 0.500977 0.98043 0.606334 0.792893 0.79387C0.605357 0.981407 0.5 1.23576 0.5 1.50098V10.494C0.5 10.7592 0.605357 11.0135 0.792893 11.2011C0.98043 11.3886 1.23478 11.494 1.5 11.494H5.5V11.493Z" stroke={color} strokeLinecap="square" strokeLinejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1337_4">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>


        </ButtonAnimationWrapper>
    )
}
