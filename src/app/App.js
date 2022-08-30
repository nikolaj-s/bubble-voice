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
import { handleUpdateAvailable } from './appSlice';
import { fetchSavedAppAudioSettings } from '../features/settings/soundEffects/soundEffectsSlice';

function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const primaryColor = useSelector(selectPrimaryColor);

  const loggedIn = useSelector(selectLoggedIn);

  const signedUp = useSelector(selectSignedUp);

  const retryState = useSelector(selectRetryState);

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
    })

    await fetchAppearanceSettings().then(data => {
      if (!data || !data.type) return;
      dispatch(toggleDarkMode(data))
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
    // eslint-disable-next-line
  }, [loggedIn, retryState, signedUp])

  // handle listen for update
  React.useEffect(() => {
    setTimeout(() => {
      let ipcRenderer;

      try {

        ipcRenderer = window.require('electron').ipcRenderer;

        ipcRenderer.on('update-downloaded', () => {
            
          ipcRenderer.removeListeners('update-downloaded');

          dispatch(handleUpdateAvailable(true));
        
        })

      } catch (error) {
        console.log("using web version")
      }

      return () => {
        if (ipcRenderer) {
          ipcRenderer.removeListeners('update-downloaded');
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