import React from 'react'
import Logo from '../asset/logo.png'
import {
    Navbar,
    Container,
    Nav,
} from 'react-bootstrap'
import { UserDropdown } from './UserDropdown'

function CommitteeNavbar() {
    return (
        <Navbar expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand href="/" className='d-flex align-items-center'>
                    <img src={Logo} alt='papers submission' width={46} className='me-2 bg-light rounded p-1' />
                    <h4 className='mb-0'>PAPERSS</h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='d-lg-flex justify-content-end' id="basic-navbar-nav">
                    <Nav>
                        <UserDropdown />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CommitteeNavbar