import React from 'react'
import { NavbarHost } from './Navbar'

function HostLayout({ children }) {

    return (
        <div>
            <section>
                <NavbarHost />
            </section>
            <section>
                {children}
            </section>
        </div>
    )
}

export default HostLayout