import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServerCard.module.css';
import { useDispatch } from 'react-redux';
import { setSelectedServerToJoin } from '../../features/JoinServer/joinServerSlice';
import { setOverlay } from '../../features/Overlay/overlaySlice';

const ServerCard = ({ server }) => {

  const dispatch = useDispatch();

  const { server_banner, server_name, _id, joined } = server;

  const onJoin = () => {
    dispatch(setSelectedServerToJoin(server));
    dispatch(setOverlay('joinServer'));
  }

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.bannerContainer}>
        <img src={server_banner} alt={`${server_name} banner`} className={styles.banner} />
      </div>
      <h3 className={styles.serverName}>{server_name}</h3>
      
      <button
        className={`${styles.joinButton} ${joined ? styles.joined : ''}`}
        onClick={() => onJoin(_id)}
      >
        {joined ? 'Joined' : 'Join Server'}
      </button>
    </motion.div>
  );
};

export default ServerCard;
