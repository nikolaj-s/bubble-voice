import React from 'react'
import { useSelector } from 'react-redux'

export const TextBlock = ({text, styles, notification}) => {

    const fontSize = useSelector(state => state.appearanceSlice.fontSize)

    return (
        <>
        {text ?
            <p style={{fontSize}} className={`${styles.textBlock} ${notification ? styles.notificationText : ''}`}>{text}</p>
        : null
        }
        </>
    )
}
