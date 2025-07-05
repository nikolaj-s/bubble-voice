import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServerWelcomeMessage.module.css';
import { Markdown } from '../../Markdown/Markdown';
import { Card } from '../../ui/Wrappers/Card/Card';
import { Banner } from '../../Banner/Banner';

const ServerWelcomeMessage = ({
  display_name,
  server_name,
  welcome_message,
  server_banner,
}) => {
  // Use the provided welcome message or fallback to a default message.
  const welcomeMessage = `Welcome ${display_name || ''} to ${server_name || 'Bubble'}`;

  return (
    <Card>
      {server_banner && (
        <Banner image={server_banner} height={150} />
      )}
      <div className={styles.welcomeMessageText}>
        <h3>{welcomeMessage}</h3>
        {welcome_message && <Markdown text={welcome_message} />}
      </div>
    </Card>
  );
};

ServerWelcomeMessage.propTypes = {
  display_name: PropTypes.string,
  server_name: PropTypes.string,
  server_welcome_message: PropTypes.string,
  server_banner: PropTypes.string,
};

export default ServerWelcomeMessage;

