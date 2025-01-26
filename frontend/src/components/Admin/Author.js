import React, { useState } from "react";
import useSearch from "../../hook/useSearch";
import { useSignup } from "../../hook/useSignup";
import axios from "axios";

// react boostrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

function Author() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/user/search/author")
    const signUp = useSignup()

    const navigate = useNavigate()

    // signup data
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)


    const handleCreate = async (e) => {
        e.preventDefault()
        const res = await signUp.signup(username, password)
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

    const handleDelete = async (userId, username) => {
        if (window.confirm(`ต้องการลบผู้ใช้ ${username} หรือไม่ ?`)) {
            try {
                await axios.delete('/api/user/author/' + userId)
                setData(data.filter(items => items._id !== userId))
                alert(`ลบผู้ใช้งาน ${username} แล้ว`)
            } catch (error) {
                console.log(error)
                alert(error.response.data?.error)
            }
        }
    }

    // render


    if (error) {
        return <div>Error page</div>
    }

    return (
        <div>
            {data &&
                <div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มผู้ส่งบทความ</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={handleCreate}>
                            <Modal.Body>
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
                    <div className='p-3 mb-3 d-flex justify-content-between align-items-center'>
                        <p className="fw-bold">รายชื่อผู้ส่งบทความ</p>
                        <div className="d-flex">
                            <form className="me-2" onSubmit={handleSearchChange}>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <input className='form-control' name='search' placeholder='ค้นหา...' />
                                    </div>
                                </div>
                            </form>
                            <button type='button' className="btn btn-primary" onClick={() => setShow(true)}>เพิ่มผู้ส่งบทความ</button>
                        </div>
                    </div>
                    <div className="table-responsive" style={{ minHeight: "200px" }}>
                        {status === 'idle' || status === 'loading' ? (
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <table className='table align-middle table-hover'>
                                <thead>
                                    <tr>
                                        <th>ชื่อผู้ใช้งาน</th>
                                        <th>อีเมล</th>
                                        <th>เพิ่มเติม</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((items) => (
                                        <tr key={items._id}>
                                            <td>{items.username}</td>
                                            <td>{items.email}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => navigate('/admin/user/' + items._id)}>
                                                            <span className="me-2">
                                                                <i className="bi bi-pen"></i>
                                                            </span>
                                                            แก้ไข
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDelete(items._id, items.username)}>
                                                            <span className="me-2">
                                                                <i className="bi bi-trash"></i>
                                                            </span>
                                                            ลบ
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className='d-flex justify-content-between align-items-center'>
                            <span>{`Page ${page} of ${totalPages}`}</span>
                            <div>
                                <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                                    <i className="bi bi-arrow-left"></i> ก่อนหน้า
                                </button>
                                <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link'>
                                    ถัดไป <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Author