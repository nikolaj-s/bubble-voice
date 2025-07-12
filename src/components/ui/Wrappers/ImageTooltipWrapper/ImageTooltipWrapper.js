import React from 'react';

import styles from './ImageTooltipWrapper.module.css'
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../../features/Media/ExpandedImage/expandedImageSlice';
import IconButton from '../../Buttons/IconButton/IconButton';
import { Ellipsis } from 'lucide-react';
import { triggerContext } from '../../../../lib/services/helperFunctions';

export const ImageTooltipWrapper = ({image, children, style = {width: '100%', height: '100%', borderRadius: '5px', overflow: 'hidden'}, disableDefaultBehaviour = false, showCtxButton = false}) => {

    const dispatch = useDispatch();

    const expand = () => {

        if (disableDefaultBehaviour) return;

        dispatch(setExpandedImage({data: image, image: image.src}));

    }

    return (
        <div 
        id={image.src}
        style={style}
        onClick={expand}
        className={styles.container}
        data-context={JSON.stringify({...image, type: 'imageSearchResult'})} >
            {showCtxButton && 
            (<div className={styles.ctxButton}>
                <IconButton Icon={Ellipsis} title={'options'} onClick={(e) => {triggerContext(e, image.src)}} />
            </div>)}
            {children}
        </div>
    )
}
