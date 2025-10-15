import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { LandingPage } from "../../../pages/LandingPage/LandingPage";

const ProtectedRoute = ({ children, useLandingPage }) => {

  const jwt = useSelector(state => state.authSlice.token);

  return jwt ? children : useLandingPage && !window?.electron ? <LandingPage /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
