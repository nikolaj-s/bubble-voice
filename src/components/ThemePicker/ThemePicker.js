import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppearanceSettings } from '../../features/Settings/Appearance/appearanceSlice';
import { themes } from '../../features/Settings/Appearance/Themes/themes';
import styles from './ThemePicker.module.css';

const ThemePicker = () => {

  const dispatch = useDispatch();

  const currentTheme = useSelector(state => state.appearanceSlice.theme);

  return (
    <div className={styles.pickerWrapper}>
      {Object.entries(themes).map(([themeKey, themeValues]) => (
        <button
          key={themeKey}
          onClick={() => dispatch(setAppearanceSettings({name: 'theme', value: themeKey}))}
          className={`${styles.themeButton} ${currentTheme === themeKey ? styles.active : ''}`}
        >
          <div className={styles.previewBox}>
            <div
              className={styles.colorBlock}
              style={{ background: themeValues['--background-color'] }}
            />
            <div
              className={styles.colorBlock}
              style={{ background: themeValues['--primary-color'] }}
            />
            <div
              className={styles.colorBlock}
              style={{ background: themeValues['--accent-color'] }}
            />
          </div>
          <span className={styles.themeName}>{themeKey}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemePicker;
