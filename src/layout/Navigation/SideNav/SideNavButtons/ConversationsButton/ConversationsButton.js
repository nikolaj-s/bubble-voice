import { MessagesSquare } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { toggleConversationPanel } from '../../../../../features/Conversations/conversationsSlice';
import IconButton from '../../../../../components/ui/Buttons/IconButton/IconButton';
import { AlertIndicator } from '../../../../../components/ui/AlertIndicator/AlertIndicator';

export const ConversationsButton = () => {

    const dispatch = useDispatch();

    const {unreadConversations, isOpen} = useSelector(state => state.conversationsSlice);

    return (
        <div style={{position: 'relative'}}>
            <AlertIndicator active={unreadConversations} />
            <IconButton 
            backgroundColor={isOpen ? 'var(--accent-color)' : null}
            onClick={() => {dispatch(toggleConversationPanel())}}
            Icon={<MessagesSquare color='var(--text-color)' />}
            width={50}
            height={50}
            padding={15}
            position='right'
            title={<p style={{
            padding: 5,
            margin: 0,
            fontSize: '14px'
            }}>
                Direct Messages
            </p>}
            />
        </div>
    )
}
