import React, { useEffect, useState } from 'react'
import Logo from '../asset/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import NotificationCard from './NotificationCard';


const api = process.env.REACT_APP_API_URL

const SignOut = () => {
    if (window.confirm("ต้องการออกจากระบบหรือไม่?")) {
        sessionStorage.clear()
        localStorage.clear()
        window.location.href = '/'
    }
}

function NavbarComponent() {


    const token = sessionStorage.getItem('token')

    return (
        <Navbar variant="light" bg="light" expand="lg" className='shadow-sm fixed-top w-100'>
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    <span className='fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className='justify-content-between'>
                    <Nav variant='underline' activeKey={window.location.pathname}>
                        <Nav.Link href="/confr">งานประชุม</Nav.Link>
                        <Nav.Link href="/paper">บทความ</Nav.Link>
                    </Nav>
                    <div>
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
                                <NavDropdown.Item type='button' onClick={SignOut}>
                                    <span className='me-3'><ion-icon name="log-out-outline"></ion-icon></span>
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <a href="/sign-in">
                                <button className='btn btn-primary'>เข้าสู่ระบบ</button>
                            </a>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent

export function NavbarConfr({ id, name }) {

    return (
        <Navbar expand="lg" bg='light' variant='light'>
            <Container fluid="md">
                <Navbar.Brand>
                    <a href={"/confr/" + id} className='btn btn-outline-primary'>{name}</a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" activeKey={window.location.pathname} >
                        <Nav.Link href={"/confr/" + id + "/committees"}>รายชื่อกรรมการ</Nav.Link>
                        <Nav.Link href={"/confr/" + id + "/template"}>เทมเพลท</Nav.Link>
                        <Nav.Link href={"/confr/" + id + "/guideline"}>แนวทางการเข้าร่วมงานประชุม</Nav.Link>
                        <NavDropdown className='text-dark' title={<span>รายละเอียดเพิ่มเติม <ion-icon name="chevron-down-outline"></ion-icon></span>} id="basic-nav-dropdown" data-bs-theme="dark">
                            <NavDropdown.Item href={"/confr/" + id + "/present-guideline"}>แนวทางการนำเสนอ</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/inv-speaker"}>พิธีกร</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/registration"}>
                                การลงทะเบียน
                            </NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/venue"}>สถานที่จัดงานประชุม</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/pub"}>วารสาร</NavDropdown.Item>
                            <NavDropdown.Item href={"/confr/" + id + "/partner"}>ผู้สนับสนุน</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export function NavbarAuthor() {

    const [noti, setNoti] = useState([])
    const [newNoti, setNewNoti] = useState([])

    useEffect(() => {

        const token = sessionStorage.getItem("token")

        const fethNoti = async () => {
            try {
                const res = await axios.get(api + '/get/notification/' + token)
                let arr = res.data
                setNoti(arr.sort((a, b) => new Date(a.time) - new Date(b.time)))
                let newItem = []
                for (let i in arr) {
                    if (arr[i].read_status === false) {
                        newItem.push(arr[i])
                    }
                }
                setNewNoti(newItem)
            } catch (error) {
                console.log(error)
            }
        }
        fethNoti()
    }, [])

    const readNotification = async () => {
        if (newNoti.length > 0) {
            try {
                const res = await axios.patch(api + "/update/notification/status/" + sessionStorage.getItem("token"))
                console.log("notification update: ", res)
            } catch (error) {
                console.log(error)
            }
        } else {
            return false
        }
    }

    const handleClearNotification = async () => {
        if (window.confirm("ต้องการล้างข้อมูลการแจ้งเตือนหรือไม่")) {
            try {
                await axios.delete(api + "/clear/notification/" + sessionStorage.getItem("token"))
                setNoti([])
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleDismiss = (notiId) => {
        setNoti(noti.filter((item) => item._id !== notiId))
    }

    return (
        <Navbar variant="light" bg="light" expand="lg" className='shadow-sm py-3'>
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    <span className='fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example" className='justify-content-end'>
                    <Nav activeKey={window.location.pathname}>
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
                            onClick={readNotification}
                        >
                            <div className='p-3 overflow-auto' style={{ height: "560px", minWidth: "400px" }}>
                                <div className='row align-items-center'>
                                    <div className='col-6'>
                                        แจ้งเตือน
                                    </div>
                                    <div className='col-6 text-end'>
                                        <button type='button' onClick={handleClearNotification} className='btn btn-sm btn-outline-info' disabled={noti.length < 1}>Clear all</button>
                                    </div>
                                </div>
                                <hr />
                                <div className='row gy-3'>
                                    {noti.length > 0 ? (
                                        <>
                                            {noti?.map((item, index) => (
                                                <NotificationCard
                                                    key={index}
                                                    header={item.header}
                                                    desc={item.form}
                                                    date={item.time}
                                                    status={item.read_status}
                                                    handleDelNoti={handleDismiss}
                                                />
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
                            <NavDropdown.Item type='button' onClick={SignOut}>
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

    return (
        <Navbar variant='light' bg='light' expand='lg' className='shadow-sm py-3'>
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
                            <NavDropdown.Item type='button' onClick={SignOut}>
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

    return (
        <Navbar variant="light" bg="light" expand="lg" className='shadow-sm py-3'>
            <Container>
                <Navbar.Brand href="/">
                    <img className='me-2' src={Logo} alt='paper-submission' height={32} width={32} />
                    <span className='fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav activeKey={window.location.pathname} >
                        <Nav.Link href="/host">Dashboard</Nav.Link>
                        <Nav.Link href="/host/confr">บทความ</Nav.Link>
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
                            <NavDropdown.Item type='button' onClick={SignOut}>
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

    return (
        <Navbar expand="lg" variant='light' bg='light' className='shadow-sm'>
            <Container fluid="md">
                <Navbar.Brand href="/">
                    <img src={Logo} alt='paper submit' className='me-2' height={32} width={32} />
                    <span className='fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
                        <Nav.Link onClick={() => console.log("Notification")}><ion-icon name="notifications-outline"></ion-icon></Nav.Link>
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
                            <NavDropdown.Item type='button' onClick={SignOut}>
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

export function NavbarDashboard() {

    return (
        <Navbar expand="lg" variant='light' bg='light' className='shadow-sm py-3'>
            <Container>
                <Navbar.Brand href="/">
                    <img src={Logo} alt='paper submit' className='me-2' height={32} width={32} />
                    <span className='fw-bold'>PAPERSS</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className='justify-content-end'>
                    <Nav>
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
                            <NavDropdown.Item type='button' onClick={SignOut}>
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