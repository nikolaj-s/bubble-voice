// ConnectionDetailsCompact.jsx
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './ConnectionDetails.module.css';
import ConnectionLineGraph from './ConnectionLineGraph/ConnectionLineGraph';

const ConnectionDetails = ({
  ping,
  jitter,
  packetLossUp,
  packetLossDown,
  bitrateUp,
  bitrateDown,
  codec,
  connection,
  scales = {
    pingMax: 300,
    jitterMax: 100,
    lossMax: 10,
    bitrateUpMax: 6000,
    bitrateDownMax: 8000,
  },
}) => {

  return (
    <div className={styles.container}>
      <ConnectionLineGraph width={350} sample={{ping, jitter, packetLossDown, packetLossUp, bitrateDown, bitrateUp}} />
      <ul className={styles.list}>
        {codec && <li><span className={styles.k}>Codec</span><span className={styles.v}>{codec}</span></li>}
        {connection?.transport && <li><span className={styles.k}>Transport</span><span className={styles.v}>{connection.transport}</span></li>}
      </ul>
    </div>
  );
};

ConnectionDetails.propTypes = {
  ping: PropTypes.number,
  jitter: PropTypes.number,
  packetLossUp: PropTypes.number,
  packetLossDown: PropTypes.number,
  bitrateUp: PropTypes.number,
  bitrateDown: PropTypes.number,
  codec: PropTypes.string,
  connection: PropTypes.shape({
    transport: PropTypes.string,
    local: PropTypes.string,
    remote: PropTypes.string,
  }),
};

export default ConnectionDetails;
