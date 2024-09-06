import dayjs from 'dayjs';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';


function EditDate({ data, addDate, handleChange, handleDel }) {

    const [show, setShow] = useState(false)
    const handleShowModal = () => setShow(true)
    const handleCloseModal = () => setShow(false)
    const today = new Date()

    const addAndCloseModal = () => {
        addDate()
        setShow(false)
    }

    return (
        <div className='mb-5'>
            <div>
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
            <div>
                <button className='btn btn-primary btn-sm' type='button' onClick={handleShowModal}>
                    <span className='fw-bold'>+</span> เพิ่มกำหนดการ
                </button>
                <div className='mt-3'>
                    <p className='text-muted'>รายการกำหนดการ</p>
                    <small>รายการทั้งหมด: <span className='fw-bold'>123,123,123</span></small>
                    <hr />
                </div>
                <div className='table-responsive'>
                    {data?.length > 0 ?
                        (
                            <table className='table table-hover'>
                                <thead className='table-secondary'>
                                    <tr>
                                        <th>ชื่อ</th>
                                        <th>เริ่ม</th>
                                        <th>สิ้นสุด</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((date, index) => {
                                        return (
                                            <tr key={index} className='mb-3'>
                                                <td>{date.name}</td>
                                                <td>
                                                    {dayjs(date.start_date).format("DD MMM YYYY")}
                                                </td>
                                                <td>
                                                    {dayjs(date.end_date).format("DD MMM YYYY")}
                                                </td>
                                                <td>
                                                    <a onClick={() => handleDel(date._id)} type='button' className='text-decoration-none text-danger'>ลบ</a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <p className='fw-bold'>ยังไม่มีกำหนดการ</p>
                        )}
                </div>
            </div>
        </div>
    )
}

export default EditDate