import React from 'react'
import {Box, Typography, Container} from '@mui/material'
import AnnCard from '../components/AnnCard'

function Announcement() {
  return (
    <section>
        <Container sx={{ mt: 5 }}>
        <Typography variant="h4" align="center">
          ประกาศรับบทความ
        </Typography>
        <Box>
          <Typography variant='h6'>
            ประกาศที่เปิดรับบทความ
          </Typography>
          <Box sx={{mt:5}}>
            <AnnCard />
          </Box>
        </Box>
      </Container>
    </section>
  )
}

export default Announcement