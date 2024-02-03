import { Button,Box } from '@mui/material';
import React from 'react'
import Cookies from 'universal-cookie'

function LogoutComponent() {

    const cookies = new Cookies();

    const logout = () => {
      cookies.set('token',null)
    }

  return (
    <Box component='form' onSubmit={logout}>
        <Button type="submit" onSubmit={logout}>Log out</Button>
    </Box>
  )
}

export default LogoutComponent