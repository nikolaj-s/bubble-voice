// src/contexts/GlobalVolumeContext.jsx
import { createContext, useState, useEffect, useCallback, useContext } from 'react';

const GlobalVolumeContext = createContext({
  volumes: {},                    // { [userId]: volumePercent }
  changeVolume: (userId, vol) => {}
});

export const GlobalVolumeProvider = ({ children }) => {
  // Initialize from localStorage
  const [volumes, setVolumes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('audio-volumes') || '{}');
    } catch {
      return {};
    }
  });

  // Persist when volumes change
  useEffect(() => {
    localStorage.setItem('audio-volumes', JSON.stringify(volumes));
  }, [volumes]);

  const changeVolume = useCallback((userId, volume) => {
    const clamped = Math.min(Math.max(volume, 0), 2.5);
    setVolumes(prev => ({ ...prev, [userId]: clamped }));
  }, []);

  return (
    <GlobalVolumeContext.Provider value={{ volumes, changeVolume }}>
      {children}
    </GlobalVolumeContext.Provider>
  );
};

export const useGlobalVolume = () => {
    const context = useContext(GlobalVolumeContext);

    return context;
}