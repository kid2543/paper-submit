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
import Dropdown from 'react-bootstrap/Dropdown';

function Conference() {

    const { data, error, status, page, totalPages, setData, handleSearchChange, handleNextPage, handlePreviousPage } = useSearch("/api/conference/search")
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
            alert("Success")
            handleClose()
        } catch (error) {
            console.log(error)
            setErrorText(error.response.data?.error)
            alert("Error")
        }
    }

    const handleEdit = (id) => {
        sessionStorage.setItem("host_confr", id)
        navigate("/host/confr/")
    }

    const handleDelete = async (confr_id, confr_code, status) => {
        if (status === true) {
            return alert('กรุณาปิดงานประชุมก่อนทำการลบ')
        }

        if (window.confirm(`ต้องการลบงานประชุม ${confr_code} หรือไม่ ?`)) {
            try {
                await axios.delete('/api/conference/delete/' + confr_id)
                setData(data.filter(items => items._id !== confr_id))
                alert(`ลบงานประชุม ${confr_code} แล้ว`)
            } catch (error) {
                console.log(error)
                alert('Error')
            }
        }
    }

    const handleStatus = async (e, confr_id, confr_code) => {
        const { checked } = e.target
        if (window.confirm(`ต้องการเปลี่ยนสถานงานประชุม ${confr_code} หรือไม่ ?`)) {
            if (checked) {
                try {
                    await axios.patch(`/api/conference`, {
                        _id: confr_id,
                        status: true
                    })
                    setData(data.map(items =>
                        items._id === confr_id ?
                            {
                                ...items,
                                status: true
                            } : {
                                items
                            }
                    ))
                    alert("เปิดงานประชุมแล้ว")
                } catch (error) {
                    console.log(error)
                    alert('Error')
                }
            } else {
                try {
                    await axios.patch(`/api/conference`, {
                        _id: confr_id,
                        status: false
                    })
                    setData(data.map(items =>
                        items._id === confr_id ?
                            {
                                ...items,
                                status: false
                            } : {
                                items
                            }
                    ))
                    alert('ปิดงานประชุมแล้ว')
                } catch (error) {
                    console.log(error)
                    alert('Error')
                }
            }
        }
    }

    if (status === 'idie' || status === 'loading') {
        return <LoadingPage />
    }


    if (error) {
        return <div>Error</div>
    }

    return (
        <div className="px-5 py-4">
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
                        <Button variant="secondary" onClick={handleClose}>
                            ปิด
                        </Button>
                        <Button variant="primary" type='submit'>
                            สร้าง
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="fw-bold">รายการงานประชุม</p>
                    <div className='d-flex justify-content-between mb-3'>
                        <form onSubmit={handleSearchChange}>
                            <input className='form-control' placeholder='ค้นหา' name='search' />
                        </form>
                        <div>
                            <button className='btn btn-primary' type='button' onClick={handleShow}>เพิ่มงานประชุม</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className='table table-striped' style={{ minWidth: "500px" }}>
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
                                                <div className='form-check form-switch'>
                                                    <input className='form-check-input' type='checkbox' defaultChecked={item.status} onChange={e => handleStatus(e, item._id, item.confr_code)} />
                                                    {item.status ? (
                                                        <label className='form-check-label'>
                                                            Active
                                                        </label>
                                                    ) : (
                                                        <label className='form-check-label text-muted'>
                                                            Inactive
                                                        </label>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <Dropdown>
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
                                                </Dropdown>
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
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>{`Page ${page} of ${totalPages}`}</span>
                        <div>
                            <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                                <i className="bi bi-arrow-left"></i> Previous
                            </button>
                            <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link'>
                                Next <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Conference