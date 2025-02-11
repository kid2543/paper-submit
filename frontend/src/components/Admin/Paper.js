import React, { useState } from 'react'
import axios from 'axios'

// hook
import useSearch from '../../hook/useSearch'

// component
import LoadingPage from '../LoadingPage'
import PaperStatus from '../PaperStatus'
import { PaperResult } from '../PaperStatus'

// react boostrap
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ConfirmDeleteDialog from '../ConfirmDeleteDialog'


function AdminPaper() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/paper/search")
    const navigate = useNavigate()

    // cancel confirm
    const [showCancel, setShowCancel] = useState(false)
    const [cancelId, setCancelId] = useState('')
    const handleShowCancel = (id) => {
        setCancelId(id)
        setShowCancel(true)
    }
    const handleCloseCancel = () => {
        setCancelId('')
        setShowCancel(false)
    }

    const cancelPaper = async (paper_id) => {
        try {
            await axios.patch('/api/paper/status', {
                id: paper_id,
                status: 'CANCEL'
            })
            toast.success('อัพเดทข้อมูลสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('ไม่สามารถอัพเดทข้อมูลได้')
        }
    }

    // delete confirm

    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const handleClose = () => {
        setShow(false)
        setDeleteId('')
    }
    const handleShow = (id) => {
        setShow(true)
        setDeleteId(id)
    }

    const handleDelete = async (paper_id) => {
        try {
            await axios.delete(`/api/paper/${paper_id}`)
            setData(data.filter(items => items._id !== paper_id))
            toast.success('ลบบทความสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        }
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <ConfirmDeleteDialog
                header={`ต้องการลบบทความหรือไม่ ? `}
                message='หากบทความอยู่ระหว่างการดำเนินการจะไม่สามารถลบได้'
                onCancel={handleClose}
                onConfirm={() => handleDelete(deleteId.id)}
                show={show}
            />
            <ConfirmDeleteDialog 
                header={`ต้องการยกเลิกบทความหรือไม่ ?`}
                message='หากทำการยกเลิกแล้วจะไม่สามารถเปลี่ยนสถานะกลับมาเป็นเหมือนเดิมได้'
                onCancel={handleCloseCancel}
                onConfirm={() => cancelPaper(cancelId)}
                show={showCancel}
            />
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <h4 className='fw-bold card-title mb-3'>รายการบทความ</h4>
                    <form onSubmit={handleSearchChange}>
                        <input type='search' className='form-control' name='search' placeholder='ค้นหา...' />
                    </form>
                    {status === 'idle' || status === 'loading' ? (
                        <LoadingPage />
                    ) : (
                        <div className='table-responsive' style={{ minHeight: '400px', minWidth: '1000px' }}>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>รหัสบทความ</th>
                                        <th style={{ width: 500 }}>ชื่อบทความ</th>
                                        <th>สถานะ</th>
                                        <th>ผลลัพธ์</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((items) => (
                                        <tr key={items._id}>
                                            <td>{items.paper_code}</td>
                                            <td>{items.title}</td>
                                            <td>
                                                <PaperStatus status={items.status} />
                                            </td>
                                            <td>
                                                <PaperResult status={items.result} />
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        onClick={() => navigate(`/host/paper/${items._id}`)}
                                                        type='button'
                                                        className="btn btn-light"
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    {items.status !== 'CANCEL' &&
                                                        <button
                                                            type='button'
                                                            className="btn btn-light text-warning"
                                                            onClick={() => handleShowCancel(items._id)}
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    }
                                                    {items.status === 'CANCEL' &&
                                                        <button
                                                            type='button'
                                                            className="btn btn-light text-danger"
                                                            onClick={() => handleShow(items._id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    }
                                                </div>

                                                {/* <Dropdown>
                                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item type='button' onClick={() => navigate('/host/paper/' + items._id)}>
                                                            <span className='me-2'><i className='bi bi-eye'></i></span>
                                                            ดูเพิ่มเติม
                                                        </Dropdown.Item>
                                                        {items.status !== 'CANCEL' &&
                                                            <Dropdown.Item className='text-danger' type='button' onClick={() => cancelPaper(items._id, items.paper_code)}>
                                                                <span className='me-2'><i className='bi bi-x-circle'></i></span>
                                                                ยกเลิก
                                                            </Dropdown.Item>
                                                        }
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDelete(items._id, items.paper_code)}>
                                                            <span className='me-2'><i className='bi bi-trash'></i></span>
                                                            ลบ
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>{`Page ${page} of ${totalPages}`}</span>
                        <div>
                            <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                                <i className='bi bi-arrow-left'></i> ก่อนหน้า
                            </button>
                            <button onClick={handleNextPage} disabled={page === totalPages} className='btn btn-link'>
                                ถัดไป <i className='bi bi-arrow-right'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AdminPaper