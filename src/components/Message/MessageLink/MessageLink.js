import React from 'react'

export const MessageLink = ({link}) => {

    const handleLink = (e) => {
        e.preventDefault();

        try {

            const ipcRenderer = window.require('electron').ipcRenderer;

            ipcRenderer.send("open-link", {url: link});

        } catch (err) {
            window.open(link)
        }
    }

    return (
        <>
        {link ?
        <a onClick={handleLink} draggable={false} style={{overflow: 'hidden'}} href={link} target="_blank" >{link}</a>
        : null}
        </>
    )
}
