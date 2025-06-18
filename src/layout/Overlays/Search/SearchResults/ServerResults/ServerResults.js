import styles from './ServerResults.module.css';
import ServerCard from '../../../../../components/ServerCard/ServerCard';
import { useDispatch } from 'react-redux';
import { setOverlay } from '../../../../../features/Overlay/overlaySlice';
import ContentPlaceholder from '../../../../../components/ui/Placeholders/ContentPlaceholder/ContentPlaceholder';
import { Search } from 'lucide-react';

export const ServerResults = ({servers}) => {

    const dispatch = useDispatch();

    const handleCreateBubble = () => {
        dispatch(setOverlay("createServer"));
    }

    return (
        <div className={styles.container}>
            {servers.length === 0 ?
            <ContentPlaceholder actionTitle={'Create A Bubble'} action={handleCreateBubble} icon={Search} title={'Your next bubble is just a search away'} message={'Explore new bubbles to connect with like-minded people!'} />
            :
            servers.map(server => {
                return <ServerCard server={server} key={server.server_id} />
            })}
        </div>
    )
}
