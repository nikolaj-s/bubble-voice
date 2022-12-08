import React from 'react'

export const MessageLink = ({link}) => {

    return (
        <>
        {link ?
        <a draggable={false} style={{overflow: 'hidden'}} href={link} target="_blank" >{link}</a>
        : null}
        </>
    )
}
