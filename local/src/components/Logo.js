import React from 'react'
import logo from '../asset/logo.png'
import { Link, Typography } from '@mui/material'

function Logo() {
  return (
    <Link href="/" sx={{display:'flex', alignItems:'center', textDecoration:'none', color:'white'}}>
        <img src={logo} alt="hero-logo" width="64px" />
        <Typography variant='h4' sx={{ml:1, fontWeight:'bold'}}>PAPERSS</Typography>
    </Link>
  )
}

export default Logo