import React from 'react'
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper'
import { useSelector } from 'react-redux'
import { selectTextColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const PinToProfileButton = ({pinned, action, height, width, padding}) => {
  
    const color = useSelector(selectTextColor);

    return (
        <ButtonAnimationWrapper desc_space={12} desc_width='100px' action={action} padding={padding} width={width} height={height} description={pinned ? "Unpin From Profile" : "Pin To Profile"} >
            {!pinned ?

            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 52V46.7778C7 44.0077 8.13785 41.3512 10.1632 39.3924C12.1886 37.4337 14.9357 36.3333 17.8 36.3333H24.55M12.4 15.4444C12.4 18.2145 13.5379 20.8711 15.5632 22.8298C17.5886 24.7885 20.3357 25.8889 23.2 25.8889C26.0643 25.8889 28.8114 24.7885 30.8368 22.8298C32.8621 20.8711 34 18.2145 34 15.4444C34 12.6744 32.8621 10.0178 30.8368 8.05911C28.8114 6.10039 26.0643 5 23.2 5C20.3357 5 17.5886 6.10039 15.5632 8.05911C13.5379 10.0178 12.4 12.6744 12.4 15.4444Z" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M49.7143 38.45V31.7H51.1429C51.9286 31.7 52.5714 31.0925 52.5714 30.35C52.5714 29.6075 51.9286 29 51.1429 29H36.8571C36.0714 29 35.4286 29.6075 35.4286 30.35C35.4286 31.0925 36.0714 31.7 36.8571 31.7H38.2857V38.45C38.2857 40.691 36.3714 42.5 34 42.5V45.2H42.5286V54.65L43.9571 56L45.3857 54.65V45.2H54V42.5C51.6286 42.5 49.7143 40.691 49.7143 38.45Z" fill={color}/>
            </svg>
            
            
            : 

            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 52V46.7778C7 44.0077 8.13785 41.3512 10.1632 39.3924C12.1886 37.4337 14.9357 36.3333 17.8 36.3333H24.55M12.4 15.4444C12.4 18.2145 13.5379 20.8711 15.5632 22.8298C17.5886 24.7885 20.3357 25.8889 23.2 25.8889C26.0643 25.8889 28.8114 24.7885 30.8368 22.8298C32.8621 20.8711 34 18.2145 34 15.4444C34 12.6744 32.8621 10.0178 30.8368 8.05911C28.8114 6.10039 26.0643 5 23.2 5C20.3357 5 17.5886 6.10039 15.5632 8.05911C13.5379 10.0178 12.4 12.6744 12.4 15.4444Z" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M49.7143 38.45V31.7H51.1429C51.9286 31.7 52.5714 31.0925 52.5714 30.35C52.5714 29.6075 51.9286 29 51.1429 29H36.8571C36.0714 29 35.4286 29.6075 35.4286 30.35C35.4286 31.0925 36.0714 31.7 36.8571 31.7H38.2857V38.45C38.2857 40.691 36.3714 42.5 34 42.5V45.2H42.5286V54.65L43.9571 56L45.3857 54.65V45.2H54V42.5C51.6286 42.5 49.7143 40.691 49.7143 38.45Z" fill={color}/>
            <path d="M8 3L55.8193 53.2856" stroke={color} strokeWidth="5" strokeLinecap="round"/>
            </svg>


            }
        </ButtonAnimationWrapper>
  )
}
