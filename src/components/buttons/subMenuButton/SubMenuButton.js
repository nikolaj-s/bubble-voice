// library's
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

// components
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SubMenuButton = ({position, top, left, right, zIndex, width = 25, height = 25, borderRadius = 15, target, description, flip_description, padding, right_orientation_desc, altInvert, invert = true, desc_o_mouse_leave, o_mouseLeave}) => {

  const color = useSelector(selectTextColor);

  const invokeCtxMenu = (e) => {
    e.stopPropagation()
    
    let ev = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: false,
      view: window,
      button: 2,
      buttons: 0,
      clientX: e.clientX,
      clientY: e.clientY
    })
    if (target) {
      document.getElementById(target).dispatchEvent(ev);
    } else {
      e.currentTarget.dispatchEvent(ev)
    }
      
  }

  return (
    <ButtonAnimationWrapper
    o_mouseLeave={o_mouseLeave}
    right_orientation_desc={right_orientation_desc}
    altInvert={altInvert}
    id={'sub-menu-button'}
    width={width} height={height}
    borderRadius={borderRadius}
    position={position}
    top={top}
    left={left}
    right={right}
    zIndex={zIndex}
    description={description}
    flip_description={flip_description}
    padding={padding}
    desc_o_mouse_leave={desc_o_mouse_leave}
    invert={invert} action={invokeCtxMenu} >
        <svg onContextMenu={invokeCtxMenu} width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.6875 40.625C29.6875 41.8682 29.1936 43.0605 28.3146 43.9396C27.4355 44.8186 26.2432 45.3125 25 45.3125C23.7568 45.3125 22.5645 44.8186 21.6854 43.9396C20.8064 43.0605 20.3125 41.8682 20.3125 40.625C20.3125 39.3818 20.8064 38.1895 21.6854 37.3104C22.5645 36.4314 23.7568 35.9375 25 35.9375C26.2432 35.9375 27.4355 36.4314 28.3146 37.3104C29.1936 38.1895 29.6875 39.3818 29.6875 40.625ZM29.6875 25C29.6875 26.2432 29.1936 27.4355 28.3146 28.3146C27.4355 29.1936 26.2432 29.6875 25 29.6875C23.7568 29.6875 22.5645 29.1936 21.6854 28.3146C20.8064 27.4355 20.3125 26.2432 20.3125 25C20.3125 23.7568 20.8064 22.5645 21.6854 21.6854C22.5645 20.8064 23.7568 20.3125 25 20.3125C26.2432 20.3125 27.4355 20.8064 28.3146 21.6854C29.1936 22.5645 29.6875 23.7568 29.6875 25ZM29.6875 9.375C29.6875 10.6182 29.1936 11.8105 28.3146 12.6896C27.4355 13.5686 26.2432 14.0625 25 14.0625C23.7568 14.0625 22.5645 13.5686 21.6854 12.6896C20.8064 11.8105 20.3125 10.6182 20.3125 9.375C20.3125 8.1318 20.8064 6.93951 21.6854 6.06044C22.5645 5.18136 23.7568 4.6875 25 4.6875C26.2432 4.6875 27.4355 5.18136 28.3146 6.06044C29.1936 6.93951 29.6875 8.1318 29.6875 9.375Z" fill={color} fillOpacity="1"/>
        </svg>
    </ButtonAnimationWrapper>
  )
}
