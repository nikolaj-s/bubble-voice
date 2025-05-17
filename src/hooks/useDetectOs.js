import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOS } from '../features/Os/osSlice'; // adjust path if needed

export const useDetectOS = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const detectOS = async () => {
      try {
        if (window?.electron?.ipcRenderer?.invoke) {
          const result = await window.electron.ipcRenderer.invoke('GET_OS');
          dispatch(setOS({ name: result.name, platform: result.platform }));
        } else {
          dispatch(setOS({ name: 'Web', platform: 'web' }));
        }
      } catch (err) {
        console.error('Failed to detect OS:', err);
        dispatch(setOS({ name: 'Unknown', platform: 'unknown' }));
      }
    };

    detectOS();
  }, [dispatch]);
};
