
import { useDispatch, useSelector } from 'react-redux';

import styles from './MicroUserDisplay.module.css';
import { ImageComponent } from '../Image/Image';
import { setUserProfile } from '../../../features/UserProfile/userProfileSlice';
import { setClickPosition } from '../../../features/MousePosition/mousePositionSlice';

export const MicroUserDisplay = ({ user_id }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const viewUser = (e) => {

        e.stopPropagation();

        dispatch(setClickPosition({x: e.clientX, y: e.clientY}))

        dispatch(setUserProfile(user_id));

    }

    if (!user) return null;

    return (
        <div onClick={viewUser} className={styles.container}>
            <div className={styles.avatar}>
                <ImageComponent src={user.user_image} />
            </div>
            <span className={styles.name}>{user.display_name}</span>
        </div>
    );
};

