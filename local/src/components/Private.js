import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function PrivateRoute({ children }) {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return token ? <>{children}</> : <Navigate to="/login" replace={true} />;
}
