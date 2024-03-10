import { Navigate } from "react-router-dom";
import { useLike } from "../context/like.context";

const ProtectedRoute = ({ children, onlyAdmin = false }) => {
  const { userOn } = useLike();
  if (!userOn || (onlyAdmin && !userOn.isAdmin)) {
    return <Navigate to={"/sign-in"} />;
  }
  return children;
};

export default ProtectedRoute;
