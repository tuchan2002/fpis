import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn ? children : <Navigate to="/" />;
};

export default PrivateRouter;
