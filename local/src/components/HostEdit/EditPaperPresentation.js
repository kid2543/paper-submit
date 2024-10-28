import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

function EditPaperPresentation({ data, remark, addItem, handleChange, handleDel, handleRemark }) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='mb-5'>
            <div className="mb-3">
                <h4 className='fw-bold'>แนวทางการนำเสนอบทความ</h4>
            </div>
            <div className='mb-3'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <p className='text-muted mb-0'>รายการแนวทางการนำเสนอ</p>
                    <button type='button' className='btn btn-outline-primary btn-sm' onClick={handleShow}><ion-icon name="pencil-outline"></ion-icon> Edit</button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>แนวทางการนำเสนอ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='text-end mb-3'>
                            <button onClick={addItem} className='btn btn-outline-primary btn-sm'>Add +</button>
                        </div>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>รายละเอียด</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <textarea className='form-control' defaultValue={item} onChange={e => handleChange(index, e)} />
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
                        <Accordion.Header>แนวทางการนำเสนอ</Accordion.Header>
                        <Accordion.Body>
                            {data.length > 0 ? (
                                <ol>
                                    {data.map((item, index) => {
                                        return (
                                            <li key={index} className='mb-3'>
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ol>
                            ) : (
                                <p>ยังไม่มีรายการ</p>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div>
                <label className='form-label text-muted'>รายละเอียดเพิ่มเติม</label>
                <textarea name='presentation_remark' onChange={e => handleRemark(e)} className='form-control' defaultValue={remark} />
            </div>
        </div>
    )
}

export default EditPaperPresentation