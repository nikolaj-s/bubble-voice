import React from 'react'
import { useSelector } from 'react-redux'
import {selectSecondaryColor, selectTextColor} from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
export const MinimizeWindow = ({ action }) => {

    const [hover, toggleHover] = React.useState(false);

    const secondaryColor = useSelector(selectSecondaryColor);

    // button style
    const styles = {
        container: {
            width: 12,
            height: '100%',
            backgroundColor: hover ? secondaryColor : 'rgba(0,0,0,0)'
        },
        icon: {
            width: "100%",
            height: "100%",
            objectFit: "contain"
        }
    }

    const handleAction = () => {
        action('min')
    }

    const color = useSelector(selectTextColor)

    return (
        <div onMouseEnter={() => {toggleHover(true)}} onMouseLeave={() => {toggleHover(false)}} id="minimize-window" onClick={handleAction} style={styles.container} >
            <svg style={styles.icon} width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 0H16.5C17.325 0 18 0.45 18 1C18 1.55 17.325 2 16.5 2H1.5C0.675 2 0 1.55 0 1C0 0.45 0.675 0 1.5 0Z" fill={color}/>
            </svg>
        </div>
    )
}
