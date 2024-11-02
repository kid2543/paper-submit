import React from 'react'

function NotSignIn() {
  return (
    <div className='text-center py-5'>
      <div className='container'>
        <h2>โปรดเข้าสู่ระบบก่อนเข้าสู่หน้านี้</h2>
        <a href='/sign-in'>
          <button type='button' className='btn btn-primary'>Sign In</button>
        </a>
      </div>
    </div>
  )
}

export default NotSignIn