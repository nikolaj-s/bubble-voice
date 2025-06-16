// Context/AudioContextProvider.js
import React, { createContext, useContext } from 'react';

const AudioCtxContext = createContext(null);

export const AudioContextProvider = ({ children }) => {
  const ctx = React.useMemo(() => {
    const C = window.AudioContext || window.webkitAudioContext;
    return new C();
  }, []);
  return (
    <AudioCtxContext.Provider value={ctx}>
      {children}
    </AudioCtxContext.Provider>
  );
};

export const useAudioContext = () => {
  const ctx = useContext(AudioCtxContext);
  if (!ctx) throw new Error('AudioContextProvider missing');
  return ctx;
};
