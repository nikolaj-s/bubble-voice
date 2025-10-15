// components/ConversationHeader.jsx
import styles from './ConversationHeader.module.css';
import { X } from 'lucide-react';
import IconButton from '../../ui/Buttons/IconButton/IconButton';
import { ImageComponent } from '../../ui/Image/Image';

const ConversationHeader = ({ user_image, display_name, onClose }) => {
  const hasData = user_image && display_name;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {hasData ? (
          <>
            <ImageComponent src={user_image} className={styles.avatar} />
            
            <span className={styles.name}>{display_name}</span>
          </>
        ) : (
          <>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonText} />
          </>
        )}
      </div>
      <IconButton 
      Icon={X}
      onClick={onClose}
      title={'Close'}
      position='left'
      />
      
    </header>
  );
};

export default ConversationHeader;