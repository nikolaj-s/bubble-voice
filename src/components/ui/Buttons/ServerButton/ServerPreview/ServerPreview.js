import { ImageComponent } from '../../../Image/Image';
import { MiniUserPreview } from '../../../MiniUserPreview/MiniUserPreview';
import { Subtitle } from '../../../Titles/Subtitle/Subtitle';
import styles from './ServerPreview.module.css';

export const ServerPreview = ({server_name, active_users, recent_message, server_banner, color}) => {
    return (
        <div className={styles.container} style={{backgroundColor: color}}>
            <div className={styles.banner}>
                <ImageComponent src={server_banner} />
            </div>
            <h2 className={styles.name}>{server_name}</h2>

            <Subtitle>Active Users {active_users && (`- ${active_users?.length}`)}</Subtitle>
            {active_users && (<MiniUserPreview users={active_users} />)}
        </div>
    )
}
