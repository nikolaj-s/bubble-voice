import React from 'react'
import { Card } from '../../ui/Wrappers/Card/Card'
import { useSelector } from 'react-redux'

import styles from './SimilarServers.module.css'; // Optional CSS module for styling
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';


export const SimilarServers = ({joined_servers = []}) => {

    const [similarServers, setSimilarServers] = React.useState([]);

    const {servers} = useSelector(state => state.serversSlice);

    React.useEffect(() => {

        const l_servers = servers.filter(server => joined_servers?.includes(server._id));

        setSimilarServers(l_servers);

    }, [joined_servers, servers]);


    return (
        <Card style={{width: 'calc(100% - 10px)', margin: '0 auto'}}>
            <Subtitle>Bubbles You Also Belong To</Subtitle>
            <div className={styles.row}>
                {similarServers.map(server => (
                <div key={server._id} className={styles.miniServerCard}>
                    <img
                    src={server.server_banner}
                    alt={`${server.server_name} banner`}
                    className={styles.avatar}
                    />
                    <span className={styles.name} title={server.server_name}>
                    {server.server_name}
                    </span>
                </div>
                ))}
            </div>
        </Card>
    )
}
