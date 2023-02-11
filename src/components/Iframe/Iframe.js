
import React from 'react'

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const Iframe = ({link, marginLeft, maxWidth = 800}) => {

    const [rendered, toggleRender] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const loaded = (e) => {
       
        toggleRender(true);
    }

    return (
        <>
        {link ?
            <div style={{maxWidth: maxWidth, marginLeft: marginLeft, minHeight: link?.includes('steampowered') ? '200px' : null, maxHeight: 600, borderRadius: 5, position: 'relative', backgroundColor: 'black', display: 'flex', overflow: 'hidden'}}>
                
                <iframe 
                onLoad={loaded}
                
                title={link}
                sandbox='allow-scripts allow-same-origin allow-presentation allow-popups' loading='lazy' src={link} allow="clipboard-write; encrypted-media;" frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height={link?.includes('steampowered') ? '200px' : '500px'}></iframe>
                {!rendered ?
                <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
                zIndex: 3
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div> 
               : null }
            </div>
        : null}
        </>
    )
}