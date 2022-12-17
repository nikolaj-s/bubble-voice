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
import { selectPrimaryColor, selectRgbBackGround, updatePersistedAppTheme } from '../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { fetchAccount } from '../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectLoggedIn } from '../features/LoggingIn/signIn/signInSlice';
import { selectSignedUp } from '../features/LoggingIn/signUp/signUpSlice';

// style
import './App.css';
import { fetchKeyBinds, fetchSavedUserPrefs, initKeyBinds } from '../util/LocalData';
import { setSavedKeyCodes } from '../features/settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { handleUpdateAvailable, toggleInitApp, updateCurrentAppVersion } from './appSlice';
import { fetchSavedAppAudioSettings } from '../features/settings/soundEffects/soundEffectsSlice';
import { fetchMiscellaneousSettings, fetchSavedHardwareAcceleration } from '../features/settings/appSettings/MiscellaneousSettings/MiscellaneousSettingsSlice';
import { fetchSavedCustomStatus } from '../features/server/ChannelRoom/UserStatusBar/UserStatusSlice';

function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const primaryColor = useSelector(selectPrimaryColor);

  const loggedIn = useSelector(selectLoggedIn);

  const signedUp = useSelector(selectSignedUp);

  const retryState = useSelector(selectRetryState);

  const rgbBackground = useSelector(selectRgbBackGround);

  const preventMouseDefaults = (e) => {
    if (e.button === 3 || e.button === 4) {
      e.preventDefault();
    }
  }

  const __init__ = async () => {

    dispatch(incrementLoadingPercentage({percent: 10, state: "Fetching Media Devices"}));

    dispatch(getMediaDevices());

    dispatch(fetchMiscellaneousSettings());

    dispatch(fetchSavedAppAudioSettings());

    dispatch(fetchSavedHardwareAcceleration());

    dispatch(fetchSavedCustomStatus());
    
    await fetchSavedUserPrefs();
    
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
    
    setTimeout(() => {

      let ipcRenderer;

      try {

        ipcRenderer = window.require('electron').ipcRenderer;

        ipcRenderer.send('get_app_ver');

        ipcRenderer.on('get_app_ver', (event, data) => {
          ipcRenderer.removeAllListeners('get_app_ver');
          
          dispatch(updateCurrentAppVersion(data.version));
        })

        ipcRenderer.send('check-for-updates');

        ipcRenderer.on('update-available', () => {
            
          ipcRenderer.removeAllListeners('update-downloaded');

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
        console.log(error)
        console.log("using web version")
      }

      return () => {
        if (ipcRenderer) {
          ipcRenderer.removeAllListeners('update available');
          ipcRenderer.removeAllListeners('update not available');
          ipcRenderer.removeAllListeners('error updating');
          ipcRenderer.removeAllListeners('get_app_ver');
        }

        clearInterval(update_interval);
      }
    }, 10)
    
  // eslint-disable-next-line
  }, [])

  return (
    <div style={!rgbBackground ? {backgroundColor: primaryColor} : null} className={`App ${rgbBackground ? 'rgb-background' : null}`}>
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