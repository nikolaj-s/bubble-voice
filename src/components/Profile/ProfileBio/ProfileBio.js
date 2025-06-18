import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBio.module.css';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import ReactMarkdown from 'react-markdown';

const ProfileBio = ({ bio = "" }) => {
  const dispatch = useDispatch();

  // Custom component for image markdown
  const components = {
    img: ({node, ...props}) => (
      <img
        {...props}
        className={styles.bioImage}
        style={{ cursor: 'pointer' }}
        onClick={() => dispatch(setExpandedImage({ image: props.src }))}
        alt={props.alt || 'User provided'}
      />
    )
  };

  return (
    <div
      style={{
        padding: bio.trim().length === 0 ? 0 : undefined,
      }}
      className={styles.userBio}
    >
      <div className={styles.bioText}>
        <ReactMarkdown components={components}>
          {bio}
        </ReactMarkdown>
      </div>
    </div>
  );
};

ProfileBio.propTypes = {
  bio: PropTypes.string,
};

export default ProfileBio;
