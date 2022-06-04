// library's
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPrimaryColor } from '../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { Routes, Route, useNavigate } from 'react-router-dom';

// components
import { SignIn } from '../features/LoggingIn/signIn/signIn';
import { SplashScreen } from '../features/splashScreen/splashScreen';
import { TitleBar } from '../features/titleBar/titleBar';
import { Home } from '../features/home/Home';
import { SignUp } from '../features/LoggingIn/signUp/SignUp';

// state
import { initializeApplication, selectLoadingAppState } from './appSlice';

// style
import './App.css';
import { getMediaDevices } from '../features/settings/appSettings/voiceVideoSettings/voiceVideoSettingsSlice';


function App() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const primaryColor = useSelector(selectPrimaryColor);

  const loadingAppState = useSelector(selectLoadingAppState);

  React.useEffect(() => {
    
    dispatch(initializeApplication());

    dispatch(getMediaDevices());

    navigate("/signin")

  }, [])

  return (
    <div style={{backgroundColor: primaryColor}} className="App">
      <TitleBar />
      <SplashScreen />
      <Routes>
        <Route path={"/dashboard/*"} element={<Home />} />
        <Route path={"/signin"} element={<SignIn /> } />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;