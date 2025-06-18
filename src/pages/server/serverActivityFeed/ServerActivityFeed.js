

import { ActivityFeed } from '../../../components/ActivityFeed/ActivityFeed'
import { ServerActivityFeedProvider } from '../../../providers/ServerActivityFeedProvider/ServerActivityFeedProvider'


export const ServerActivityFeed = () => {
    
    return (
        <ServerActivityFeedProvider>
           <ActivityFeed />
        </ServerActivityFeedProvider>
    )
}
