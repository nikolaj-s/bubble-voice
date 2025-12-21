import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Notices } from "../../../../components/Notices/Notices"
import ScrollLoadWrapper from "../../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper"
import { Subscriptions } from "../../../../components/Subscriptions/Subscriptions";
import { getSubscriptions } from "../../../../features/Subscriptions/Thunks/getSubscriptions";

export const UserFeed = () => {

    const dispatch = useDispatch();

    const {loading, error, subscriptions} = useSelector(state => state.subscriptionsSlice);

    React.useEffect(() => {

        dispatch(getSubscriptions());
        
    }, [])
   
    return (
        <ScrollLoadWrapper maxContentWidth={'100%'} loading={loading}  >
            <Notices />
            <Subscriptions subscriptions={subscriptions} error={error} />
        </ScrollLoadWrapper>
    )
}
