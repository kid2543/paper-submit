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

    const { user } = useAuthContext()

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
                            <div>
                                <UserDropdown />
                            </div>
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

export function ConfrNavbar({code}) {

    const { id } = useParams()

    return (
        <header>
            <Navbar expand="lg" className="bg-white shadow-sm">
                <Container>
                    <Navbar.Brand href='/'>
                        <div className='bg-light p-2 rounded fw-bold text-primary'>
                            PAPERSS
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='d-lg-flex justify-content-end'>
                        <Nav>
                            <Nav.Link href={`/confr/${id}`}>หน้าแรก</Nav.Link>
                            <Nav.Link href={`/confr/${id}/submission`}>แนะนำการส่ง</Nav.Link>
                            <Nav.Link href={`/confr/${id}/guideline`}>แนะนำการเข้าร่วมงาน</Nav.Link>
                            <Nav.Link href={`/confr/${id}/registration`}>การลงทะเบียน</Nav.Link>
                            <Nav.Link href={`/confr/${id}/venue`}>สถานที่จัดงาน</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}