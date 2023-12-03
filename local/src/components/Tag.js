import { Typography } from '@mui/material'
import React from 'react'

function Tag(props) {
  return (
    <Typography variant='body1' sx={{color:'#00A5FF'}}>
        {props.text}
    </Typography>
  )
}

export default Tag