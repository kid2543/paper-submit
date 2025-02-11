import React from 'react'
import NavbarComponent from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <>
            <div>
                <NavbarComponent />
            </div>
            <main style={{minHeight: "100vh", marginTop: "120px"}}>
                {children}
            </main>
            <div className='container-fluid'>
                <Footer />
            </div>
        </>
    )
}

export default Layout