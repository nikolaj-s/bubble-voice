import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../../../components/ui/Titles/Header/Header';
import ContentPlaceholder from '../../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { CircleX, X } from 'lucide-react';
import { Card } from '../../../../../components/ui/Wrappers/Card/Card';
import { getMessagingTimeouts } from '../../../../../features/Moderation/Thunks/getMessagingTimeouts';
import Label from '../../../../../components/ui/Titles/Label/Label';
import { MicroUserDisplay } from '../../../../../components/ui/MicroUserDisplay/MicroUserDisplay';
import { ToolBar } from '../../../../../components/ui/Wrappers/ToolBar/ToolBar';
import { Description } from '../../../../../components/ui/Description/Description';
import DateTimeDisplay from '../../../../../components/ui/DateTimeDisplay/DateTimeDisplay';
import IconButton from '../../../../../components/ui/Buttons/IconButton/IconButton';
import { deleteMessagingTimeout } from '../../../../../features/Moderation/Thunks/deleteMessagingTimeout';

export const ManageMessagingTimeouts = () => {

    const dispatch = useDispatch();

    const {loading, error, messagingTimeouts} = useSelector(state => state.moderationSlice);

    React.useEffect(() => {

        dispatch(getMessagingTimeouts());

    }, []);

    const clearMessageTimeout = (userID) => {
        dispatch(deleteMessagingTimeout(userID))
    }

    return (
        <>
        <Header level={3} text='Current Active Messaging Timeouts' />
        {!messagingTimeouts.length && !loading && (
            <ContentPlaceholder icon={CircleX} title={'No Current Message Timeouts'} />
        )}
        {messagingTimeouts.map(timeout => {
            return (
                <>  
                <Card key={timeout._id}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <Card>
                        <Label margin={'0px'} label='Timed out user:' />
                        <MicroUserDisplay user_id={timeout.user_id} />
                        </Card>
                        <Card>
                        <Label label='Timed out by:' />
                        <MicroUserDisplay user_id={timeout.actor_user_id} />
                        </Card>
                     </div>  
                    <Card>
                        {timeout.reason && (
                            <>
                            <Label label='Reason' />
                            <Description description={timeout.reason} />
                            </>
                        )}
                        <Label label='Timeout Expires:' />
                    
                        <DateTimeDisplay date={timeout.expiresAt} />
                        <ToolBar >
                            <IconButton 
                            onClick={() => {clearMessageTimeout(timeout.user_id)}}
                            Icon={<X color='var(--error-color)' />}
                            title="Clear Timeout"
                            />
                        </ToolBar>
                    </Card> 
                </Card>
                </>
            )
        })}
        </>
    )
}
