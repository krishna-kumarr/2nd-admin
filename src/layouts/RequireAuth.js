import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const authToken = localStorage.getItem("pToken");
  const queryParams = new URLSearchParams(window.location.search);

  if (authToken === null) {
    const jobID = queryParams.get("job_id");
    localStorage.setItem("job_id", jobID);
  }

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
