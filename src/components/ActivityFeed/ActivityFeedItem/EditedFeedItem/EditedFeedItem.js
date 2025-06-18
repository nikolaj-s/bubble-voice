import React from 'react'
import styles from './EditedFeedItem.module.css'
import Label from '../../../ui/Titles/Label/Label'

export const EditedFeedItem = ({ data = {}, title }) => {
  // coalesce null/undefined into {}
  const oldObj = data.old ?? {}
  const newObj = data.new ?? {}

  // determine which keys changed
  const ignored = ['_id', '__v', 'server_id']
  const allKeys = Array.from(new Set([
    ...Object.keys(oldObj),
    ...Object.keys(newObj)
  ]))
  const changes = allKeys
    .filter(key => !ignored.includes(key))
    .filter(key => {
      const a = oldObj[key]
      const b = newObj[key]
      // normalize undefined → null so that both null/undefined compare as equal
      return JSON.stringify(a ?? null) !== JSON.stringify(b ?? null)
    })

  return (
    <div className={styles.container}>
      <Label label={`Edited ${newObj?.channel_name ? 'Channel' : 'Category'}: ${newObj?.channel_name || newObj?.category_name}`} />
      <ul className={styles.changesList}>
        {changes.map(key => {
          const rawOld = oldObj[key]
          const rawNew = newObj[key]
          const oldVal = rawOld != null ? String(rawOld) : '(none)'
          const newVal = rawNew != null ? String(rawNew) : '(none)'

          return (
            <li key={key} className={styles.changeItem}>
              <span className={styles.minus}>
                − {key}: {oldVal}
              </span>
              <span className={styles.plus}>
                + {key}: {newVal}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
