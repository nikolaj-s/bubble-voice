import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ChannelHeader.module.css';
import { Hash, Pin, Volume2 } from 'lucide-react';
import { PillSpacer } from '../../ui/Spacers/PillSpacer/PillSpacer';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { useChannelMethods } from '../../../hooks/useChannelMethods';

const ChannelHeader = ({
  channel_name,
  channel_description,
  channel_type,
  channel_icon,
  channel_id,
  expandDescription = () => {},
}) => {
  const headerRef = useRef(null);
  const [width, setWidth] = useState(null);

  const {openPinnedMessages} = useChannelMethods();

  // Determine which icon to display if no custom channel_icon is provided
  const renderDefaultIcon = () => {
    if (channel_type === 'voice') {
      return <Volume2 className={styles.defaultIcon} />;
    }
    if (channel_type === 'text') {
      return <Hash className={styles.defaultIcon} />;
    }
    return null;
  };

  useEffect(() => {
    const target = document.getElementById('sectionTwo');
    console.log(target)
    if (!target) return;

    // Initial sync
    setWidth(target.offsetWidth);

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      onClick={expandDescription}
      className={styles.header}
      style={width ? {maxWidth: width } : undefined}
    >
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

      <PillSpacer verticle />

      <p className={styles.channelDescription}>
        {channel_description}
      </p>

      {channel_type === 'text' && <IconButton Icon={Pin} position='bottom' title={'View Pinned Messages'} onClick={() => {openPinnedMessages(channel_id)}} />}
    </header>
  );
};

ChannelHeader.propTypes = {
  channel_name: PropTypes.string,
  channel_description: PropTypes.string,
  channel_type: PropTypes.string,
  channel_icon: PropTypes.string,
  channel_id: PropTypes.string,
  expandDescription: PropTypes.func,
};

export default ChannelHeader;
