import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { SocialIcon } from '../../Icons/SocialIcon/SocialIcon'

export const SocialButton = ({action, width, padding, height, borderRadius, margin, zIndex, flip_description, desc_o_mouse_leave, o_mouseLeave, desc_space, description = 'Social', desc_width = "50px"}) => {

    const color = useSelector(selectTextColor)

    return (
        <ButtonAnimationWrapper desc_width='50px' altInvert={true} desc_space={desc_space} o_mouseLeave={o_mouseLeave} desc_o_mouse_leave={desc_o_mouse_leave} flip_description={flip_description} zIndex={zIndex} padding={padding} description={description} margin={margin} width={width} height={height} action={action} borderRadius={borderRadius}>
            <SocialIcon color={color} />
        </ButtonAnimationWrapper>
    )
}
