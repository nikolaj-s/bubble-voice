import React from 'react';
import { TextChannelProvider } from '../../../../providers/TextChannelProvider/TextChannelProvider';
import { ChatContainer } from '../../../../components/Chat/ChatContainer';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../features/Channel/TextChannel/Thunks/sendMessage';
import { fetchMessages } from '../../../../features/Channel/TextChannel/Thunks/fetchMessages';
import {
  setReplyTo,
  setTextChannelPos,
  setTextForTextChannel
} from '../../../../features/Channel/TextChannel/textChannelSlice';
import { ChannelBackground } from '../../../../components/ChannelBackground/ChannelBackground';
import { setLastReadStatus } from '../../../../features/Notifications/notificationsSlice';
import { updateLastReadStatus } from '../../../../features/Notifications/Thunks/updateLastReadStatus';
import { useSearchParams } from 'react-router-dom';
import { triggerAlert } from '../../../../features/Alerts/alertsSlice';

export const TextChannel = ({ channel }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const {
    messages,
    loading,
    loadingMore,
    error,
    sending,
    noMoreMessages,
    replyTo,
    text
  } = useSelector(state => state.textChannelSlice);

  const [showBackground, toggleShowBackground] = React.useState(false);

  const [images, setImages] = React.useState([]);          // ← multiple files

  const [color, setColor] = React.useState(null);

  const { user_id } = useSelector(state => state.accountSlice.account);
  const users = useSelector(state => state.serverUsersSlice.users);
  const permissions = useSelector(
    state => state.serverPermissionsSlice?.permissions[users[user_id]?.server_group]
  );
  const position = useSelector(state => state.textChannelSlice.textChannelPos[channel]);
  const channelDetails = useSelector(state => state.channelsSlice.channels[channel]);

  const handleSetImages = (files, color) => {

    if (files.length > 6) dispatch(triggerAlert('Cannot upload more than 6 images at a time', 'error'));

    setImages(files.slice(0, 6));

    setColor(color);

  }

  // ─── Sending ─────────────────────────────────────────────────────────────────
  const handleSend = () => {

    if (sending) return;

    if (!text.trim().length && images.length === 0) return;
    console.log(color)
    // build payload
    const payload = {
      user_id,
      channel_id: channel,
      reply_to: replyTo,
      text: text.trim(),
      color
    };

    // attach single vs multiple
    if (images.length === 1) {
      payload.image = images[0];
    } else if (images.length > 1) {
      payload.images = images;
    }

    dispatch(sendMessage(payload));

    // clear local state
    setImages([]);

    dispatch(setTextForTextChannel(''));

    setColor(null);
  };

  // ─── Pagination ───────────────────────────────────────────────────────────────
  const loadMoreMessages = () => {
    if (loadingMore || loading || noMoreMessages) return;
    const last_message_id = messages[messages.length - 1]?.message_id;
    dispatch(
      fetchMessages({
        last_message_id,
        channel_id: channel,
        message_id: searchParams.get('message')
      })
    );
  };

  const saveTextChannelPos = data => {
    dispatch(setTextChannelPos(data));
  };

  // ─── Effects ──────────────────────────────────────────────────────────────────
  React.useEffect(() => {
    requestAnimationFrame(() => toggleShowBackground(true));
  }, []);

  React.useEffect(() => {
    dispatch(setLastReadStatus(channel));
  }, [dispatch, messages, channel]);

  React.useEffect(() => {
    return () => {
      if (channel) {
        dispatch(updateLastReadStatus(channel));
      }
    };
  }, [channel, dispatch]);

  const clearReplyTo = () => dispatch(setReplyTo(null));

  return (
    <TextChannelProvider key={channel} channel={channel}>
      <ChatContainer
        id={channel}
        position={position?.position}
        returnPos={saveTextChannelPos}
        key={channel}
        users={users}
        loadingMore={loadingMore}
        loadMoreMessages={loadMoreMessages}
        sending={sending}
        send={handleSend}
        messages={messages}
        error={error}
        loading={loading}
        setImage={handleSetImages}             // ← now passes array setter
        setValue={value => dispatch(setTextForTextChannel(value))}
        value={text}
        replyTo={replyTo}
        clearReplyTo={clearReplyTo}
        placeholder={`Post in ${channelDetails?.channel_name}`}
        noMoreMessages={noMoreMessages}
        name={channelDetails?.channel_name}
        disableInput={!permissions?.user_can_post_in_text_channels}
        reply={message => dispatch(setReplyTo(message))}
      />
      {showBackground && <ChannelBackground {...channelDetails} />}
    </TextChannelProvider>
  );
};
