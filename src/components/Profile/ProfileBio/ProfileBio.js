import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileBio.module.css';
import { Markdown } from '../../Markdown/Markdown';

const ProfileBio = ({ bio = "" }) => {

  return (
    <div
      style={{
        padding: bio.trim().length === 0 ? 0 : undefined,
      }}
      className={styles.userBio}
    >
      <div className={styles.bioText}>
        <Markdown text={bio} />
      </div>
    </div>
  );
};

ProfileBio.propTypes = {
  bio: PropTypes.string,
};

export default ProfileBio;
