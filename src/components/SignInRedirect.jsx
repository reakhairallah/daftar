import { Navigate, useLocation } from "react-router-dom";

export default function SignInRedirect() {
  const location = useLocation();
  return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
}
