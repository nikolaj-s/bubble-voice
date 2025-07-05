import React, { useState } from 'react';

import {motion, AnimatePresence} from 'framer-motion'

import styles from './MediaInfo.module.css'
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { Info } from 'lucide-react';

export const MediaInfo = ({data, width = 30, height = 30}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(prev => !prev);

  return (
    <motion.div
      className={styles.panel}
      initial={{ height: height }}
      animate={{ height: expanded ? 'auto' : height }}
     
    >
      <div className={styles.topBar}>
        {data && (
          <IconButton Icon={Info} width={width} height={height} position='bottom' title={'Info'} onClick={toggleExpanded} />
        )}
      </div>

      <AnimatePresence>
        {expanded && data && (
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.meta}>
              <div><strong>Query:</strong> {data.query}</div>
              <div><strong>Tags:</strong> {data.tags}</div>
              <div><strong>Type:</strong> {data.type}</div>
              <div><strong>NSFW:</strong> {data.nsfw ? 'Yes' : 'No'}</div>
              <div><strong>Interactions:</strong> {data.interactions}</div>
              <div><strong>Date:</strong> {new Date(data.date).toLocaleString()}</div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
