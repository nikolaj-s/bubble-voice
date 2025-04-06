import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDevices } from '../features/Settings/Devices/deviceSlice';

function useDeviceWatcher() {
  const dispatch = useDispatch();
  const previousDevicesRef = useRef([]);

  useEffect(() => {
    let isMounted = true;

    const handleDeviceChange = async () => {
      try {
        const newDevices = await navigator.mediaDevices.enumerateDevices();

        const oldIds = new Set(previousDevicesRef.current.map(d => d.deviceId));
        const newIds = new Set(newDevices.map(d => d.deviceId));

        const added = newDevices.filter(d => !oldIds.has(d.deviceId));
        const removed = previousDevicesRef.current.filter(d => !newIds.has(d.deviceId));

        if (added.length > 0) {
          console.log('Devices added:', added);
        }

        if (removed.length > 0) {
          console.log('Devices removed:', removed);
        }

        previousDevicesRef.current = newDevices;

        dispatch(fetchDevices());
      } catch (err) {
        console.warn('Error during device change handling:', err);
      }
    };

    const setup = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        if (isMounted) {
          previousDevicesRef.current = devices;
        }
        navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
      } catch (err) {
        console.warn('Error setting up device watcher:', err);
      }
    };

    setup();

    return () => {
      isMounted = false;
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, [dispatch]);
}

export default useDeviceWatcher;
