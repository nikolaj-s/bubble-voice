
import React from 'react'

export const Iframe = ({text}) => {

    const [link, setLink] = React.useState("");
    
    React.useEffect(() => {

        let link;

        try {

            if (text.includes('redgif')) {
                
                link = "https://redgifs.com/ifr/" + (text.split('redgifs.com/')[1]?.includes('watch') ? text.split('redgifs.com/')[1]?.split('watch/')[1].toLowerCase() : text.split('redgifs.com/')[1]?.split('-')[0].toLowerCase());
            
            } else if (text.includes('youtu')) {

                link = "https://www.youtube.com/embed/" + (text.split('/')[3].includes('watch?') ? text.split('/')[3].split('watch?v=')[1].split('&')[0] : text.split('/')[3]);

            } else if (text.includes('pornhub')) {

                link = "https://www.pornhub.com/embed/" + (text.split('viewkey=')[1])

            } else  if (text.includes('xvideos')) {

                link = "https://www.xvideos.com/embedframe/" + (text.split('video')[1].split('/')[0]);

            } else if (text.includes('reddit')) {

                link = "https://www.redditmedia.com/r/" + (text.split('r/')[1].split('?utm_')[0] + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark")

            } else if (text.includes('steampowered')) {

                link = "https://store.steampowered.com/widget/" + (text.split('app/')[1].split('/')[0]);

            } else {

                link = 'error';
            
            }

            setLink(link);
    
        } catch (error) {

            setLink('error')
        }
    }, [text])
        
    const handleError = () => {
        setLink('error');
    }

    return (
        <div
        >
            {link === 'error' ?
            <a 
            href={text}
            target="_blank"
            style={{
                margin: '0 0.5rem'
            }}
            >{text}</a>
            : <iframe 
            style={{
                borderRadius: 15
            }}
            sandbox='allow-scripts allow-same-origin allow-presentation allow-popups' loading='lazy' onError={handleError} src={link} allow="clipboard-write; encrypted-media;" frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height={text?.includes('steampowered') ? '200px' : '500px'}></iframe>}
        </div>
    )
}