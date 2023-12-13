import {Navigate} from 'react-router-dom'
import Cookies from 'universal-cookie' 

export default function PrivateRoute({ children }) {
    const cookies = new Cookies();
    const status = (cookies.get('token'))
    return status ? (
        <>{children}</>
      ) : 
        (
            <Navigate to="/login" replace={true} />
        )

  }