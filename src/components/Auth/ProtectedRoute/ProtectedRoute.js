import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

  const jwt = useSelector(state => state.authSlice.token);

  return jwt ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
