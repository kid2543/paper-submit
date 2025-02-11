import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import useSearch from "../../hook/useSearch";
import dayjs from "dayjs";

// component
import LoadingPage from "../LoadingPage";

// react boostatrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function Conference() {

    const {
        data,
        error,
        status,
        page,
        totalPages,
        setData,
        handleSearchChange,
        handleNextPage,
        handlePreviousPage
    } = useSearch("/api/conference/search")
    const [show, setShow] = useState(false)
    const [errorText, setErrorText] = useState('')

    const navigate = useNavigate()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleCreateConfr = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/conference', value)
            setData([res.data, ...data])
            toast.success("สร้างงานประชุมสำเร็จ กรุณากรอกรายละเอียดเพิ่มเติมและเปิดเป็นสาธารณะ")
            handleClose()
        } catch (error) {
            console.log(error)
            setErrorText(error.response.data?.error)
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง', error.response.data?.error)
        }
    }

    const handleEdit = (id) => {
        sessionStorage.setItem("host_confr", id)
        navigate("/host/confr/")
    }

    const handleDelete = async (confr_id, confr_code, status) => {
        if (status === true) {
            handleCloseDelete()
            return toast.warning('กรุณาปิดงานประชุมก่อนทำการลบ')
        }

        try {
            await axios.delete('/api/conference/delete/' + confr_id)
            setData(data.filter(items => items._id !== confr_id))
            toast.success(`ลบงานประชุม ${confr_code} แล้ว`)
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด ' + error.response.data?.error)
        } finally {
            handleCloseDelete()
        }
    }

    // confirm delete
    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState({
        id: '',
        code: '',
        status: null
    })

    const handleShowDelete = (id, code, status) => {
        setShowDelete(true)
        setDeleteId({
            id,
            code,
            status
        })
    }
    const handleCloseDelete = () => {
        setShowDelete(false)
        setDeleteId({
            id: '',
            code: '',
            status: null
        })
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>สร้างงานประชุม</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleCreateConfr}>
                    <Modal.Body className='row g-3'>
                        <div className='col-12'>
                            <label className='form-label'>ชื่องานประชุม</label>
                            <input className='form-control' name='title' required />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>รหัสงานประชุม</label>
                            <input className='form-control' name='confr_code' required onFocus={() => setErrorText('')} />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>เริ่ม</label>
                            <input className='form-control' type='date' name='confr_start_date' required />
                        </div>
                        <div className='col-12'>
                            <label className='form-label'>สิ้นสุด</label>
                            <input className='form-control' type='date' name='confr_end_date' required />
                        </div>
                        {errorText &&
                            <p className="text-danger">{errorText}</p>
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
            <ConfirmDeleteDialog
                header={`ยืนยันการลบงานประชุม ${deleteId.code} ?`}
                message='หากมีบทความที่ถูกส่งเข้ามายังงานประชุมนี้ จะไม่สามารถลบได้'
                onCancel={handleCloseDelete}
                onConfirm={() => handleDelete(deleteId.id, deleteId.code, deleteId.status)}
                show={showDelete}
            />
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h4 className="mb-0 fw-bold">รายการงานประชุม</h4>
                        <div>
                            <button className='btn btn-primary' type='button' onClick={handleShow}>เพิ่มงานประชุม</button>
                        </div>
                    </div>
                    <form onSubmit={handleSearchChange} className="mb-3">
                        <input className='form-control' placeholder='ค้นหา' name='search' />
                    </form>
                    {status === 'idle' || status === 'loading' ? (
                        <LoadingPage />
                    ) : (
                        <div className="table-responsive">
                            <table className='table' style={{ minWidth: "1000px", minHeight: '400px' }}>
                                <thead>
                                    <tr>
                                        <td>Title</td>
                                        <td>Code</td>
                                        <td>End date</td>
                                        <td>Status</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                {data?.length > 0 ? (
                                    <tbody>
                                        {data?.map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.title}</td>
                                                <td>{item.confr_code}</td>
                                                <td>{dayjs(item.confr_end_date).format("DD MMM YYYY")}</td>
                                                <td>
                                                        {item.status ? (
                                                            <span className="badge bg-success">
                                                                เปิด
                                                            </span>
                                                        ) : (
                                                            <span className="badge bg-secondary">
                                                                ปิด
                                                            </span>
                                                        )}
                                                </td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-light" onClick={() => handleEdit(item._id)}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button className="btn btn-light text-danger" type="button" onClick={() => handleShowDelete(item._id, item.confr_code, item.status)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                    {/* <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <i className="bi bi-three-dots"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleEdit(item._id)} type="button">
                                                            <span className="me-2">
                                                                <i className="bi bi-pen"></i>
                                                            </span>
                                                            แก้ไข
                                                        </Dropdown.Item>
                                                        <Dropdown.Item type='button' onClick={() => handleDelete(item._id, item.confr_code, item.status)} className="text-danger">
                                                            <span className="me-2">
                                                                <i className="bi bi-trash"></i>
                                                            </span>
                                                            ลบ
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={5} className='text-center'>ไม่พบข้อมูล</td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
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

        </div>
    )

}

export default Conference