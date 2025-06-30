import React from 'react'

import styles from './SearchHistoryButton.module.css'
import IconButton from '../IconButton/IconButton'
import { History, X } from 'lucide-react'

export const SearchHistoryButton = ({action, query, deleteItem}) => {
    return (
        <div
        className={styles.button}
        onClick={() => {action(query)}}
      >
        <span>
        <History size={18} style={{flexShrink: 0}} color='var(--text-color)' />
        {query}
        </span>
        <IconButton 
        height={25}
        width={25}
        padding={4}
        title={'Delete'}
        Icon={<X color='var(--text-color)' size={15} />}
        onClick={() => {deleteItem(query)}}
        position={'top'}
        />
      </div>
    )
}
