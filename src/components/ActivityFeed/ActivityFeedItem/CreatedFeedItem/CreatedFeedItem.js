import React from 'react'
import styles from './CreatedFeedItem.module.css'
import Label from '../../../ui/Titles/Label/Label'

export const CreatedFeedItem = ({ data }) => {
  const { channel_name, category_name } = data

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Label label='Created:' />
        <span className={styles.text}>created {channel_name ? 'channel' : 'category'} <span className={styles.channelName}>{channel_name || category_name}</span></span>
      </div>
    </div>
  )
}
