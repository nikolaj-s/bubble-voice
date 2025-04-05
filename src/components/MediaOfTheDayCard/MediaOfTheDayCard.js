import React from 'react';
import PropTypes from 'prop-types';
import { Image, Video, Camera } from 'lucide-react';
import styles from './MediaOfTheDayCard.module.css';

const MediaOfTheDayCard = ({ title, query, tags, mediaUrl, type = 'image' }) => {
  const Icon = type === 'video' ? Video : type === 'camera' ? Camera : Image;

  return (
    <div className={styles.mediaCard}>
      <div className={styles.mediaContent}>
        {type === 'video' ? (
          <video src={mediaUrl} autoPlay loop muted className={styles.media} />
        ) : (
          <img src={mediaUrl} alt={title} className={styles.media} />
        )}

        <div className={styles.mediaTitle}>
          <Icon size={20} style={{ marginRight: 8 }} />
          <span>{title}</span>
        </div>
      </div>

      <div className={styles.mediaFooter}>
        <div className={styles.mediaQuery}>
          Media found related to <strong>{query}</strong>
        </div>
        <div className={styles.mediaTags}>
          {tags.map((tag, idx) => (
            <span className={styles.mediaTag} key={idx}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

MediaOfTheDayCard.propTypes = {
  title: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  mediaUrl: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['image', 'video', 'camera']),
};

MediaOfTheDayCard.defaultProps = {
  tags: [],
  type: 'image',
};

export default MediaOfTheDayCard;
