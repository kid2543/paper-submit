import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AuthorPrivate({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  return token ? <>{children}</> : <Navigate to="/author-login" replace={true} />;
}
