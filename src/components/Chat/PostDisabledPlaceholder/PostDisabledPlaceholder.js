import React from 'react';
import { Plus } from 'lucide-react';
import styles from './PostDisabledPlaceholder.module.css';

const PostDisabledPlaceholder = ({ channelName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Posting disabled in <strong>{channelName}</strong>
      </div>
    </div>
  );
};

export default PostDisabledPlaceholder;
