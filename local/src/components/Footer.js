import React from 'react'
import Logo from '../asset/logo.png'

function Footer() {
  return (
  <footer className='container'>
      <div className='row border-top py-3 my-3'>
        <p className='col-md-4 mb-0 text-muted'>
          @2024 Company, Inc
        </p>
        <div className='col-md-4 d-flex justify-content-center aling-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none'>
          <img src={Logo} height={40} />
        </div>
        <ul className="nav col-md-4 justify-content-end">
          <li className='nav-item'>
            <a href="/" className='nav-link'>หน้าแรก</a>
          </li>
          <li className='nav-item'>
            <a href="/confr" className='nav-link'>งานประชุม</a>
          </li>
          <li className='nav-item'>
            <a href="/paper" className='nav-link'>บทความ</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer