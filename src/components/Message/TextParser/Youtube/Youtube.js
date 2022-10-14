import React from 'react'

export const Youtube = ({text}) => {

    let link 
    
    try {
        link = text.split('/')[3].includes('watch?') ? text.split('/')[3].split('watch?v=')[1].split('&')[0] : text.split('/')[3]
    } catch (error) {
        link = 'error'
    }
    return (
        <div
        style={{
            borderRadius: 15,
            overflow: 'hidden'
        }}
        >
            {link === 'error' ?
            <p>Link parsing error</p>
            :
            <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${link}`} frameBorder="0" allow="clipboard-write; encrypted-media; gyroscope" allowFullScreen={false} ></iframe>}
        </div>
    )
}
