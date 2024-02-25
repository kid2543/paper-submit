import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <>
            <div>
                <Navbar />
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

export default Layout