import React from 'react'

export const InlineLabel = ({icon, title}) => {
    return (
        <span style={{
            display: 'flex',
            alignItems: 'center',
            opacity: 0.75
        }}>
            {icon}
            {title}:
        </span>
    )
}
