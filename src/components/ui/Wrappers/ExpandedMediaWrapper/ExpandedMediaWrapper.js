import React from 'react';

import styles from './ExpandedMediaWrapper.module.css';
import { ToolBar } from '../ToolBar/ToolBar';
import { MediaInfo } from '../../../MediaInfo/MediaInfo';
import IconButton from '../../Buttons/IconButton/IconButton';
import { Ellipsis, PictureInPicture, X } from 'lucide-react';
import { triggerContext } from '../../../../lib/services/helperFunctions';
import PipWrapper from '../../../PipWrapper/PipWrapper';

export const ExpandedMediaWrapper = ({context, onClose, children}) => {
    
    const [pip, togglePip] = React.useState(false);

    return (
        <PipWrapper isPip={pip}>
            <div id={`expanded-media-${context?.src}`} data-context={JSON.stringify(context)} className={`${pip ? styles.pip : styles.overlay}`} >
                <div className={styles.closeOverlay} onClick={onClose} />
                <ToolBar className={styles.close}>
                    {context?.src && (<MediaInfo data={context} />)}
                    {context && (<IconButton Icon={Ellipsis} title={'More'} position='bottom' onClick={(e) => {triggerContext(e, `expanded-media-${context?.src}`)}} />)}
                    <IconButton Icon={PictureInPicture} position='bottom' onClick={() => {togglePip(!pip)}} title={'Toggle Picture In Picture'} />
                    <IconButton Icon={X} position="bottom" title={'close'} onClick={onClose} />
                </ToolBar>
                {children}
            </div>
        </PipWrapper>
    )
}
