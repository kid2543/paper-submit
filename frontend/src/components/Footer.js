import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='container-fluid'>
      <footer className='py-3 my-4'>
        <ul className='nav justify-content-center border-bottom mb-3'>
          <li className='nav-item'>
            <Link to="/" className='nav-link'>หน้าแรก</Link>
          </li>
          <li className='nav-item'>
            <Link to="/confr" className='nav-link'>งานประชุม</Link>
          </li>
        </ul>
        <div className='text-center text-muted'>
          <div>ระบบรับ-ส่งบทความสำหรับงานประชุมวิชการ</div>
          <div>Paper submission for academic confernce</div>
        </div>
      </footer>
    </div>

  )
}

export default Footer