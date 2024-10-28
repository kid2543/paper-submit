import dayjs from 'dayjs';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import SearchItemNotFound from '../SearchItemNotFound';



function EditDate({ data, addDate, handleChange, handleDel }) {

    const [show, setShow] = useState(false)
    const handleShowModal = () => setShow(true)
    const handleCloseModal = () => setShow(false)

    const addAndCloseModal = () => {
        addDate()
        setShow(false)
    }

    return (
        <div className='mb-5'>
            <div>
                <h4 className='fw-bold mb-3'>กำหนดการ</h4>
                <Modal show={show} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มกำหนดการ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='mb-3'>
                                <label className='form-label'>ชื่อกำหนดการ</label>
                                <input name='name' type='text' className='form-control' onChange={e => handleChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>เริ่ม</label>
                                <input name='start_date' type='date' className='form-control' onChange={e => handleChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>สิ้นสุด</label>
                                <input name='end_date' type='date' className='form-control' onChange={e => handleChange(e)} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className='btn btn-secondary' onClick={handleCloseModal}>
                            Close
                        </button>
                        <button type='button' onClick={addAndCloseModal} className='btn btn-primary'>
                            Add +
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='mb-3 d-flex justify-content-between align-items-center'>
                <p className='text-muted mb-0'>รายการกำหนดการ</p>
                <button className='btn btn-outline-primary btn-sm' type='button' onClick={handleShowModal}>
                    <span className='fw-bold'>+</span> เพิ่มกำหนดการ
                </button>
            </div>
            <div>
                {data?.length > 0 ?
                    (
                        <div className='table-responsive' style={{ minHeight: "480px" }}>
                            <div className='mb-3'>
                                <small className='text-muted'>รายการทั้งหมด: <span className='fw-bold'>{data.length}</span></small>
                            </div>
                            <table className='table table-hover'>
                                <thead className='table-secondary'>
                                    <tr>
                                        <th>ชื่อ</th>
                                        <th>เริ่ม</th>
                                        <th>สิ้นสุด</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((date, index) => {
                                        return (
                                            <tr key={index} className='mb-3'>
                                                <td>{date.name}</td>
                                                <td>
                                                    {date.start_date ? (dayjs(date.start_date).format("DD MMM YYYY")): "-"}
                                                </td>
                                                <td>
                                                    {date.end_date ? (dayjs(date.end_date).format("DD MMM YYYY")): "-"}
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="btn">
                                                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item onClick={() => handleDel(date._id)}>
                                                                <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) :
                    <SearchItemNotFound />
                }
            </div>
        </div>
    )
}

export default EditDate