import { Box, Typography,Stack } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Cover from '../asset/cover.jpg'

function ArticleMock() {

  return (
    <div>
        <Container>
          <Box sx={{mt:5}}>
          <Stack spacing={2} textAlign='center'>
        <Typography variant='h4'>หัวข้อบทความ</Typography>
        <img src={Cover} alt='test'  width={400} style={{marginLeft:'auto', marginRight:'auto'}}/>
        <Typography>รายละเอียดบทความ</Typography>
      </Stack>
           </Box>
        </Container>
    </div>
  )
}

export default ArticleMock