import React from 'react'

export const KeybindToolTip = ({binds, label, width}) => {
    return (
        <>
        <p style={{
            width: '100%',
            textAlign: 'center',
            margin: 0,
            padding: 0
        }}>
        {label}
        </p>
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            flexWrap: 'nowrap',
            justifyContent: 'center',
        }}
        >
        {
            binds.map((bind, key) => {
                return (
                    <>
                    <p
                    style={{
                        textAlign: 'center', 
                        backgroundColor: "var(--primary-color)", 
                        padding: '5px 10px', 
                        margin: '5px 0px', 
                        borderRadius: 5,
                        fontSize: '1rem'
                    }}
                    >
                    {bind}
                    </p>
                    {binds.length > 1 && key === 0 ? "+" : null}
                    </>
                )
            })
        }
        </div>
        </>
    )
}
