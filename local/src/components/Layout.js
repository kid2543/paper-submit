import React from 'react'
import NavbarComponent from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <>
            <div>
                <NavbarComponent />
            </div>
            <main style={{minHeight: "100vh"}}>
                {children}
            </main>
            <div className='container'>
                <Footer />
            </div>
        </>
    )
}

export default Layout