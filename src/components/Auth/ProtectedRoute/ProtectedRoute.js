import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../../../lib/services/authService";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
