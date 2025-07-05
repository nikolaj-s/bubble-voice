import React from 'react';

import styles from './ExpandedMediaWrapper.module.css';
import { ToolBar } from '../ToolBar/ToolBar';
import { MediaInfo } from '../../../MediaInfo/MediaInfo';
import IconButton from '../../Buttons/IconButton/IconButton';
import { X } from 'lucide-react';

export const ExpandedMediaWrapper = ({context, onClose, children}) => {
    return (
        <div data-context={JSON.stringify(context)} className={styles.overlay} >
        <div className={styles.closeOverlay} onClick={onClose} />
        <ToolBar className={styles.close}>
            {context?.src && (<MediaInfo data={context} />)}
            <IconButton Icon={X} position="bottom" title={'close'} onClick={onClose} />
        </ToolBar>
        {children}
        </div>
    )
}
