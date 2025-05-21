
import styles from './MiniUserPreview.module.css';

import { Plus } from 'lucide-react';

import { ImageComponent } from '../Image/Image';

export const MiniUserPreview = ({users = []}) => {
  return (
    <div className={styles.usersWrapper}>
    {users.map((user, key) => {

    if (key > 6) return null;

    if (key === 6) {
        return (
        <Plus color="var(--text-color)" />
        )
    }
    return (
        <div key={user._id} className={styles.userImage}>
        <ImageComponent src={user.user_image} />
        </div>
    )
    })}
    </div>
  )
}
