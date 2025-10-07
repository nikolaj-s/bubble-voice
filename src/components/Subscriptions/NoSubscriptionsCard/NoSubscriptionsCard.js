import React from "react";
import styles from "./NoSubscriptionsCard.module.css";
import { BellPlus } from "lucide-react";

const NoSubscriptionsCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <BellPlus className={styles.icon} size={48} />
      </div>
      <h2 className={styles.title}>No Subscriptions Yet</h2>
      <p className={styles.text}>
        You can <strong>subscribe</strong> to any text channel by right-clicking
        on it and selecting <strong>"Subscribe"</strong>.
      </p>
      <p className={styles.text}>
        Once subscribed, you’ll see <strong>recent media and updates</strong> from
        your favorite channels right here on your dashboard.
      </p>
    </div>
  );
};

export default NoSubscriptionsCard;
