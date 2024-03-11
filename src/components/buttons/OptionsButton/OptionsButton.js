import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const OptionsButton = ({ctx = true, action, width, height, desc_width, transparent, altInvert, invert, description, right_orientation_desc, target, borderRadius, zIndex, top, left, padding}) => {

    const color = useSelector(selectTextColor);

    const handleAction = (e) => {
        if (ctx) {
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
            }
        } else {
            action();
        }
    }

    return (
        <ButtonAnimationWrapper
        action={handleAction}
        width={width}
        height={height}
        desc_width={desc_width}
        transparent={transparent}
        right_orientation_desc={right_orientation_desc}
        altInvert={altInvert}
        description={description}
        borderRadius={borderRadius}
        top={top}
        left={left}
        zIndex={zIndex}
        invert={invert}
        padding={padding}
        >
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 0C4.88687 0.000117948 5.74858 0.294824 6.44978 0.83783C7.15098 1.38084 7.65195 2.14138 7.874 3H16V5H7.874C7.62827 5.94049 7.04864 6.75939 6.24333 7.3038C5.43802 7.84821 4.46209 8.0809 3.49778 7.95844C2.53346 7.83597 1.64669 7.36671 1.00303 6.63828C0.35937 5.90985 0.002836 4.97206 0 4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0ZM4 6C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4C6 3.46957 5.78929 2.96086 5.41421 2.58579C5.03914 2.21071 4.53043 2 4 2C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4C2 4.53043 2.21071 5.03914 2.58579 5.41421C2.96086 5.78929 3.46957 6 4 6ZM14 17C13.1131 16.9999 12.2514 16.7052 11.5502 16.1622C10.849 15.6192 10.3481 14.8586 10.126 14H2V12H10.126C10.3717 11.0595 10.9514 10.2406 11.7567 9.6962C12.562 9.15179 13.5379 8.9191 14.5022 9.04156C15.4665 9.16403 16.3533 9.63329 16.997 10.3617C17.6406 11.0901 17.9972 12.0279 18 13C18 14.0609 17.5786 15.0783 16.8284 15.8284C16.0783 16.5786 15.0609 17 14 17ZM14 15C14.5304 15 15.0391 14.7893 15.4142 14.4142C15.7893 14.0391 16 13.5304 16 13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13C12 13.5304 12.2107 14.0391 12.5858 14.4142C12.9609 14.7893 13.4696 15 14 15Z" fill={color}/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
