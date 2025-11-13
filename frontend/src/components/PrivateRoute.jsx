import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";

// El enfoque de PrivateRoute (la versión básica que te mostré antes) se limita a verificar si existe un token en localStorage.

function PrivateRoute({ children }) {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
