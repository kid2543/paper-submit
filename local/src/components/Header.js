import * as React from 'react';
import { Typography } from '@mui/material';

export default function Header(props) {
  return (
    <Typography variant="h2" sx={{color:'#00A5FF'}}>
        {props.text}
    </Typography>
    )
}