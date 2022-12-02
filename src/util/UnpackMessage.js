

export const UnpackMessage = (message) => {
    try {

        let link = false;

        let iFrame = false;

        let twitter = false;

        let t = false;

        let text_to_analyze = message?.content?.text;

        if (text_to_analyze.includes('https')) {
            for (const text of text_to_analyze.split(' ')) {
                if (text.includes('redgif')) {
                
                    iFrame = "https://redgifs.com/ifr/" + (text.split('redgifs.com/')[1]?.includes('watch') ? text.split('redgifs.com/')[1]?.split('watch/')[1].toLowerCase() : text.split('redgifs.com/')[1]?.split('-')[0].toLowerCase());
                
                } else if (text.includes('youtu')) {
    
                    iFrame = "https://www.youtube.com/embed/" + (text.split('/')[3].includes('watch?') ? text.split('/')[3].split('watch?v=')[1].split('&')[0] : text.split('/')[3]);
    
                } else if (text.includes('pornhub')) {
    
                    iFrame = "https://www.pornhub.com/embed/" + (text.split('viewkey=')[1])
    
                } else  if (text.includes('xvideos')) {
    
                    iFrame = "https://www.xvideos.com/embedframe/" + (text.split('video')[1].split('/')[0]);
    
                } else if (text.includes('reddit')) {
    
                    iFrame = "https://www.redditmedia.com/r/" + (text.split('r/')[1].split('?utm_')[0] + "?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark")
    
                } else if (text.includes('steampowered')) {
    
                    iFrame = "https://store.steampowered.com/widget/" + (text.split('app/')[1].split('/')[0]);
    
                } else if (text.includes('twitter')) {
                    
                    twitter = text.split('status/')[1].split('?')[0];
                    
                } else if (text.includes('https')) {
    
                    link = text;
                
                } else {
                    t = text + " ";
                }

            }
        } else {
            t = text_to_analyze;
        }

        message.content = {...message.content, link: link, iFrame: iFrame, text: t, twitter: twitter}

        return message;

    } catch (error) {

        return message;
    
    }
}