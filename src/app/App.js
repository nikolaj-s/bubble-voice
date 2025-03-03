// library's
import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from '../components/Auth/ProtectedRoute/ProtectedRoute';

import { selectIsElectron } from '../features/App/appSlice';

// pages
import Login from '../pages/login/login';
import Signup from '../pages/signup/Signup';

import BackSplash from '../components/Misc/BackSplash/BackSplash';

import "./App.css";
import Dashboard from '../pages/dashboard/DashBoard';

function App() {

  const isElectron = useSelector(selectIsElectron);
  
  const Router = isElectron ? HashRouter : BrowserRouter;

  return (
    <Router>
      <div className={`App`}>
        <Routes>
          <Route path="/login" element={<BackSplash><Login /></BackSplash>} />
          <Route path="/signup" element={<BackSplash><Signup /></BackSplash>} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><></></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;