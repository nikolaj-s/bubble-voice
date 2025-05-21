import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useUnreadStatus = ({channel_id, latest_message_at, channel_type}) => {
  const [unread, setUnread] = useState(false);
   
  const last_read = useSelector(
    state => state.notificationsSlice.last_read_status[channel_id]
  );

  useEffect(() => {

    if (channel_type !== 'text') return;

    if (!last_read) {
      setUnread(true);
    } else {
      const latest = new Date(latest_message_at);
      const last = new Date(last_read?.last_read_at);

      setUnread(latest > last);
    }
  }, [channel_id, latest_message_at, last_read, channel_type]);

  return unread;
};

export default useUnreadStatus;
