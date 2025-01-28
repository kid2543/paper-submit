import React, { useState } from 'react'
import axios from 'axios';
// hook
import { useSignup } from '../../hook/useSignup'
import useSearch from '../../hook/useSearch'
// react boostatrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Host() {

    const { data, error, status, page, totalPages, setData, handleSearchChange, handleNextPage, handlePreviousPage } = useSearch("/api/user/search/host")
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const signUp = useSignup()

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/user/host/add', {
                username,
                name,
                password,
                email,
            })
            setData([res.data, ...data])
            toast.success('ผู้จัดงานสำเร็จ')
            setUsername('')
            setPassword('')
            setEmail('')
            setName('')
            handleClose()    
        } catch (error) {
            toast.error(error.response?.data.error)   
        }
    }

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มผู้ใช้งาน</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleCreate}>
                    <Modal.Body className='row g-3'>
                        <div className='col-12'>
                            <label className='form-label'>ชื่อ - นามสกุล</label>
                            <input className='form-control' required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>อีเมล</label>
                            <input type='email' className='form-control' required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>ชื่อผู้ใช้งาน</label>
                            <input className='form-control' required value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>รหัสผ่าน</label>
                            <input className='form-control' name='password' type='password' required onChange={e => setPassword(e.target.value)} />
                            <small className='text-muted'>รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ขั้นต่ำ 8 ตัวอักษร</small>
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>ยืนยีนรหัสผ่านอีกครั้ง</label>
                            <input className='form-control' name='confirm_password' type='password' required pattern={password} />
                        </div>
                        {signUp.error &&
                            <p className='text-danger'>
                                {signUp.error}
                            </p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' disabled={signUp.isLoading}>
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div className='d-flex justify-content-between p-3 mb-4 align-items-center rounded'>
                <p className='fw-bold mb-0'>ผู้จัดงานประชุม</p>
                <div className='d-flex'>
                    <form onSubmit={handleSearchChange} className='me-2'>
                        <input
                            type="search"
                            name='search'
                            placeholder="ค้นหา"
                            className='form-control'
                        />
                    </form>
                    <button className='btn btn-primary' type='button' onClick={handleShow}>
                        เพิ่มผู้จัดงานประชุม
                    </button>
                </div>
            </div>
            <div className='table-responsive' style={{ minHeight: "200px" }}>
                {status === 'idle' || status === 'loading' ? (
                    <div className='m-4'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>ชื่อผู้ใช้งาน</th>
                                <th>เครื่องมือ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                <>
                                    {data?.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                <Link className='btn btn-primary me-2' to={`/admin/user/${item._id}`}>
                                                    <i className='bi bi-pencil-square'></i>
                                                </Link>
                                                <button className='btn btn-danger'>
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr className='text-center'>
                                    <td colSpan={4} className='p-3 fw-bold'>ไม่พบรายการ</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )
                }
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <div>
                    <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                        <i className="bi bi-arrow-left"></i> ก่อนหน้า
                    </button>
                    <button onClick={handleNextPage} disabled={page === totalPages} className='btn btn-link'>
                        ถัดไป <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )


}

export default Host