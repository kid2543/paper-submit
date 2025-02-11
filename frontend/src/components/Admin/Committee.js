import React, { useState } from 'react'
import useSearch from '../../hook/useSearch'
import axios from 'axios'

// hook
import { useSignup } from '../../hook/useSignup';
import { Link } from 'react-router-dom';


// react boostrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';


function Committee() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/user/search/committee")
    const signUp = useSignup()

    //modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    // create committee
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/user/committee', {
                username,
                name,
                password,
                email,
            })
            setData([res.data, ...data])
            toast.success("เพิ่มกรรมการสำเร็จ")
            setUsername('')
            setPassword('')
            setEmail('')
            setName('')
            handleClose()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด: ' + error.response.data?.error)
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
                            ปิด
                        </Button>
                        <Button variant="primary" type='submit'>
                            สร้าง
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h6 className='fw-bold mb-0'>รายชื่อกรรมการ</h6>
                    <div>
                        <button type='button' className='btn btn-primary' onClick={handleShow}>เพิ่มกรรมการ</button>
                    </div>
                </div>
                <form className='mb-3' onSubmit={handleSearchChange}>
                    <input
                        className='form-control text-bg-light'
                        placeholder='ค้นหา...'
                        name='search'
                    />
                </form>
            </div>
            <div className='table-resonsive' style={{ minHeight: "200px" }}>
                {status === 'idle' || status === 'loading' ? (
                    <div className='text-center'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อ - นามสกุล</th>
                                <th>ชื่อผู้ใช้งาน</th>
                                <th>เพิ่มเติม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                <>
                                    {data?.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                <Link className="btn btn-light" to={`/admin/user/${item._id}`}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
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
                    <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link '>
                        <i className="bi bi-arrow-left"></i> ก่อนหน้า
                    </button>
                    <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link '>
                        ถัดไป <i className="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Committee