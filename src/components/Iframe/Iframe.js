
import React from 'react'

import { useIntersection } from '../useIntersection/useIntersection';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectPrimaryColor, selectSecondaryColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

export const Iframe = ({link, marginLeft}) => {

    const ref = React.useRef();

    const visible = useIntersection(ref, '-400px');

    const [rendered, toggleRender] = React.useState(false);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    React.useEffect(() => {

        if (rendered) return;

        if (visible) return toggleRender(true);

    }, [visible])

    return (
        <>
        {link ?
            <div ref={ref} style={{maxWidth: 800, marginLeft: marginLeft, minHeight: link?.includes('steampowered') ? '200px' : '600px', borderRadius: 10}}>
                {rendered ?
                <iframe 
                style={{
                    borderRadius: 10
                }}
                title={link}
                sandbox='allow-scripts allow-same-origin allow-presentation allow-popups' loading='lazy' src={link} allow="clipboard-write; encrypted-media;" frameBorder='0' scrolling='no' allowFullScreen={false} width='100%' height={link?.includes('steampowered') ? '200px' : '600px'}></iframe>
                : 
                <motion.div 
            style={{
                background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundSize: '600% 600%',
            }}
            initial={{backgroundPosition: '0% 50%'}}
            animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
            transition={{ease: 'linear', duration: 3, repeat: Infinity}}
            ></motion.div> 
                }
            </div>
        : null}
        </>
    )
}