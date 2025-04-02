import React, { useState, useEffect } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import { API_URL } from "../../../../lib/Validation";

import { getToken } from "../../../../lib/services/authService";

import ErrorMessage from "../../../Error/ErrorMessage/ErrorMessage";

import LoadingSpinnerCard from "../../../ui/Loading/LoadingSpinnerCard/LoadingSpinnerCard";

const ProtectedFormWrapper = ({ children }) => {

  const serverId = useSelector(state => state.serverDetailsSlice.server_id);

  const [loading, setLoading] = useState(true);

  const [isAuthorized, setIsAuthorized] = useState(null);

  const [permissions, setPermissions] = useState({});

  const [error, setError] = useState(null);

  const checkPermissions = async () => {
    const token = getToken();

    if (!token) {
      setError("No authentication token found.");
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/permissions/${serverId}`, {
        headers: { TOKEN: token },
      });
      
      if (response.data?.permissions.admin) {

        const adminPermissions = new Proxy({}, {
          get: () => true, // Always returns true for any accessed key
        });

        setPermissions(adminPermissions);
        setIsAuthorized(true);
        return;
      }

      if (response.data.permissions) {
        setIsAuthorized(true);
        setPermissions(response.data.permissions);
      } else {
        setIsAuthorized(false);
        setError("You are not authorized to access this page.");
      }
    } catch (err) {
      setError("An error occurred while checking permissions.");
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!serverId) {
      setLoading(false);
      setIsAuthorized(false);
    } else {
      checkPermissions();
    }
  }, [serverId]);

  if (loading) return <LoadingSpinnerCard />;

  if (isAuthorized === false) return <ErrorMessage message={error} />;

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {permissions: permissions})
  })
  
  return <>{childrenWithProps}</>;
};

export default ProtectedFormWrapper;

