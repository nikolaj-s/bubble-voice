export const initialState = () => {
  const safeGet = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null ? value : fallback;
    } catch (err) {
      console.warn(`Corrupt localStorage item: "${key}", clearing it.`);
      localStorage.removeItem(key);
      return fallback;
    }
  };

  return {
    hideUsers: safeGet('hideUsers', false),
    hideCustomChannelIcons: safeGet('hideCustomChannelIcons', false),
    hideChannelBackgrounds: safeGet('hideChannelBackgrounds', false),
    useBlackVoiceChannelBackground: safeGet('useBlackVoiceChannelBackground', false),
    disableStreamAmbiance: safeGet('disableStreamAmbiance', false),
    theme: safeGet('theme', 'default'),
    fontSize: safeGet('fontSize', 14),
    maximumMediaHeight: safeGet('maximumMediaHeight', 350),
  };
};
