import React, { useState } from 'react'
import axios from 'axios';
// hook
import { useSignup } from '../../hook/useSignup'
import useSearch from '../../hook/useSearch'
// react boostatrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function Host() {

    const { data, error, status, page, totalPages, setData, handleSearchChange, handleNextPage, handlePreviousPage } = useSearch("/api/user/search/host")
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const signUp = useSignup()
    const navigate = useNavigate()

    const handleDelete = async (userId, userName) => {
        if (window.confirm("ต้องการจะลบ username: " + userName + " หรือไม่?")) {
            try {
                const res = await axios.delete('/api/user/host/' + userId)
                setData(data.filter(items => items._id !== userId))
                console.log(res.data)
                alert(`User ${userName} has deleted`)
            } catch (error) {
                console.log(error)
                alert('Error')
            }
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const role = 'HOST'
        const res = await signUp.signup(username, password, role)
        if (res) {
            setData([res, ...data])
            alert("Success")
            setUsername('')
            setPassword('')
            handleClose()
        } else {
            alert('Error')
        }
    }

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มผู้ใช้งาน</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleCreate}>
                    <Modal.Body className='row g-3'>
                        <div className='col-12'>
                            <label className='form-label'>Username</label>
                            <input className='form-control' required value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>Password</label>
                            <input className='form-control' name='password' type='password' required onChange={e => setPassword(e.target.value)} />
                            <small className='text-muted'>รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ขั้นต่ำ 8 ตัวอักษร</small>
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>Confirm password</label>
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
                                <th>ชื่อผู้ใช้งาน</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                <>
                                    {data?.map(item => (
                                        <tr key={item._id}>
                                            <td>{item.username}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <i className='bi bi-three-dots'></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => navigate('/admin/user/' + item._id)}>
                                                            <span className='me-2'>
                                                                <i className="bi bi-pen"></i>
                                                            </span>
                                                            แก้ไข
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDelete(item._id, item.username)}>
                                                            <span className='me-2'><i className="bi bi-trash"></i></span>
                                                            ลบ
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
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