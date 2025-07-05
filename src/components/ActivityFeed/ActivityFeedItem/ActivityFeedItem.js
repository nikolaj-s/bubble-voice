import React from 'react'
import styles from './ActivityFeedItem.module.css'
import { EditedFeedItem } from './EditedFeedItem/EditedFeedItem'
import { UserIndicator } from '../../UserIndicator/UserIndicator'
import { CreatedFeedItem } from './CreatedFeedItem/CreatedFeedItem'
import { DeletedFeedItem } from './DeletedFeedItem/DeletedFeedItem'
import { GenericFeedItem } from './GenericFeedItem/GenericFeedItem'

export const ActivityFeedItem = ({ item = {} }) => {
  let content 

  switch (item.type) {

    case 'category_edited':
    case 'channel_edited':
      content = <EditedFeedItem data={item.data} title="Edited:" />
      break
    case 'channel_created':
    case 'category_created':
      content = <CreatedFeedItem data={item.data} />
      break
    case 'channel_deleted':
    case 'category_deleted':
      content = <DeletedFeedItem data={item.data} />
      break;
    // future cases:
    // case 'user_joined':
    //   content = <UserJoinedFeedItem actor={item.actor} data={item.data} />
    //   break
    // case 'message_posted':
    //   content = <MessagePostedFeedItem actor={item.actor} data={item.data} />
    //   break

    default:
      content = <GenericFeedItem {...item} />
  }

  return (
    <div className={styles.container}>
      {content}
      <UserIndicator user_id={item.actor} date={item?.created_at} />
    </div>
    )
}
