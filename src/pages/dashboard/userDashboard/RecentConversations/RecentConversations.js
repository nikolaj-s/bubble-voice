
import ScrollLoadWrapper from '../../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper'
import { useDispatch, useSelector } from 'react-redux'
import ContentPlaceholder from '../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { ListX } from 'lucide-react';
import ConversationButton from '../../../../components/ConversationButton/ConversationButton';
import { setCurrentConversation } from '../../../../features/Conversations/conversationSlice';
import { toggleConversationPanel } from '../../../../features/Conversations/conversationsSlice';
import TextLabelError from '../../../../components/Error/TextLabelError/TextLabelError';
import Label from '../../../../components/ui/Titles/Label/Label';
import { BoxLabel } from '../../../../components/ui/Titles/BoxLabel/BoxLabel';

export const RecentConversations = () => {

    const dispatch = useDispatch();

    const { selectedConversation } = useSelector((state) => state.conversationSlice);

    const {loading, error, conversations} = useSelector(state => state.conversationsSlice);

    const { last_read_status } = useSelector((state) => state.notificationsSlice);

    const openConversation = (convo) => {

        if (convo?._id !== selectedConversation?._id) {
            dispatch(setCurrentConversation(convo));
        }

        dispatch(toggleConversationPanel());
    }

    return (
        <ScrollLoadWrapper>
            {conversations?.length === 0 && !loading && (
                <ContentPlaceholder icon={ListX} message={"No Recent Conversations"} />
            )}
            {error && (<TextLabelError error={error} />)}
            {conversations?.length > 0 && (<BoxLabel maxWidth={120} label={'Your Conversations'} />)}
            {conversations
            ?.slice()
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            ?.slice(0, 5)
            ?.map((convo) => (
              <ConversationButton
                active={convo._id === selectedConversation?._id}
                {...convo?.other}
                {...convo}
                conversation={convo}
                action={openConversation}
                key={convo._id}
                unread={new Date(convo?.updatedAt) > new Date(last_read_status[convo?._id]?.last_read_at)}
              />
            ))}
        </ScrollLoadWrapper>
    )
}
