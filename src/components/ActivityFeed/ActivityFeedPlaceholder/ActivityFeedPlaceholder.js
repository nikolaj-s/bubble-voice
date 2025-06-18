// src/components/ActivityFeed/FeedPlaceholder/FeedPlaceholder.jsx
import React from 'react'
import styles from './ActivityFeedPlaceholder.module.css'
import { Smile } from 'lucide-react'

export const ActivityFeedPlaceholder = () => (
  <div className={styles.container}>
    <div className={styles.bubbles}>
      {[...Array(6)].map((_, i) => (
        <span key={i} className={styles.bubble} />
      ))}
    </div>
    <Smile className={styles.icon} />
    <p className={styles.message}>No activity yet!<br/>Stay tuned for updates.</p>
  </div>
)