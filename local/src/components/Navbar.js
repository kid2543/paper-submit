import React from 'react'
import { Box, Container,Button } from '@mui/material'
import Logo from './Logo'
import Navitem from '../components/Navitem'
import {Link} from 'react-router-dom'

function Navbar() {
return (
  <Box sx={{ p: 2, background: '#303030'}}>
   <Container sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Logo />
    <Box>
      <Navitem text="ค้นหาบทความ" link="/article" />
      <Navitem text="ประกาศรับบทความ" link="/ann"/>
      <Navitem text="วิธีใช้งาน" link="/howto"/>
      <Link to="/login">
        <Button variant='contained'>Sign in</Button>
      </Link>
    </Box>
  </Container>
  </Box>
  
)
}

export default Navbar