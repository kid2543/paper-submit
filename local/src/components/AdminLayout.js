import React from 'react'
import { NavbarAdmin } from './Navbar'
import Footer from './Footer'

function AdminLayout({children}) {
  return (
    <div>
      <section>
        <NavbarAdmin />
      </section>
      <section style={{ minHeight: "100vh" }}>
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default AdminLayout