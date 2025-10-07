import React from 'react'
import TextLabelError from '../Error/TextLabelError/TextLabelError'
import SubscriptionCard from './SubscriptionCard/SubscriptionCard'
import NoSubscriptionsCard from './NoSubscriptionsCard/NoSubscriptionsCard'

export const Subscriptions = ({subscriptions= [], error}) => {

    return (
        <>
        {error && (<TextLabelError error={error} />)}
        {subscriptions.length === 0 && (<NoSubscriptionsCard />)}
        {subscriptions.map(sub => {
            return <SubscriptionCard subscription={sub} />
        })}
        </>
    )
}
