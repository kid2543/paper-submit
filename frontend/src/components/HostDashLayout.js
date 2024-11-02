import React from 'react'
import { NavbarDashboard } from './Navbar'
import Footer from './Footer'

function HostDashLayout({children}) {
  return (
    <>
      <div>
        <NavbarDashboard />
      </div>
      <main style={{ minHeight: "100vh" }}>
        {children}
      </main>
      <div className='container'>
        <Footer />
      </div>
    </>
  )
}

export default HostDashLayout