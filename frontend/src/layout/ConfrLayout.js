import React from 'react'
import { ConfrNavbar } from '../components/Navbar'
import Footer from '../components/Footer'

function ConfrLayout({ children }) {

  return (
    <>
      <div>
        <ConfrNavbar />
      </div>
      <main>
        {children}
      </main>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default ConfrLayout