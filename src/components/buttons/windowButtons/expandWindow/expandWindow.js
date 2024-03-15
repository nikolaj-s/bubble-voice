import React from 'react'
import { useSelector } from 'react-redux'
import { selectSecondaryColor, selectTextColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'

export const ExpandWindow = ({ action }) => {

    const [hover, toggleHover] = React.useState(false);

    const secondaryColor = useSelector(selectSecondaryColor);

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

    const color = useSelector(selectTextColor);

    const handleAction = () => {
        action('max')
    }

    return (
        <div onMouseEnter={() => {toggleHover(true)}} onMouseLeave={() => {toggleHover(false)}} id="expand-window" onClick={handleAction} style={styles.container}>
            <svg style={styles.container} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 1H5C2.79086 1 1 2.79086 1 5V15C1 17.2091 2.79086 19 5 19H15C17.2091 19 19 17.2091 19 15V5C19 2.79086 17.2091 1 15 1Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}
