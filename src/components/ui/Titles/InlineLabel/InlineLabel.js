import React from 'react'

export const InlineLabel = ({icon, title}) => {
    return (
        <span style={{
            display: 'flex',
            alignItems: 'center',
            opacity: 1,
            fontWeight: 600,
            fontSize: 16
        }}>
            {icon}
            {title}:
        </span>
    )
}
