import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { UserDropdown } from './UserDropdown';


function AuthorSidebar() {

    const sidebarStyle = {
        height: "100%",
        width: "240px",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: "hidden",
        paddingTop: "20px"
    }

    return (
        <section style={sidebarStyle} className='bg-white'>
            <div className="d-flex flex-column justify-content-between h-100">
                <div className='px-3'>
                    <a href='/' className='text-decoration-none text-primary'>
                        <h3>PAPERSS</h3>
                    </a>
                    <hr />
                    <Nav variant='pills' defaultActiveKey="/author" className="flex-column">
                        <Nav.Link href="/author"><i className="bi bi-speedometer2"></i> In progress</Nav.Link>
                        <Nav.Link href='/archive'><i className="bi bi-bookmark"></i> Archive</Nav.Link>
                    </Nav>
                </div>
                <div className='p-3'>
                    <hr />
                    <UserDropdown />
                </div>
            </div>
        </section>
    )
}

export default AuthorSidebar