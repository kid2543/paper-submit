import React, { useState } from 'react'
import SignIn from '../page/SignIn';

function UseAuth({children}) {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString
    }

    const [token, setToken] = useState(getToken());

    if(!token) {
        return <SignIn />
    }

  return (
    <>
        {children}
    </>
  )
}

export default UseAuth