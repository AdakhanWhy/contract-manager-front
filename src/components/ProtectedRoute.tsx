import { Navigate, useLocation } from "react-router-dom";


interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 