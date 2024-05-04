import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem("UserDetails");
  console.log(user)

  if (!user || user === 'undefined') {
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
