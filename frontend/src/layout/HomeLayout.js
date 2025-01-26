import React from 'react'
import { HomeNavbar } from '../components/Navbar'

function HomeLayout({ children }) {
    return (
        <>
            <div>
                <HomeNavbar />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default HomeLayout