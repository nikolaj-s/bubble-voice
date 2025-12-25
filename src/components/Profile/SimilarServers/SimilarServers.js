import React from 'react';
import { Card } from '../../ui/Wrappers/Card/Card';
import { useSelector } from 'react-redux';
import styles from './SimilarServers.module.css';
import { Subtitle } from '../../ui/Titles/Subtitle/Subtitle';

export const SimilarServers = ({ joined_servers = [] }) => {
  const [similarServers, setSimilarServers] = React.useState([]);
  const { servers } = useSelector((state) => state.serversSlice);

  React.useEffect(() => {
    const l_servers = servers.filter((server) => joined_servers?.includes(server._id));
    setSimilarServers(l_servers);
  }, [joined_servers, servers]);

  return (
    <Card className={styles.card} style={{ width: 'calc(100% - 10px)', margin: '0 auto' }}>
      <div className={styles.headerRow}>
        <Subtitle>Bubbles You Also Belong To</Subtitle>
        {!!similarServers?.length && (
          <span className={styles.count}>{similarServers.length}</span>
        )}
      </div>

      <div className={styles.row}>
        {similarServers.map((server) => (
          <div key={server._id} className={styles.serverPill} title={server.server_name}>
            <img
              src={server.server_banner}
              alt={`${server.server_name} banner`}
              className={styles.avatar}
              loading="lazy"
            />
            <span className={styles.name}>{server.server_name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
