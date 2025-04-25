import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBio.module.css';
import { useDispatch } from 'react-redux';
import { setExpandedImage } from '../../../features/Media/ExpandedImage/expandedImageSlice';
import { setOverlay } from '../../../features/Overlay/overlaySlice';

const ProfileBio = ({ bio = "" }) => {

  const dispatch = useDispatch();

  const imageRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif)\S*)/gi;

  const parts = bio.split(imageRegex);

  const images = parts.filter(part => part.match(imageRegex));
  
  const texts = parts.filter(part => !part.match(imageRegex) && part.trim() !== '');

  const expandImage = (image) => {
    dispatch(setExpandedImage({image}));

    dispatch(setOverlay('expandImage'));
  }

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
            onClick={() => {expandImage(url)}}
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
