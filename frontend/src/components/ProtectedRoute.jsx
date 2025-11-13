import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const access = localStorage.getItem(ACCESS_TOKEN);
      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (access || refresh) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <div>Verificando sesión...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
