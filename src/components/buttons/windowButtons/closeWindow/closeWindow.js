import React from 'react'

export const CloseWindow = ({ action }) => {

    const styles = {
        container: {
            width: 20,
            height: 20
        },
        icon: {
            width: "100%",
            height: "100%",
            objectFit: "contain"
        }
    }

    const handleAction = () => {
        action('close')
    }
    
    return (
        <div id="close-window" onClick={handleAction} style={styles.container}>
            <svg style={styles.icon} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 1.6625L16.425 0L9 7.8375L1.575 0L0 1.6625L7.425 9.5L0 17.3375L1.575 19L9 11.1625L16.425 19L18 17.3375L10.575 9.5L18 1.6625Z" fill="black"/>
            </svg>
        </div>
    )
}
