import React from 'react'
import { Link } from 'react-router-dom'
import ForbidenImage from '../asset/403.jpg'

function UnAuthorized() {
  return (
    <div>
      <div className='text-center my-3'>
        <img src={ForbidenImage} alt='403' />
      </div>
        <div className='text-center my-3'>
            <Link className='btn btn-primary' to='/'>Back to home</Link>
        </div>
    </div>
  )
}

export default UnAuthorized