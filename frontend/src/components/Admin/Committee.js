import React, { useState } from 'react'
import useSearch from '../../hook/useSearch'
import axios from 'axios'

// hook
import { useSignup } from '../../hook/useSignup';
import { useNavigate } from 'react-router-dom';


// react boostrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';


function Committee() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/user/search/committee")
    const signUp = useSignup()
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleCreate = async (e) => {
        e.preventDefault()
        const role = 'COMMITTEE'
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

    const handleDelete = async (userId, userName) => {
        if (window.confirm("ต้องการลบผู้ใช้งาน " + userName + " หรือไม่")) {
            try {
                console.log(userId)
                await axios.delete(`/api/user/committee/${userId}`)
                setData(data.filter((item) => item._id !== userId))
                alert("ลบสำเร็จ")
            } catch (error) {
                console.error("Error delete", error)
                alert('Error')
            }
        }
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มกรรมการ</Modal.Title>
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
                        <Button variant="primary" type='submit'>
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div className='d-flex justify-content-between align-items-center p-3 rounded mb-3'>
                <p className='fw-bold mb-0'>รายชื่อกรรมการ</p>
                <div className='d-flex'>
                    <form className='me-2' onSubmit={handleSearchChange}>
                        <input
                            className='form-control'
                            placeholder='ค้นหา...'
                            name='search'
                        />
                    </form>
                    <div>
                        <button type='button' className='btn btn-primary' onClick={handleShow}>เพิ่มกรรมการ</button>
                    </div>
                </div>
            </div>
            <div className='table-resonsive' style={{ minHeight: "200px" }}>
                {status === 'idle' || status === 'loading' ? (
                    <div className='text-center'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ชื่อผู้ใช้งาน</th>
                                <th>เพิ่มเติม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                <>
                                    {data?.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.username}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <i className="bi bi-three-dots"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => navigate('/admin/user/' + item._id)}>
                                                            <span className='me-2'>
                                                                <i className="bi bi-pen"></i>
                                                            </span>
                                                            แก้ไข
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDelete(item._id, item.username)}>
                                                            <span className='me-2'>
                                                                <i className="bi bi-trash"></i>
                                                            </span>
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
                )}
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <div>
                    <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link border-0'>
                        <i className="bi bi-arrow-left"></i> ก่อนหน้า
                    </button>
                    <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link border-0'>
                        ถัดไป <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Committee