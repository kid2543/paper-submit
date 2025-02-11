import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hook/useLogout'
import { useAuthContext } from '../hook/useAuthContext'
import axios from 'axios'

// react bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

// notify
import { toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

export function UserDropdown() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [notiMessage, setNotiMessage] = useState([])
    const [unreadState, setUnreadState] = useState(0)
    const navigate = useNavigate()

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
                
                // alert notification
                if(unread.length > 0) {
                    toast('มีการแจ้งเตือนใหม่')
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (user) {
            fethNotification()
        }

    }, [user])


    const handleClose = () => setShow(false)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <Dropdown>
            <Dropdown.Toggle className=" align-items-center d-flex" variant="light" id="dropdown-basic">
                <i className="bi bi-person-fill fs-3 me-2"></i> 
                <span className="me-2">{user}</span>                    
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.ItemText>
                    {user}
                </Dropdown.ItemText>
                <Dropdown.Header>
                    test@mail.com
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item href="/setting">
                    เครื่องมือ
                </Dropdown.Item>
                <Dropdown.Item href="/profile">
                    การตั้งค่า
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>
                    <span className='position-relative'>
                        การแจ้งเตือน
                        {unreadState.length > 0 &&
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
                    <div className='ms-3'>
                        <button type='button' onClick={handleClear} className='btn btn-outline-dark btn-sm' disabled={notiMessage.length <= 0}>Clear all</button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {notiMessage.length > 0 ? (
                        <section>
                            {notiMessage.map(items => (
                                <div key={items._id}>
                                    {items._id}
                                </div>
                            ))}
                        </section>
                    ) : (
                        "ไม่มีการแจ้งเตือนในขณะนี้"
                    )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </Dropdown>
    )
}