import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServerWelcomeMessage.module.css';
import { Markdown } from '../../Markdown/Markdown';

const ServerWelcomeMessage = ({
  display_name,
  server_name,
  welcome_message,
  server_banner,
}) => {
  // Use the provided welcome message or fallback to a default message.
  const welcomeMessage = `Welcome ${display_name || ''} to ${server_name || 'Bubble'}`;

  return (
    <div className={styles.serverWelcomeMessage}>
      {server_banner && (
        <div className={styles.bannerContainer}>
          <img
            src={server_banner}
            alt={`${server_name} banner`}
            className={styles.serverBanner}
          />
        </div>
      )}
      <div className={styles.welcomeMessageText}>
        <h3>{welcomeMessage}</h3>
        {welcome_message && <Markdown text={welcome_message} />}
      </div>
    </div>
  );
};

ServerWelcomeMessage.propTypes = {
  display_name: PropTypes.string,
  server_name: PropTypes.string,
  server_welcome_message: PropTypes.string,
  server_banner: PropTypes.string,
};

export default ServerWelcomeMessage;

