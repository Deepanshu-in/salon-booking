import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { token, role } = useContext(authContext);
  const isAllowed = allowedRoles.includes(role);

  useEffect(() => {
    if (!isAllowed) {
      toast.warning("Please log in or register to access this page");
    }
  }, [isAllowed]);

  const accessibleRoutes =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoutes;
};

export default ProtectedRoutes;
