
import React from 'react'

export const Iframe = ({link}) => {

    return (
        <>
        {link ?
            <div style={{maxWidth: 800}}>
                <iframe 
                style={{
                    borderRadius: 15
                }}
                title={link}
                sandbox='allow-scripts allow-same-origin allow-presentation allow-popups' loading='lazy' src={link} allow="clipboard-write; encrypted-media;" frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height={link?.includes('steampowered') ? '200px' : '500px'}></iframe>
            </div>
        : null}
        </>
    )
}