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
import { Disconnected } from '../components/disconnected/Disconnected';

// state
import { incrementLoadingPercentage, selectRetryState } from '../features/initializingAppScreen/initializingAppScreenSlice';
import { getMediaDevices } from '../features/settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';
import { selectPrimaryColor, toggleDarkMode } from '../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { fetchAccount } from '../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectLoggedIn } from '../features/LoggingIn/signIn/signInSlice';
import { selectSignedUp } from '../features/LoggingIn/signUp/signUpSlice';

// style
import './App.css';
import { fetchAppearanceSettings, fetchKeyBinds, fetchSavedUserPrefs, initKeyBinds } from '../util/LocalData';
import { setSavedKeyCodes } from '../features/settings/appSettings/keyBindSettings/keyBindSettingsSlice';
import { handleUpdateAvailable, updateCurrentAppVersion } from './appSlice';
import { fetchSavedAppAudioSettings } from '../features/settings/soundEffects/soundEffectsSlice';

function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const primaryColor = useSelector(selectPrimaryColor);

  const loggedIn = useSelector(selectLoggedIn);

  const signedUp = useSelector(selectSignedUp);

  const retryState = useSelector(selectRetryState);

  const preventMouseDefaults = (e) => {
    if (e.button === 3 || e.button === 4) {
      e.preventDefault();
    }
  }

  const __init__ = async () => {

    dispatch(incrementLoadingPercentage({percent: 10, state: "Fetching Media Devices"}));

    dispatch(getMediaDevices());

    dispatch(fetchSavedAppAudioSettings());
    
    await fetchSavedUserPrefs();
    
    // fetch locally stored settings
    await fetchKeyBinds().then((binds) => {
      
      if (!binds) return;

      initKeyBinds(binds)

      dispatch(setSavedKeyCodes(binds))

      return;
    })

    await fetchAppearanceSettings().then(data => {
      if (!data || !data.type) return;

      dispatch(toggleDarkMode(data))

      return;
    })

    dispatch(incrementLoadingPercentage({percent: 40, state: "Fetching Account"}));

    setTimeout(() => {

      dispatch(fetchAccount());

      dispatch(incrementLoadingPercentage({percent: 60, state: "Loading Account Details"}));
    
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
  }, [loggedIn, retryState, signedUp])

  // handle listen for update
  React.useEffect(() => {
    console.log('cheking for updates')
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
        
        })

        ipcRenderer.on('update not available', () => {
          console.log('no update available');
        })

        ipcRenderer.on('error updating', (data) => {
          console.log(data)
        })

      } catch (error) {
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
      }
    }, 10)
  }, [])

  return (
    <div style={{backgroundColor: primaryColor}} className="App">
      <TitleBar />
      <SplashScreen />
      <Disconnected />
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