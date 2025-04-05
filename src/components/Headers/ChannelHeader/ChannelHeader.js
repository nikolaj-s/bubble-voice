import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChannelHeader.module.css';
import { Hash, Volume1 } from 'lucide-react';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';

const ChannelHeader = ({ channel_name, channel_description, channel_type, channel_icon }) => {
  // Determine which icon to display if no custom channel_icon is provided.
  const renderDefaultIcon = () => {
    if (channel_type === 'voice') {
      return <Volume1 className={styles.defaultIcon} />;
    } else if (channel_type === 'text') {
      return <Hash className={styles.defaultIcon} />;
    }
    return null;
  };

  return (
    <header className={styles.header}>
      <div className={styles.iconWrapper}>
        {channel_icon ? (
          <img
            src={channel_icon}
            alt={`${channel_name} icon`}
            className={styles.channelIcon}
          />
        ) : (
          renderDefaultIcon()
        )}
      </div>
      
      <h1 className={styles.channelName}>{channel_name}</h1>
      <PillSpacer verticle={true} />
      <p
        className={styles.channelDescription}
        onClick={() => console.log("Channel description clicked")}
      >
        {channel_description}
      </p>
    </header>
  );
};

ChannelHeader.propTypes = {
  channel_name: PropTypes.string.isRequired,
  channel_description: PropTypes.string.isRequired,
  channel_type: PropTypes.string.isRequired,
  channel_icon: PropTypes.string,
};

export default ChannelHeader;
