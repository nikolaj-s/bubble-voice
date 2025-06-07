
import { MicroUserDisplay } from '../ui/MicroUserDisplay/MicroUserDisplay'

import styles from './UserIndicator.module.css';
import { Subtitle } from '../ui/Titles/Subtitle/Subtitle';
import DateTimeDisplay from '../ui/DateTimeDisplay/DateTimeDisplay';
import { useSelector } from 'react-redux';

export const UserIndicator = ({user_id, date, position = 'bottom', marginLeft, label}) => {

    const user = useSelector(state => state.serverUsersSlice.users[user_id]) || {};

    if (!user_id) return null;

    return (
        <div className={styles.addedBy} >
            <div style={{marginLeft, borderColor: user.color}} className={`${styles.addedByIndicator} ${styles[position]}`} />
            <Subtitle>{label}</Subtitle>
            <MicroUserDisplay user_id={user_id} />
            {date && (<DateTimeDisplay date={date} />)}
        </div>
    )
}
