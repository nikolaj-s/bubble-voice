import React from 'react'
import IconButton from '../../../../components/ui/Buttons/IconButton/IconButton'
import { Search } from 'lucide-react'
import { KeybindToolTip } from '../../../../components/ui/Titles/KeybindToolTip/KeybindToolTip'

import styles from './SearchButton.module.css'

export const SearchButton = ({ onClick }) => {
  return (
    <IconButton  
      className={styles.searchButton}
      onClick={onClick}
      padding={"5px"}
      backgroundColor='var(--primary-color)'
      Icon={
        <div className={styles.searchWrapper}>
          <p className={styles.searchText}>Search</p>
          <Search className={styles.searchIcon} color="var(--text-color)" />
        </div>
      }
      position="bottom"
      title={<KeybindToolTip binds={["Ctrl", "/"]} width={100} />}
    />
  )
}
