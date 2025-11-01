import { Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { LandingPage } from "../../../pages/LandingPage/LandingPage";
import React from "react";

const ProtectedRoute = ({ children, useLandingPage }) => {

  const jwt = useSelector(state => state.authSlice.token);

  const loc = useLocation();

  React.useEffect(() => {

    if (!jwt) {
      const full = loc.pathname + loc.search + loc.hash;

      sessionStorage.setItem('redirectURL', full);
    }

  }, [jwt])

  return jwt ? children : useLandingPage && !window?.electron ? <LandingPage /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
