import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPrimaryColor, selectSecondaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice'
import {motion} from 'framer-motion'
import "./UserBio.css";
import { Image } from '../Image/Image';
import { setExpandedContent } from '../../features/ExpandContent/ExpandContentSlice';
import { Iframe } from '../Iframe/Iframe';

export const UserBio = ({bio = "", margin, loading, textWidget}) => {

    const dispatch = useDispatch();

    const [text, setText] = React.useState("");

    const [images, setImages] = React.useState([]);

    const [embeds, setEmbeds] = React.useState([]);

    React.useEffect(() => {

        let text_arr = bio.split(" ");

        let l_images = [];

        let l_embeds = [];

        let l_text = "";

        for (const i of text_arr) {
            if ((i.includes('jpg') || i.includes('png') || i.includes('jpeg') || i.includes('gif')) && i.includes('https')) {
                
                l_images.push(i);
            } else if (i.includes('embed') && i.includes('https')) {
                l_embeds.push(i);   
            } else {
                l_text = l_text + " " + i;
            }
        }

        setText(l_text);

        setImages(l_images);

        setEmbeds(l_embeds);

    }, [bio])

    const textColor = useSelector(selectTextColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const secondaryColor = useSelector(selectSecondaryColor);

    const expand = (ct) => {
        dispatch(setExpandedContent(ct))
    }

    return (
        <>
        
        <div style={{backgroundColor: primaryColor, margin: margin, borderRadius: textWidget ? '20px' : null, overflow: 'hidden'}} className='user-bio-preview-container'>
            {loading ? 
             <motion.div 
             style={{
                 background: `linear-gradient(270deg, ${secondaryColor}, ${primaryColor}, ${secondaryColor})`,
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
                 backgroundSize: '600% 600%',
                 borderRadius: 5,
                 zIndex: 4
             }}
             initial={{backgroundPosition: '0% 50%'}}
             animate={{backgroundPosition: ['0% 50%', '300% 50%']}}
             transition={{ease: 'linear', duration: 3, repeat: Infinity}}
             ></motion.div>  
            : null}
            {bio.length > 0 && bio !== 'undefined' ?
            <div className='inner-bio-wrapper'>
                <p style={{color: textColor}}>
                {text}
                </p>
                {images.length === 0 ?
                null
                : 
                <div className='bio-images-wrapper'>
                    {images.map(i => {
                    return (
                    <div onClick={() => {expand(i)}} className='mini-bio-image'>
                        <Image cursor='pointer' image={i} />
                    </div>
                    )
                    })
                    }
                    
                </div>}
                {embeds.map(e => {
                return (
                    <div style={{
                        width: "100%",
                        height: 350
                    }}>
                        <Iframe link={e} />
                    </div>
                )
                })}
            </div>
            : 
            <div className='no-bio-container'>
                <p style={{color: textColor}}>{textWidget ? "" : "No Bio"}</p>
            </div>
            }
        </div>
        
        </>
    )
}
