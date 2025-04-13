import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { themes } from '../features/Settings/Appearance/Themes/themes';

export const useApplyTheme = () => {
  const currentTheme = useSelector(state => state.appearanceSlice.theme);

  useEffect(() => {
    const theme = themes[currentTheme] || themes.default;
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }, [currentTheme]);
};
