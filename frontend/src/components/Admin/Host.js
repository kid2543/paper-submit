import React, { useState } from 'react'
import axios from 'axios';
// hook
import useSearch from '../../hook/useSearch'
// react boostatrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PaginationComponent from '../Pagination';

function Host() {

    const {
        data,
        error,
        status,
        page,
        totalPages,
        setData,
        handleSearchChange,
        handleNextPage,
        handlePreviousPage,
        handleLastPage,
        handleFirstPage,
        handleNumberPage
    } = useSearch("/api/user/search/host")
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const [createError, setCreateError] = useState('')
    const [createLoading, setCreateLoading] = useState(false)
    const handleCreate = async (e) => {
        e.preventDefault()
        setCreateLoading(true)
        try {
            const res = await axios.post('/api/user/host/add', {
                username,
                name,
                password,
                email,
            })
            setData([res.data, ...data])
            toast.success('เพิ่มผู้จัดงานสำเร็จ')
            setUsername('')
            setPassword('')
            setEmail('')
            setName('')
            handleClose()
        } catch (error) {
            setCreateError(error.response.data?.error)
            toast.error(error.response.data?.error)
        } finally {
            setCreateLoading(false)
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
                            <label className='form-label'>ชื่อ - นามสกุล</label>
                            <input className='form-control' required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>อีเมล</label>
                            <input type='email' className='form-control' required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>ชื่อผู้ใช้งาน (8-20 ตัวอักษร)</label>
                            <input className='form-control' required value={username} onChange={e => setUsername(e.target.value)} />
                            <div className='form-text'>
                                สามารถใช้ _ หรือ . ได้
                            </div>
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>รหัสผ่าน (ขั้นต่ำ 8 ตัวอักษร)</label>
                            <input className='form-control' name='password' type='password' required onChange={e => setPassword(e.target.value)} />
                            <div className='form-text'>
                                รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลขและอักษรพิเศษอย่างละ 1 ตัวอักษร
                            </div>
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>ยืนยันรหัสผ่านอีกครั้ง</label>
                            <input className='form-control' name='confirm_password' type='password' required pattern={password} />
                        </div>
                        {createError &&
                            <div className='text-danger'>
                                {createError}
                            </div>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="" onClick={handleClose}>
                            ปิด
                        </Button>
                        <Button variant="primary" type='submit' disabled={createLoading}>
                            สร้าง
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className='fw-bold mb-0'>ผู้จัดงานประชุม</h6>
                    <button className='btn btn-primary' type='button' onClick={handleShow}>
                        เพิ่มผู้จัดงานประชุม
                    </button>
                </div>
                <form onSubmit={handleSearchChange} className='mb-3'>
                    <input
                        type="search"
                        name='search'
                        placeholder="ค้นหา"
                        className='form-control text-bg-light'
                    />
                </form>
            </div>
            <div className='table-responsive' style={{ minHeight: "200px" }}>
                {status === 'idle' || status === 'loading' ? (
                    <div className='m-4'>
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
                                <th>เครื่องมือ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                <>
                                    {data?.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{(page - 1) * 10 + (index + 1)}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                <Link className='btn btn-light' to={`/admin/user/${item._id}`}>
                                                    <i className='bi bi-pencil-square'></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr className='text-center'>
                                    <td colSpan={4} className='p-3'>ไม่พบข้อมูล</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )
                }
            </div>
            <PaginationComponent
                currentPage={page}
                onFirstPage={handleFirstPage}
                onLastPage={handleLastPage}
                onPageNext={handleNextPage}
                onPagePrev={handlePreviousPage}
                onSelectPage={handleNumberPage}
                totalPages={totalPages}
            />
        </div>
    )


}

export default Host