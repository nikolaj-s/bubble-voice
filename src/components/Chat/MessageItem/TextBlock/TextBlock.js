import React from 'react'

export const TextBlock = ({text, styles}) => {
    return (
        <>
        {text ?
            <p className={styles.textBlock}>{text}</p>
        : null
        }
        </>
    )
}
