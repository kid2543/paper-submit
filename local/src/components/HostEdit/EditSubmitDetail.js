import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'



function EditSubmitDetail({ addItem, submit, handleChange, handleDel }) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='fw-bold'>ข้อแนะนำการส่งบทความ</h4>
            </div>
            <div className='mb-5'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <p className='text-muted mb-0'>รายการแนะนำการส่งบทความ</p>
                    <button type='button' className='btn btn-outline-primary btn-sm' onClick={handleShow}><ion-icon name="pencil-outline"></ion-icon> Edit</button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>แก้ไขการแนะนำการส่งบทความ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-end'>
                            <button type='button' onClick={() => addItem(1)} className='btn btn-outline-primary btn-sm'>Add +</button>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>รายละเอียด</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submit?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <textarea onChange={e => handleChange(index, e, 1)} className='form-control' defaultValue={item} />
                                            </td>
                                            <td>
                                                <Dropdown drop='down-centered'>
                                                    <Dropdown.Toggle variant="btn" id="dropdown-basic">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleDel(index)}>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>แนวทางการส่งบทความ</Accordion.Header>
                        <Accordion.Body>
                            <ol>
                                {submit?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })}
                            </ol>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default EditSubmitDetail