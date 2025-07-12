import { useEffect, useState } from 'react';
import styles from './DeviceNotification.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMicrophone } from '../../features/Settings/Devices/deviceSlice';
import { Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TextButton from '../ui/Buttons/TextButton/TextButton';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import { togglePreference } from '../../features/AccountPreferences/accountPreferencesSlice';
import { updateAccountPreferences } from '../../features/AccountPreferences/Thunks/updateAccountPreferences';

export const DeviceNotification = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [newDevice, setNewDevice] = useState(null);
  const [lostDevice, setLostDevice] = useState(null);

  const microphones = useSelector(state => state.deviceSlice.microphones);
  const selectedMicrophone = useSelector(state => state.deviceSlice.selectedMicrophone);
  const disablePopup = useSelector(state => state.accountPreferencesSlice.disable_new_device_popup)

  useEffect(() => {
    if (disablePopup) return setVisible(false);

    const lastSeen = localStorage.getItem("lastMicIds");
    const oldIds = new Set(lastSeen ? JSON.parse(lastSeen) : []);

    const currentIds = microphones.map(d => d.deviceId);
    const currentSet = new Set(currentIds);
    const added = microphones.find(d => !oldIds.has(d.deviceId));

    localStorage.setItem("lastMicIds", JSON.stringify(currentIds));

    // 🔄 Detect newly added microphone
    if (added && added.deviceId !== selectedMicrophone?.deviceId) {
      setNewDevice(added);
      setLostDevice(null);
      setVisible(true);
      return;
    }

    // 🔄 Detect currently selected mic was removed
    if (
      selectedMicrophone &&
      !currentSet.has(selectedMicrophone.deviceId) &&
      microphones.length > 0
    ) {
      const suggested = microphones[0];
      setLostDevice({ lost: selectedMicrophone, suggested });
      setNewDevice(null);
      setVisible(true);
      return;
    }

    // Nothing to show
    setVisible(false);
  }, [microphones, disablePopup]);

  const handleSwitch = () => {
    const device = newDevice || lostDevice?.suggested;
    if (device) {
      dispatch(setMicrophone(device));
      setVisible(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleDontShowAgain = () => {
    dispatch(togglePreference('disable_new_device_popup'));
    dispatch(updateAccountPreferences());
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.popup}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        >
          <div className={styles.header}>
            <Mic size={20} />
            <span>
              {newDevice
                ? 'New Microphone Detected'
                : 'Current Microphone Unavailable'}
            </span>
            <IconButton Icon={X} title="Close" onClick={handleClose} />
          </div>

          <p className={styles.deviceName}>
            {newDevice?.label ||
              `Lost: ${lostDevice?.lost?.label} — Suggest: ${lostDevice?.suggested?.label}`}
          </p>

          <div className={styles.actions}>
            <TextButton 
            backgroundColor={'var(--card-background-color)'}
            title='Dont Show Again'
            action={handleDontShowAgain}
            />
            <TextButton
              title={
                 'Switch Device'
              }
              action={handleSwitch}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
