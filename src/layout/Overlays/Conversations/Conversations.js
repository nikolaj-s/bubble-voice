import styles from './Conversations.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ScrollLoadWrapper from '../../../components/ui/Wrappers/ScrollLoadWrapper/ScrollLoadWrapper';
import { Conversation } from './Conversation/Conversation';
import ContentPlaceholder from '../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { ListX, MessageSquareX, Menu, X } from 'lucide-react';
import TextInput from '../../../components/ui/Inputs/TextInput/TextInput';
import ConversationHeader from '../../../components/Headers/ConversationHeader/ConversationHeader';
import { toggleConversationPanel, toggleUnreadConversations } from '../../../features/Conversations/conversationsSlice';
import ConversationButton from '../../../components/ConversationButton/ConversationButton';
import { setCurrentConversation } from '../../../features/Conversations/conversationSlice';
import { useEffect, useState } from 'react';
import IconButton from '../../../components/ui/Buttons/IconButton/IconButton';
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper';

export const Conversations = () => {
  const dispatch = useDispatch();

  const { selectedConversation } = useSelector((state) => state.conversationSlice);
  const { loading, error, conversations, isOpen } = useSelector((state) => state.conversationsSlice);
  const { last_read_status } = useSelector((state) => state.notificationsSlice);

  const [filter, setFilter] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => {
    dispatch(setCurrentConversation(null));
    setMenuOpen(true); // on mobile, reopen the menu when closing a convo
  };

  const openConversation = (convo) => {
    dispatch(setCurrentConversation(convo));
    setMenuOpen(false); // close menu when selecting convo (mobile)
  };

  useEffect(() => {
    if (!conversations || !last_read_status) return;

    const hasUnread = conversations.some((conversation) => {
      const lastRead = last_read_status[conversation._id]?.last_read_at;
      const latestMessage = conversation.updatedAt;
      return latestMessage && (!lastRead || new Date(latestMessage) > new Date(lastRead));
    });

    dispatch(toggleUnreadConversations(hasUnread));
  }, [last_read_status, conversations]);

  // Automatically open menu if no conversation is selected
  useEffect(() => {
    if (!selectedConversation) {
      setMenuOpen(true);
    }
  }, [selectedConversation]);

  if (!isOpen) return null;

  return (

    <div style={{ top: window?.electron ? 32 : 0 }} className={styles.container}>
      <div className={styles.mobileHeader}>
        <button className={styles.menuButton} onClick={() => setMenuOpen((prev) => !prev)}>
          <Menu size={22} />
        </button>
        <h3 className={styles.headerTitle}>Conversations</h3>
        <span style={{width: '100%'}} />
        <IconButton 
        Icon={X}
        onClick={() => {dispatch(toggleConversationPanel())}}
        />
      </div>

      <div className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
        <ScrollLoadWrapper style={{ backgroundColor: 'var(--card-background-color)' }} loading={loading} error={error}>
          <TextInput placeholder='Filter' onChange={setFilter} value={filter} onClear={() => setFilter("")} />
          {!loading && conversations.length === 0 && (
            <ContentPlaceholder icon={ListX} message={'You have no conversations to be had'} />
          )}
          {conversations
            ?.slice()
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            ?.filter((convo) => convo?.other?.display_name?.toLowerCase().includes(filter.toLowerCase()))
            .map((convo) => (
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
      </div>

      <div className={styles.content} style={{zIndex: selectedConversation ? 2 : null}}>
        {selectedConversation ? (
          <>
            <ConversationHeader {...selectedConversation?.other} onClose={handleClose} />
            <Conversation />
          </>
        ) : (
          <div className={styles.placeholder}>
            <ContentPlaceholder title={'No Conversation Selected'} icon={MessageSquareX} />
          </div>
        )}
      </div>
    </div>
  );
};
