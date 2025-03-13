import React from 'react'
import { Link } from 'react-router-dom'
import ForbidenImage from '../asset/403.jpg'

function UnAuthorized() {
  return (
    <div>
      <div>
        <div className='text-center my-3'>
          <img src={ForbidenImage} alt='403' className='img-fluid' />
        </div>
        <div className='text-center my-3'>
          <Link className='btn btn-primary mb-3' to='/'>กลับไปหน้าหลัก</Link>
          <div className='text-muted'>
            สิทธิ์การใช้งานไม่ถูกต้อง
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnAuthorized