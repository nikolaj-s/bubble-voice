import React from 'react'

export const Hub = ({text}) => {

    let link;

    try {

        link = text.split('viewkey=')[1]

    } catch (error) {
        link = 'error';
    }

    return (
        <div
        style={{
            borderRadius: 15,
            overflow: 'hidden'
        }}
        >
            {link === 'error' ? 
            <p>Link Parsing Error</p>
            : 
            <iframe sandbox src={`https://www.pornhub.com/embed/${link}`} frameborder="0" width="100%" height="500px" scrolling="no" allowFullScreen={false}></iframe>
            }
        </div>
    )
}
