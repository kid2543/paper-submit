import React from 'react'
import Footer from './Footer';
import { NavbarCommit } from './Navbar';

function CommitteeLayout({ children }) {
    return (
        <div>
            <NavbarCommit />
            <main style={{ minHeight: "100vh" }}>
                {children}
            </main>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CommitteeLayout