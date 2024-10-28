import React from 'react'
import { NavbarAdmin } from './Navbar'

function AdminLayout({ children }) {

  return (
    <div>
      <NavbarAdmin />
      <div className='my-5'>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout