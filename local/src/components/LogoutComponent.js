import { Button,Box } from '@mui/material';
import React from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function LogoutComponent() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const logout = () => {
        cookies.set('token',null)
        navigate("/")
    }

  return (
    <Box>
        <Button onClick={logout}>Log out</Button>
    </Box>
  )
}

export default LogoutComponent