import React, { useEffect, useState } from 'react'
import Logo from '../asset/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import NotificationCard from './NotificationCard';


const api = process.env.REACT_APP_API_URL



function NavbarComponent() {


    const token = sessionStorage.getItem('token')

    function signOut() {
        if (window.confirm("ต้องการออกจากระบบหรือไม่ ?")) {
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload()
        } else {
            return false
        }
    }

    console.log("pathname", window.location.pathname)

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    PAPERSS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className='justify-content-end'>
                    <Nav variant='underline' activeKey={window.location.pathname}>
                        <Nav.Link href="/confr">งานประชุม</Nav.Link>
                        <Nav.Link href="/paper">บทความ</Nav.Link>
                        {token ? (
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title={<ion-icon name="person-circle"></ion-icon>}
                                menuVariant="dark"
                                drop='start'
                            >
                                <NavDropdown.Item href="/user-profile">
                                    <span className='me-3'><ion-icon name="settings-outline"></ion-icon></span>
                                    Setting
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item type='button' onClick={signOut}>
                                    <span className='me-3'><ion-icon name="log-out-outline"></ion-icon></span>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <a href="/sign-in">
                                <button className='btn btn-primary'>เข้าสู่ระบบ</button>
                            </a>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent

export function NavbarConfr({ id }) {

    return (
        <Navbar expand="lg" bg='light' className='bg-body-tertiary shadow p-3'>
            <Container>
                <Navbar.Brand>
                    <a href={"/confr/" + id} className='btn btn-outline-primary'>หน้าแรก</a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={"/confr/" + id + "/committees"}>รายชื่อกรรมการ</Nav.Link>
                        <Nav.Link href={"/confr/" + id + "/template"}>เทมเพลท</Nav.Link>
                        <Nav.Link href={"/confr/" + id + "/guideline"}>แนวทาง</Nav.Link>
                        <NavDropdown className='text-dark' title="รายละเอียดเพิ่มเติม" id="basic-nav-dropdown">
                            <NavDropdown.Item href={"/confr/" + id + "/present-guideline"}>แนวทางการนำเสนอ</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/inv-speaker"}>พิธีกร</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/registration"}>
                                การลงทะเบียน
                            </NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/venue"}>สถานที่จัดงานประชุม</NavDropdown.Item>
                            <NavDropdown.Item href="#pub">วารสาร</NavDropdown.Item>
                            <NavDropdown.Item href="#partner">ผู้สนับสนุน</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function NavbarAuthor() {

    const [noti, setNoti] = useState([])

    console.log("noti", noti)

    const signOut = () => {
        if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload()
        }
    }

    useEffect(() => {

        const token = sessionStorage.getItem("token")

        const fethNoti = async () => {
            try {
                const res = await axios.get(api + '/get/notification/' + token)
                console.log(res)
                let arr = res.data
                arr.sort((a, b) => new Date(a.time) - new Date(b.time))
                setNoti(arr)
            } catch (error) {
                console.log(error)
            }
        }
        fethNoti()
    }, [])

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    PAPERSS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className='justify-content-end'>
                    <Nav>
                        <Nav.Link href="/author">บทความ</Nav.Link>
                        <Nav.Link href="/confr">ส่งบทความ</Nav.Link>
                        <NavDropdown
                            id="notification"
                            title={
                                <span className='position-relative'>
                                    <ion-icon name="notifications-outline"></ion-icon>
                                </span>
                            }
                            menuVariant="dark"
                            drop='start'

                        >
                            <div className='p-3 overflow-auto' style={{ height: "560px", minWidth: "400px" }}>
                                <div className='row align-items-center'>
                                    <div className='col-6'>
                                        แจ้งเตือน
                                    </div>
                                    <div className='col-6 text-end'>
                                        <button type='button' className='btn btn-link text-decoration-none text-secondary' disabled={noti.length < 1}>Mark all read</button>
                                    </div>
                                </div>
                                <hr />
                                <div className='row gy-3'>
                                    {noti.length > 0 ? (
                                        <>
                                            {noti?.map((item, index) => (
                                                <NotificationCard key={index} header={item.header} desc={item.form} date={item.time} />
                                            ))}
                                        </>
                                    ) : (
                                        <div>
                                            No messages at this time.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </NavDropdown>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<ion-icon name="person-circle"></ion-icon>}
                            menuVariant="dark"
                        >
                            <NavDropdown.Item href="/user-profile">
                                <span className='me-3'>
                                    <ion-icon name="settings-outline"></ion-icon>
                                </span>
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item type='button' onClick={signOut}>
                                <span className='me-3'>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </span>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function NavbarCommit() {

    const signOut = () => {
        console.log("sign out")
    }

    return (
        <Navbar variant='dark' bg='dark' expand='lg'>
            <Container>
                <Navbar.Brand href="/"><img src={Logo} alt='paper submit' height={48} width={48} /> <span className='fw-bold'>PAPERSS</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav>
                        <Nav.Link href="/committee">ตรวจบทความ</Nav.Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<ion-icon name="person-circle"></ion-icon>}
                            menuVariant="dark"
                            drop='start'
                        >
                            <NavDropdown.Item href="/user-profile">
                                <span className='me-3'>
                                    <ion-icon name="settings-outline"></ion-icon>
                                </span>
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item type='button' onClick={signOut}>
                                <span className='me-3'>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </span>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function NavbarHost() {

    const signOut = () => {
        if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
            sessionStorage.clear()
            localStorage.clear()
            window.location.reload()
        }
    }

    return (
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    PAPERSS
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Nav.Link href="/host">บทความ</Nav.Link>
                        <Nav.Link href="/host/cate">หัวข้องานประชุม</Nav.Link>
                        <Nav.Link href="/host/committee">กรรมการ</Nav.Link>
                        <Nav.Link href="/host/pub">วารสาร</Nav.Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={<ion-icon name="person-circle"></ion-icon>}
                            menuVariant="dark"
                            drop='start'
                        >
                            <NavDropdown.Item href="/user-profile">
                                <span className='me-3'>
                                    <ion-icon name="settings-outline"></ion-icon>
                                </span>
                                Setting
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item type='button' onClick={signOut}>
                                <span className='me-3'>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                </span>
                                Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function NavbarAdmin() {

    const singOut = () => {
        if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
            sessionStorage.clear()
            window.location.reload()
        } else {
            return false
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} alt='paper submit' className='me-2' height={48} width={48} />
                    <span className='fs-4 fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/admin">Dashboard</Nav.Link>
                        <Nav.Link href="/admin/publication">วารสาร</Nav.Link>
                    </Nav>
                    <div className='justify-content-end'>
                        <button className='btn btn-sm btn-danger' type='button' onClick={singOut}>Sign out</button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}