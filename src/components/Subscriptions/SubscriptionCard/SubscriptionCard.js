import React from "react";
import styles from "./SubscriptionCard.module.css";
import { MessageItem } from "../../Chat/MessageItem/MessageItem";
import { useNavigate } from "react-router";
import IconButton from "../../ui/Buttons/IconButton/IconButton";
import { Ellipsis } from "lucide-react";
import { triggerContext } from "../../../lib/services/helperFunctions";

const SubscriptionCard = ({ subscription }) => {

  const navigate = useNavigate();

  if (!subscription) return null;

  const {
    server_id,
    channel_id,
    messages = [],
    date,
  } = subscription;

  const serverName = server_id?.server_name || "Unknown Server";
  const channelName = channel_id?.channel_name || "Unknown Channel";

  const openChannel = () => {
    console.log(messages[0]?._id)
    navigate(`/dashboard/server/${server_id?._id}/channel/${channel_id?._id}?message=${messages[0]?._id}`)
  }

  return (
    <div data-context={JSON.stringify({...subscription, type: 'subscription'})} id={subscription?._id} onClick={openChannel} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.serverName}>{serverName}</div>
        <div className={styles.channelName}># {channelName}</div>
       
      </div>
      <div className={styles.more}>
          <IconButton 
          Icon={Ellipsis}
          onClick={(e) => {triggerContext(e, subscription?._id)}}
          title={'More'}
          />
        </div>
      <div className={styles.messages}>
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <MessageItem message={msg} inSearch={true} prevMessage={{}} users={{[msg?.user_id]: msg?.user}} />
          ))
        ) : (
          <div className={styles.noMessages}>No messages yet</div>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>
          Subscribed: {new Date(date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SubscriptionCard;
