// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';

// components
import { SignIn } from '../features/LoggingIn/signIn/signIn';
import { SplashScreen } from '../components/splashScreen/splashScreen';
import { TitleBar } from '../features/titleBar/titleBar';
import { Dashboard } from '../features/dashBoard/Dashboard';
import { SignUp } from '../features/LoggingIn/signUp/SignUp';
import { InitializingAppScreen } from '../features/initializingAppScreen/InitializingAppScreen';
import { Verification } from '../features/LoggingIn/verification/Verification';

// state
import { incrementLoadingPercentage, selectRetryState } from '../features/initializingAppScreen/initializingAppScreenSlice';
import { getMediaDevices } from '../features/settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectGradient, selectPrimaryColor, selectScaleState, toggleOnMacOs, updatePersistedAppTheme } from '../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { fetchAccount } from '../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectLoggedIn } from '../features/LoggingIn/signIn/signInSlice';
import { selectSignedUp } from '../features/LoggingIn/signUp/signUpSlice';

// util
import { fetchKeyBinds, fetchSavedUserPrefs, fetchSocialData, initKeyBinds } from '../util/LocalData';
import { setSavedKeyCodes } from '../features/settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { handleUpdateAvailable, toggleInitApp, toggleMobileState, updateCurrentAppVersion } from './appSlice';
import { fetchSavedAppAudioSettings } from '../features/settings/soundEffects/soundEffectsSlice';
import { fetchMiscellaneousSettings, fetchSavedHardwareAcceleration, toggleAppFocus, toggleWebVersion } from '../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { fetchSavedCustomStatus } from '../features/server/ChannelRoom/UserStatus/UserStatusSlice';

// style
import './App.css';

import "./Mobile.css";

import "./Animations.css";
import { handleFetchPersistedMusicSettings } from '../features/server/ChannelRoom/Room/Music/MusicSlice';
import { clearCache } from '../util/ClearCaches';

function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const primaryColor = useSelector(selectPrimaryColor);

  const loggedIn = useSelector(selectLoggedIn);

  const signedUp = useSelector(selectSignedUp);

  const retryState = useSelector(selectRetryState);

  const gradient = useSelector(selectGradient);

  const handleOs = () => {
    try {

        const os = window.require('os');

        const isMac = os.platform() === "darwin";

        if (isMac) dispatch(toggleOnMacOs(true));

    } catch (err) {
      return;
    }
  }

  const preventMouseDefaults = (e) => {
    if (e.button === 3 || e.button === 4) {
      e.preventDefault();
    }
  }

  const __init__ = async () => {

    navigator.mediaSession.setActionHandler('play', function() { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('pause', function() { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('seekbackward', function() { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('seekforward', function() { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('previoustrack', function() { /* Code excerpted. */ });
    navigator.mediaSession.setActionHandler('nexttrack', function() { /* Code excerpted. */ });

    handleOs();

    dispatch(incrementLoadingPercentage({percent: 10, state: "Fetching Media Devices"}));

    dispatch(getMediaDevices());

    dispatch(fetchMiscellaneousSettings());

    dispatch(fetchSavedAppAudioSettings());

    dispatch(fetchSavedHardwareAcceleration());

    dispatch(fetchSavedCustomStatus());

    dispatch(handleFetchPersistedMusicSettings());
    
    await fetchSavedUserPrefs();

    await fetchSocialData();
    
    // fetch locally stored settings
    await fetchKeyBinds().then((binds) => {
      
      if (!binds) return;

      initKeyBinds(binds)

      dispatch(setSavedKeyCodes(binds))

      return;
    })

    dispatch(updatePersistedAppTheme());

    dispatch(incrementLoadingPercentage({percent: 40, state: "Fetching Account"}));

    setTimeout(() => {

      dispatch(fetchAccount());

      dispatch(incrementLoadingPercentage({percent: 60, state: "Loading Account Details"}));
    
      setTimeout(() => {
        dispatch(toggleInitApp());
      }, 100)
    }, 200)
    
  }

  React.useEffect(() => {

    navigate("/")
    
    __init__();
    // prevent mouse navigatio buttons
    window.addEventListener('mouseup', preventMouseDefaults);
    // eslint-disable-next-line

    return () => {
      window.removeEventListener('mouseup', preventMouseDefaults);
    }

  // eslint-disable-next-line
  }, [loggedIn, retryState, signedUp])

  // handle listen for update
  React.useEffect(() => {

    let update_interval;

    let ipcRenderer;
    
    setTimeout(() => {

      try {

        ipcRenderer = window.require('electron').ipcRenderer;

        ipcRenderer.send('get_app_ver');

        ipcRenderer.on('get_app_ver', (event, data) => {
          ipcRenderer.removeAllListeners('get_app_ver');
          
          dispatch(updateCurrentAppVersion(data.version));
        })

        ipcRenderer.send('check-for-updates');

        ipcRenderer.on("update-downloaded", () => {
          dispatch(handleUpdateAvailable(true));

          clearInterval(update_interval);
        })

        ipcRenderer.on('update-available', () => {
            console.log('update')
          dispatch(handleUpdateAvailable(true));

          clearInterval(update_interval);
        
        })

        ipcRenderer.on('update not available', () => {
          console.log('no update available');
        })

        ipcRenderer.on('error updating', (data) => {
          console.log(data)
        })

        update_interval = setInterval(() => {
          try {
      
            ipcRenderer.send('check-for-updates');
      
          } catch (error) {
            clearInterval(update_interval);
          }
        }, 3600000)

      } catch (error) {
        clearInterval(update_interval);
        dispatch(toggleWebVersion(true));
        console.log(error);
        console.log("using web version");
      }

    }, 10000)

    return () => {

      clearInterval(update_interval);
    }
  // eslint-disable-next-line
  }, [])

  const onResize = (e) => {
    
    if (e.target.innerWidth < 601 && (e.target.innerHeight / e.target.innerWidth) > 1) {

      dispatch(toggleMobileState(true));

    } else {

      dispatch(toggleMobileState(false));

    }
  
  }

  React.useEffect(() => {

    window.addEventListener('resize', onResize);

    window.onfocus = () => {
      dispatch(toggleAppFocus(true))
    }

    window.onblur = () => {
      dispatch(toggleAppFocus(false))
    }

    if (window.innerWidth < 601 && (window.innerHeight / window.innerWidth) > 1) {

      dispatch(toggleMobileState(true));

    } else {

      dispatch(toggleMobileState(false));

    }

    return () => {
      window.removeEventListener('resize', onResize);
    }

  }, [])

  let cacheInterval;

  React.useEffect(() => {

    clearInterval(cacheInterval);

    cacheInterval = setInterval(() => {

      clearCache();

    }, 900000)
    
    return () => {
      clearInterval(cacheInterval);
    }
  }, [])
  
  return (
    <div style={{background: gradient.gradient ? gradient.gradient : `linear-gradient(to top, ${primaryColor}, ${primaryColor})`}} className={`App`}>
      <TitleBar />
      <SplashScreen />
      <Routes>
        <Route path={"/"} element={<InitializingAppScreen />} />
        <Route path={"/dashboard/*"} element={<Dashboard key={'dashboard'} />} />
        <Route path={"/signin"} element={<SignIn key={'sign-in-screen'} /> } />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/verification"} element={<Verification /> } />
      </Routes>
    </div>
  );
}

export default App;