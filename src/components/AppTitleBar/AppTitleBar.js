import React from 'react';
import { useSelector } from 'react-redux';
import styles from './AppTitleBar.module.css';
import { Minus, Square, X } from 'lucide-react';
import { Logo } from '../Icons/Bubble/Logo';
import { ImageComponent } from '../ui/Image/Image';

const AppTitleBar = ({ title = "Bubble" }) => {


  const { name: osName } = useSelector(state => state.osSlice);

  const {name, banner, server_id} = useSelector(state => state.serverDetailsSlice);

  if (!window?.electron?.ipcRenderer) return null;

  const handleWindow = (action) => {
    window.electron.ipcRenderer.send(action);
  };

  const isMac = osName === 'macOS';

  return (
    <div className={styles.titleBar}>
      <div className={styles.spacer} />
      <div className={styles.centerTitle}>
        <div className={styles.icon}>
          {server_id ? <ImageComponent src={banner} /> : <Logo />}
        </div>
        {name || title}
      </div>
      <div className={styles.controls}>
        {isMac ? (
         null
        ) : (
          <>
            <button onClick={() => handleWindow('min')}><Minus size={20} color='var(--text-color)' /></button>
            <button onClick={() => handleWindow('max')}><Square size={14} color='var(--text-color)' /></button>
            <button onClick={() => handleWindow('close')}><X size={20} color='var(--text-color)' /></button>
          </>
        )}
      </div>
      
    </div>
  );
};

export default AppTitleBar;
