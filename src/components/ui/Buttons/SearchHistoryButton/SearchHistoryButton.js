import React from 'react'

import styles from './SearchHistoryButton.module.css'
import IconButton from '../IconButton/IconButton'
import { History, X } from 'lucide-react'

export const SearchHistoryButton = ({action, query, deleteItem, index}) => {
    return (
        <div
        className={styles.button}
        onClick={() => {action(query)}}
      >
        <span>
        <History color='var(--text-color)' />
        {query}
        </span>
        <IconButton 
        title={'Delete'}
        Icon={<X color='var(--text-color)' />}
        onClick={() => {deleteItem(query)}}
        position={index === 0 ? 'bottom' : 'top'}
        />
      </div>
    )
}
