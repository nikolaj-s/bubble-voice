import React from 'react'

export const MessageLink = ({link}) => {

    return (
        <>
        {link ?
        <a style={{margin: '0 0 2% 0', overflow: 'hidden'}} href={link} target="_blank" >{link}</a>
        : null}
        </>
    )
}
