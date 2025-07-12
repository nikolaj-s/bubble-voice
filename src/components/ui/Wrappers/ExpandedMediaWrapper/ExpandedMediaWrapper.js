import React from 'react';

import styles from './ExpandedMediaWrapper.module.css';
import { ToolBar } from '../ToolBar/ToolBar';
import { MediaInfo } from '../../../MediaInfo/MediaInfo';
import IconButton from '../../Buttons/IconButton/IconButton';
import { Ellipsis, X } from 'lucide-react';
import { triggerContext } from '../../../../lib/services/helperFunctions';

export const ExpandedMediaWrapper = ({context, onClose, children}) => {
    return (
        <div id={`expanded-media-${context?.src}`} data-context={JSON.stringify(context)} className={styles.overlay} >
        <div className={styles.closeOverlay} onClick={onClose} />
        <ToolBar className={styles.close}>
            {context?.src && (<MediaInfo data={context} />)}
            {context && (<IconButton Icon={Ellipsis} title={'More'} position='bottom' onClick={(e) => {triggerContext(e, `expanded-media-${context?.src}`)}} />)}
            <IconButton Icon={X} position="bottom" title={'close'} onClick={onClose} />
        </ToolBar>
        {children}
        </div>
    )
}
