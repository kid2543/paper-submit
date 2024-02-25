import React from 'react'
import Footer from './Footer'

function HostLayout({children}) {
  return (
    <>
        <nav className='navbar text-bg-dark'>
        <div className='container-fluid'>
                <h4>Logo</h4>
            <ul className='nav'>
                <li className='nav-item'>
                    <a className='nav-link' href="/host">หน้าแรก</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href="/host/create">สร้างงานประชุม</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href="/host/committees">เพิ่มกรรมการ</a>
                </li>
            </ul>
            <div>
                <a className='nav-link' href="/profile"><ion-icon name="person-circle"></ion-icon></a>
            </div>
            </div>
        </nav>
        <div className='pb-5'>
            {children}
        </div>
            <Footer />
    </>
  )
}

export default HostLayout