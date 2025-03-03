import React, { useEffect, useState } from 'react'
import { replace, useNavigate } from 'react-router-dom'
import { useLogout } from '../hook/useLogout'
import { useAuthContext } from '../hook/useAuthContext'
import axios from 'axios'

// react bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

// notify
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import dayjs from 'dayjs'

export function UserDropdown() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [notiMessage, setNotiMessage] = useState([])
    const [unreadState, setUnreadState] = useState(0)
    const navigate = useNavigate()
    const [role, setRole] = useState('')

    // read notification
    const handleRead = async () => {
        try {
            await axios.patch('/api/notification/read')
            setUnreadState(0)
        } catch (error) {
            console.log(error)
        }
    }

    // clear notification
    const handleClear = async () => {
        try {
            await axios.delete('/api/notification')
            toast.success('ล้างข้อมูลสำเร็จ!', {
                position: 'bottom-left'
            });
            setNotiMessage([])
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด', {
                position: 'bottom-left'
            })
        }
    }

    const handleShow = () => {
        setShow(true)
        handleRead()
    }

    useEffect(() => {
        const fethNotification = async () => {
            try {
                const res = await axios.get('/api/notification')
                setNotiMessage(res.data)
                const unread = res.data.filter(items => items.status !== true)
                setUnreadState(unread.length)
                const role = await axios.get('/api/user/role')
                setRole(role.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (user) {
            fethNotification()
        }

    }, [user])


    const handleClose = () => setShow(false)

    const handleLogout = async () => {
        await logout()
        navigate('/', replace)
    }

    return (
        <Dropdown>
            <Dropdown.Toggle className=" align-items-center d-flex" variant="light" id="dropdown-basic">
                <i className="bi bi-person-fill fs-3 me-2"></i>
                <span className="me-2 d-none d-md-flex">{user}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Header>
                    {user}
                </Dropdown.Header>
                <Dropdown.Item href="/setting">
                    {role === 'HOST' &&
                        'รายการงานประชุม'
                    }
                    {role === 'ADMIN' &&
                        'แผงควบคุม'
                    }
                    {
                        role === 'AUTHOR' &&
                        'รายการบทความ'
                    }
                    {role === 'COMMITTEE' &&
                        'รายการตรวจบทความ'
                    }
                </Dropdown.Item>
                <Dropdown.Item href="/profile">
                    การตั้งค่า
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>
                    <span className='position-relative'>
                        การแจ้งเตือน
                        {unreadState > 0 &&
                            <span className='position-absolute top-0 start-100 translate-middle badge border-light rounded-circle bg-danger p-1'>
                                <span className='visually-hidden'>unread messages</span>
                            </span>
                        }
                    </span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className='text-danger' onClick={handleLogout}>
                    ออกจากระบบ
                </Dropdown.Item>
            </Dropdown.Menu>
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>การแจ้งเตือน</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {notiMessage.length > 0 ? (
                        <div>
                            <div className="mb-3">
                                <button
                                    type='button'
                                    onClick={handleClear}
                                    className='btn btn-outline-dark btn-sm'
                                    disabled={notiMessage.length <= 0}
                                >
                                    <i className='bi bi-trash me-2'></i>
                                    ลบการแจ้งเตือนทั้งหมด
                                </button>
                            </div>
                            <section className="list-group">
                                {notiMessage.map(items => (
                                    <div className="list-group-item d-flex justify-content-between align-items-start" key={items._id}>
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{items.title}</div>
                                            {items.message}
                                            <div className='card-text text-muted'>
                                                {dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}
                                            </div>
                                        </div>
                                        {items.status === false &&
                                            <span className="badge bg-info">New</span>
                                        }
                                    </div>
                                ))}
                            </section>
                        </div>
                    ) : (
                        "ไม่มีการแจ้งเตือนในขณะนี้"
                    )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </Dropdown>
    )
}