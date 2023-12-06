import React, { useState } from 'react'
import AuthorTable from '../components/AuthorTable'
import AuthorAlert from '../components/AuthorAlert'
import { Box, Button } from '@mui/material'

function AuthorDashboardPage1() {

    const [show ,setShow] = useState(false)

  return (
    <div>
        <Button variant='contained' color='secondary' onClick={() => setShow(!show)} sx={{my:3}}>
            Alert Tests
        </Button>   
        <Box>
            { show ? <AuthorAlert /> : null }
        </Box>
        <Box>
            <AuthorTable />
        </Box>

    </div>
  )
}

export default AuthorDashboardPage1