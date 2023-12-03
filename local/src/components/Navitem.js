import React from 'react'
import { Link } from '@mui/material'

function Navitem(props) {
  return (
      <Link href={props.link} sx={{p:1}} underline='hover' color='white'>
        {props.text}
      </Link>
  )
}

export default Navitem