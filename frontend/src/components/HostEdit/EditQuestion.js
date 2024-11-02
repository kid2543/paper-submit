import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const api = process.env.REACT_APP_API_URL

function EditQuestion() {

    const [id, setId] = useState("")
    const [q, setQ] = useState([])
    const [text, setText] = useState("")
    const [editText, setEditText] = useState("")
    const [editIndex, setEditIndex] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const handleAdd = (e) => {
        e.preventDefault()
        if (text) {
            setQ([...q, text])
            setText("")
            e.target.question.value = ""
            handleClose()
        } else {
            alert("กรุณากรอกคำถาม")
        }
    }

    const handleSave = async () => {
        try {
            await axios.patch(api + "/update/conferences/" + id, {
                question: q
            })
            alert("อัพเดทข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDel = (index) => {
        setQ(q.filter((item, idx) => idx !== index))
    }

    const handleEdit = (index) => {
        setQ((prev) => {
            const update = [...prev]
            update[index] = editText
            return update
        })
        setEditIndex(null)
    }

    const updateEditStatus = (index, text) => {
        setEditIndex(index)
        setEditText(text)
    }


    useEffect(() => {

        const confr_id = sessionStorage.getItem("host_confr")
        setId(confr_id)

        const fethQna = async () => {
            try {
                const res = await axios.get(api + "/get/question/" + confr_id)
                setQ(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethQna()
    }, [])

    return (
        <div>
            <NewQuestion show={show} handleClose={handleClose} setText={setText} handleAdd={handleAdd} />
            <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h4 className='fw-bold'>แบบประเมิน</h4>
                <button className='btn btn-outline-primary btn-sm' type='button' onClick={handleShow}>New Question +</button>
            </div>
            <p className='text-muted'>รายการคำถาม</p>
            {q.length > 0 ? (
                <div className='table-responsive' style={{ minHeight: "480px" }}>
                    <div className='mb-3'>
                        <button type='button' onClick={handleSave} className='btn btn-outline-success btn-sm'>Save</button>
                    </div>
                    <table className='table table-hover h-100'>
                        <thead>
                            <tr>
                                <th>คำถาม</th>
                                <th>tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {q?.map((item, index) => (
                                <tr key={index}>
                                    {editIndex === index ? (
                                        <>
                                            <td>
                                                <input onChange={e => setEditText(e.target.value)} defaultValue={item} className='form-control' />
                                            </td>
                                            <td>
                                                <button className='btn text-success' type='button' onClick={() => handleEdit(index)}><ion-icon name="save"></ion-icon></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="btn">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => updateEditStatus(index, item)}>
                                                            <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleDel(index)}>
                                                            <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            ) :
                <SearchItemNotFound />
            }
        </div >
    )
}

export default EditQuestion

function NewQuestion({ show, handleClose, setText, handleAdd }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Question</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleAdd}>
                <Modal.Body>
                    <label className='form-label text-muted'>คำถาม</label>
                    <input name='question' onChange={e => setText(e.target.value)} className='form-control' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Add +
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}