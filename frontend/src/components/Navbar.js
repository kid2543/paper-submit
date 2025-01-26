import React from 'react'
import { useParams, Link } from 'react-router-dom'

// asset
import Logo from '../asset/logo.png'

// react bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// notify
import 'react-toastify/ReactToastify.css'
import { UserDropdown } from './UserDropdown'
import { useAuthContext } from '../hook/useAuthContext';

export function HomeNavbar() {

    const { user} = useAuthContext()

    return (
        <header>
            <Navbar expand="lg" className='bg-white shadow-sm position-fixed top-0 w-100'>
                <Container>
                    <Navbar.Brand href="/" className='d-flex align-items-center'>
                        <div className='bg-light me-2' style={{ padding: "8px", borderRadius: '20px' }}>
                            <img src={Logo} alt='paper submission' width={46} height={40} />
                        </div>
                        <h4 className='mb-0'>
                            PAPERSS
                        </h4>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='d-lg-flex justify-content-between'>
                        <Nav>
                            <div className='d-lg-flex align-items-center'>
                                <Nav.Link href="/paper">บทความ</Nav.Link>
                                <Nav.Link href="/confr">งานประชุม</Nav.Link>
                            </div>
                        </Nav>
                        {user ? (
                        <UserDropdown />
                        ) : (
                            <div>
                                <Link to='/login' type='button' className='btn btn-dark'>Login</Link>
                            </div>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export function ConfrNavbar() {

    // const { logout } = useLogout()
    // const { user } = useAuthContext()

    const { id } = useParams()
    const code = localStorage.getItem('confr_code')

    // const handleClick = () => {
    //     logout()
    // }

    return (
        <header>
            <Navbar expand="lg" className="bg-white shadow-sm">
                <Container>
                    <Navbar.Brand href={'/confr/' + id}>
                        <div className='bg-light p-2 rounded fw-bold text-primary'>
                            {code}
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='d-lg-flex justify-content-end'>
                        <Nav>
                            <Nav.Link href={`/confr/${id}/submission`}>Submission</Nav.Link>
                            <Nav.Link href={`/confr/${id}/guideline`}>Guideline</Nav.Link>
                            <Nav.Link href={`/confr/${id}/registration`}>Registration</Nav.Link>
                            <Nav.Link href={`/confr/${id}/venue`}>Venue</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}