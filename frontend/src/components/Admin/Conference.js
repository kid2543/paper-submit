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
import PaginationComponent from "../Pagination";

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
        handlePreviousPage,
        handleFirstPage,
        handleLastPage,
        handleNumberPage
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

    const handleEdit = (id, confr_code) => {
        sessionStorage.setItem("host_confr", id)
        sessionStorage.setItem('confr_code', confr_code)
        navigate("/host/confr/")
    }

    // confirm delete
    const [showDeleteConfr, setShowDeleteConfr] = useState(false)
    const [confrDeleteId, setConfrDeleteId] = useState('')

    const handleShowDeleteConfr = (id) => {
        setConfrDeleteId(id)
        setShowDeleteConfr(true)
    }

    const handleCloseDeleteConfr = () => {
        setConfrDeleteId('')
        setShowDeleteConfr(false)
    }

    const handleDelete = async () => {
        if(!confrDeleteId) {
            toast.warning('กรุณาเลือกงานประชุมก่อนทำการลบ')
            return 
        }
        
        try {
            await axios.delete('/api/conference/admin/delete/' + confrDeleteId)
            toast.success('ลบงานประชุมสำเร็จ')
            setData(data.filter(items => items._id !== confrDeleteId))
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            handleCloseDeleteConfr()
        }
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
                header={`ยืนยันการลบงานประชุม`}
                message='ต้องการลบงานประชุมหรือไม่ เนื่องจากจะไม่สามารถกู้คืนข้อมูลได้'
                onCancel={handleCloseDeleteConfr}
                onConfirm={() => handleDelete(confrDeleteId)}
                show={showDeleteConfr}
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
                                        <th>#</th>
                                        <th>ชื่อ</th>
                                        <th>รหัส</th>
                                        <th>สิ้นสุด</th>
                                        <th>สถานะ</th>
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                {data?.length > 0 ? (
                                    <tbody>
                                        {data?.map((item,index) => (
                                            <tr key={item._id}>
                                                <td>{(page -1 ) * 10 + (index  + 1)}</td>
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
                                                        <button type="button" className="btn btn-light" onClick={() => handleEdit(item._id, item.confr_code)}>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button className="btn btn-light text-danger" type="button" onClick={() => handleShowDeleteConfr(item._id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
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
            </div>

        </div>
    )

}

export default Conference