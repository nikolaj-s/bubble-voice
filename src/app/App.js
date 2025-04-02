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

  React.useEffect(() => {

    try {

      const { ipcRenderer } = window.require('electron');
  
      ipcRenderer.on('platform-info', (event, platform) => {
        // Add platform-specific class to the body tag
       
        document.body.classList.add(platform);
      });    
  
    } catch (error) {
      return;
    }

  }, [])

  

  return (
    <Router>
      <div className={`App`}>
        <Routes>
          <Route path="/login" element={<BackSplash><Login /></BackSplash>} />
          <Route path="/signup" element={<BackSplash><Signup /></BackSplash>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/account-error" element={<FatalErrorPage />} />
          <Route path="/" element={<ProtectedRoute><Navigate to={'/dashboard'} /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;