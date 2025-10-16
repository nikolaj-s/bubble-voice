
import PropTypes from 'prop-types';
import styles from './ContentPlaceholder.module.css';
import TextButton from '../../Buttons/TextButton/TextButton';

const ContentPlaceholder = ({ title, message, icon: Icon, action, actionTitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bubbleArt}>
        <div className={styles.bubble + ' ' + styles.bubble1}></div>
        <div className={styles.bubble + ' ' + styles.bubble2}></div>
        <div className={styles.bubble + ' ' + styles.bubble3}></div>
      </div>
      <div className={styles.content}>
        {Icon && (<Icon size={48} color={'var(--accent-color)'} />)}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{message}</p>
        {typeof action === 'function' && (<TextButton title={actionTitle} action={action} />)}
      </div>
    </div>
  );
};

ContentPlaceholder.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default ContentPlaceholder;
