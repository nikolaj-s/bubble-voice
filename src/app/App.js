// library's
import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from '../components/Auth/ProtectedRoute/ProtectedRoute';

import { selectIsElectron } from '../features/App/appSlice';

// pages
import Login from '../pages/login/login';
import Signup from '../pages/signup/Signup';

import BackSplash from '../components/Misc/BackSplash/BackSplash';

import "./App.css";
import Dashboard from '../pages/dashboard/DashBoard';
import FatalErrorPage from '../pages/FatalErrorPage/FatalErrorPage';
import { useDetectOS } from '../hooks/useDetectOs';
import AppTitleBar from '../components/AppTitleBar/AppTitleBar';
import { useDisableNavigation } from '../hooks/useDisableNavigation';
import { useTrackMouseClick } from '../hooks/useTrackMouseClick';
import { InvitePage } from '../pages/invitePage/InvitePage';
import { AudioContextProvider } from '../context/AudioContext';
import { ResetPassword } from '../pages/resetPassword/ResetPassword';

function App() {

  const isElectron = useSelector(selectIsElectron);
  
  const Router = isElectron ? HashRouter : BrowserRouter;

  React.useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    
    setHeight();
    window.addEventListener("resize", setHeight);
  
    return () => window.removeEventListener("resize", setHeight);
  }, []);
  

  // application specific
  useDetectOS();

  useDisableNavigation();

//  useGlobalWindowFocusListener();

  useTrackMouseClick();
  
  return (
    <Router>
      <AudioContextProvider>
      <div className={`App`}>
        <AppTitleBar />
        <Routes>
          <Route path="/login" element={<BackSplash><Login /></BackSplash>} />
          <Route path="/signup" element={<BackSplash><Signup /></BackSplash>} />
          <Route path='/reset-password' element={<BackSplash><ResetPassword /></BackSplash>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/account-error" element={<FatalErrorPage />} />
          <Route path="/bubble-invite" element={<BackSplash><InvitePage /></BackSplash>} />
          <Route path="/" element={<ProtectedRoute><Navigate to={'/dashboard'} /></ProtectedRoute>} />
        </Routes>
      </div>
      </AudioContextProvider>
    </Router>
  );
}

export default App;