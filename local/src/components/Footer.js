import React from 'react'

function Footer() {
  return (
    <div className='container'>
      <footer className='py-3 my-4'>
        <ul className='nav justify-content-center border-bottom mb-3'>
          <li className='nav-item'>
            <a href="/" className='nav-link px-2 text-muted'>หน้าแรก</a>
          </li>
          <li className='nav-item'>
          <a href="/confr" className='nav-link px-2 text-muted'>งานประชุม</a>
          </li>
          <li className='nav-item'>
          <a href="/paper" className='nav-link px-2 text-muted'>บทความ</a>
          </li>
        </ul>
        <p className='text-center text-muted'>@ 2024 Company, Inc</p>
      </footer>
    </div>

  )
}

export default Footer