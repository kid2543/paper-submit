import { Button } from '@mui/material';
import React from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function TestPrivate() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const logout = () => {
        cookies.set('token',null)
        navigate("/login")
    }

  return (
    <div>
        <h2>Private Page</h2>
        <Button onClick={logout}>Log out</Button>
    </div>
  )
}

export default TestPrivate