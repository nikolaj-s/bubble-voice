import React from 'react'
import ScrollLoadWrapper from '../ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import { ActivityFeedItem } from './ActivityFeedItem/ActivityFeedItem'
import ContentHeader from '../Headers/ContentHeader/ContentHeader'
import { ActivityFeedPlaceholder } from './ActivityFeedPlaceholder/ActivityFeedPlaceholder'
import { Rss } from 'lucide-react'

export const ActivityFeed = ({feed}) => {
    return (
        <ScrollLoadWrapper style={{borderRadius: 0}}>
            <ContentHeader title={'Activity Feed'} Icon={Rss} />
            {feed?.length === 0 || !feed ?
            <ActivityFeedPlaceholder />
            :
            feed?.map(item => (<ActivityFeedItem item={item} />))}
        </ScrollLoadWrapper>
    )
}
