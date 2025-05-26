
import { useDispatch, useSelector } from 'react-redux';

import styles from './MicroUserDisplay.module.css';
import { ImageComponent } from '../Image/Image';

export const MicroUserDisplay = ({ user_id }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const viewUser = () => {

    }

    if (!user) return null;

    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <ImageComponent src={user.user_image} />
            </div>
            <span className={styles.name}>{user.display_name}</span>
        </div>
    );
};

