import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBio.module.css';

const ProfileBio = ({ bio = "" }) => {
  const imageRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif)\S*)/gi;

  const parts = bio.split(imageRegex);

  const images = parts.filter(part => part.match(imageRegex));
  
  const texts = parts.filter(part => !part.match(imageRegex) && part.trim() !== '');

  return (
    <div
      style={{
        padding: bio.trim().length === 0 ? null : 5,
      }}
      className={styles.userBio}
    >
      <div className={styles.bioImages}>
        {images.map((url, index) => (
          <img
            key={`img-${index}`}
            src={url}
            alt="User provided"
            className={styles.bioImage}
          />
        ))}
      </div>
      <div className={styles.bioText}>
        {texts.map((text, index) => (
          <span key={`text-${index}`}>{text}</span>
        ))}
      </div>
    </div>
  );
};

ProfileBio.propTypes = {
  bio: PropTypes.string,
};


export default ProfileBio;
