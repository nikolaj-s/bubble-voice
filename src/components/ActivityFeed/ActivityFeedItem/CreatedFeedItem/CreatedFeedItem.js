
import styles from './CreatedFeedItem.module.css'

export const CreatedFeedItem = ({ data }) => {
  const { channel_name, category_name } = data

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.text}>Created {channel_name ? 'channel' : 'category'} <span className={styles.channelName}>{channel_name || category_name}</span></span>
      </div>
    </div>
  )
}
