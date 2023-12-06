import React from 'react'
import { Alert, Box } from '@mui/material'

function AuthorAlert() {
  return (
    <Box sx={{my:2}}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
    </Box>
  )
}

export default AuthorAlert