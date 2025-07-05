import React from 'react';
import { motion } from 'framer-motion';
import styles from './ServerCard.module.css';
import { useDispatch } from 'react-redux';
import { setSelectedServerToJoin } from '../../features/JoinServer/joinServerSlice';
import { setOverlay } from '../../features/Overlay/overlaySlice';
import { Banner } from '../Banner/Banner';
import { Card } from '../ui/Wrappers/Card/Card';
import TextButton from '../ui/Buttons/TextButton/TextButton';
import { Description } from '../ui/Description/Description';

const ServerCard = ({ server }) => {

  const dispatch = useDispatch();

  const { server_banner, server_name, _id, joined, welcome_message } = server;

  const onJoin = () => {
    dispatch(setSelectedServerToJoin(server));
    dispatch(setOverlay('joinServer'));
  }

  return (
    <Card style={{width: 300}}>
      <Banner image={server_banner} />
      <h3 className={styles.serverName}>{server_name}</h3>
      <Description description={welcome_message} limit={2} />
      <TextButton disabled={joined} action={() => {onJoin(_id)}} title={joined ? 'Joined' : 'Join Server'} />
    </Card>
  );
};

export default ServerCard;
