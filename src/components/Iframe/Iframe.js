
import React from 'react'

export const Iframe = ({link, marginLeft}) => {


    return (
        <>
        {link ?
            <div style={{maxWidth: 800, marginLeft: marginLeft}}>
                <iframe 
                style={{
                    borderRadius: 10
                }}
                title={link}
                sandbox='allow-scripts allow-same-origin allow-presentation allow-popups' loading='lazy' src={link} allow="clipboard-write; encrypted-media;" frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height={link?.includes('steampowered') ? '200px' : '600px'}></iframe>
            </div>
        : null}
        </>
    )
}