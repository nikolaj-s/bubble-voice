import React from 'react'

export const ErrorToolTip = ({error}) => {
    return (
        <p style={{
            width: 150,
            whiteSpace: 'normal',
            textWrap: 'wrap',
            color: 'var(--error-color)'
        }}>
            {error}
        </p>
    )
}
