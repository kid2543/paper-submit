import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'


function EditPresentation({ addItem, handleChange, handleDel, presenter, chair, audience }) {

    const [showP, setShowP] = useState(false);
    const [showC, setShowC] = useState(false)
    const [showA, setShowA] = useState(false)

    const handleCloseP = () => setShowP(false);
    const handleShowP = () => setShowP(true);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);
    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);

    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='fw-bold'>ข้อแนะนำ</h4>
            </div>
            <div className='mb-5'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <p className='text-muted mb-0'>สำหรับผู้นำเสนอ</p>
                    <button type='button' onClick={handleShowP} className='btn btn-outline-primary btn-sm'><ion-icon name="pencil-outline"></ion-icon> Edit</button>
                </div>
                <Modal show={showP} onHide={handleCloseP}>
                    <Modal.Header closeButton>
                        <Modal.Title>ข้อแนะนำสำหรับผู้นำเสนอ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <button type='button' className='btn btn-primary btn-sm' onClick={() => addItem(1)}>Add +</button>
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
                                {presenter?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <textarea onChange={e => handleChange(index, e, 1)} className='form-control' defaultValue={item} />
                                            </td>
                                            <td>
                                                <Dropdown drop='down-centered'>
                                                    <Dropdown.Toggle variant="btn">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleDel(index, 1)}>
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
                        <Button variant="secondary" onClick={handleCloseP}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseP}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>สำหรับผู้นำเสนอ</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {presenter?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className='mb-5'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <p className='text-muted mb-0'>สำหรับ sesstion chair</p>
                    <button type='button' onClick={handleShowC} className='btn btn-outline-primary btn-sm'><ion-icon name="pencil-outline"></ion-icon> Edit</button>
                </div>
                <Modal show={showC} onHide={handleCloseC}>
                    <Modal.Header closeButton>
                        <Modal.Title>ข้อแนะนำสำหรับผู้นำเสนอ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <button type='button' className='btn btn-primary btn-sm' onClick={() => addItem(2)}>Add +</button>
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
                                {chair?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <textarea onChange={e => handleChange(index, e, 2)} className='form-control' defaultValue={item} />
                                            </td>
                                            <td>
                                                <Dropdown drop='down-centered'>
                                                    <Dropdown.Toggle variant="btn">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleDel(index, 2)}>
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
                        <Button variant="secondary" onClick={handleCloseC}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseC}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>สำหรับ Sesstion Chair</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {chair?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className='mb-5'>
                <div className='mb-3 d-flex justify-content-between align-items-center'>
                    <p className='text-muted mb-0'>สำหรับ Audience</p>
                    <button type='button' onClick={handleShowA} className='btn btn-outline-primary btn-sm'><ion-icon name="pencil-outline"></ion-icon> Edit</button>
                </div>
                <Modal show={showA} onHide={handleCloseA}>
                    <Modal.Header closeButton>
                        <Modal.Title>ข้อแนะนำสำหรับผู้นำเสนอ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <button type='button' className='btn btn-primary btn-sm' onClick={() => addItem(3)}>Add +</button>
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
                                {audience?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <textarea onChange={e => handleChange(index, e, 3)} className='form-control' defaultValue={item} />
                                            </td>
                                            <td>
                                                <Dropdown drop='down-centered'>
                                                    <Dropdown.Toggle variant="btn">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleDel(index, 3)}>
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
                        <Button variant="secondary" onClick={handleCloseA}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseA}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>สำหรับ Audience</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {audience?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default EditPresentation