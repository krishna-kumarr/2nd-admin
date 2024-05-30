import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const EmployerRequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
  
    const authToken = localStorage.getItem("eToken");
    const queryParams = new URLSearchParams(window.location.search);
  
  
    return authToken !== null ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
}

export default EmployerRequireAuth
