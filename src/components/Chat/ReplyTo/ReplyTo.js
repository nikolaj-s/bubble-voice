import React from 'react';

import styles from './ReplyTo.module.css';
import Label from '../../ui/Titles/Label/Label';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { X } from 'lucide-react';

export const ReplyTo = ({replyTo, users = {}, clearReplyTo = () => {}}) => {
    
    if (!replyTo) return null;

    const user = users[replyTo?.user_id]

    if (!user) return null;

    return (
        <>
        {replyTo && (
            <div 
            style={{borderLeft: `solid 4px ${user.color || 'var(--accent-color)'}`}}
            className={styles.container}>
                <Label margin={0} label={`Replying to ${user.display_name}`} />
                <IconButton 
                Icon={<X color='var(--text-color)' />}
                onClick={clearReplyTo}
                title={'clear'}
                />
            </div>
        )}
        </>
    )
}
;