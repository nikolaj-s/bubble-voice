import React from 'react'

export const RedGifs = ({text}) => {

    let link;
    
    try {
        link = text.split('redgifs.com/')[1]?.includes('watch') ? text.split('redgifs.com/')[1]?.split('watch/')[1] : text.split('redgifs.com/')[1]?.split('-')[0];
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
            : <iframe src={`https://redgifs.com/ifr/${link.toLowerCase()}`} frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height='500px'></iframe>}
        </div>
    )
}
