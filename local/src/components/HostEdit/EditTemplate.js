import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import pdfIcon from '../../asset/pdf.png'


const api = process.env.REACT_APP_API_URL

function EditTemplate() {

    const [id, setId] = useState("")
    const [templateUpload, setTemplateUpload] = useState(null)
    const [templateData, setTemplateData] = useState([])
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)



    const deleteTemplate = async (templateId, filename) => {
        if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
            try {
                const res = await axios.delete(api + "/delete/template/" + templateId + "/" + filename)
                console.log(res)
                alert("ลบสำเร็จ")
            } catch (error) {
                console.log(error)
            } finally {
                setTemplateData(templateData.filter((item) => item._id !== templateId))
            }
        }
    }

    const uploadTemplate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", e.target.name.value)
            formData.append("file", templateUpload)
            formData.append("confr_id", id)
            const res = await axios.post(api + "/upload/template/" + id, formData)
            alert("อัพโหลดข้อมูลสำเร็จ")
            setTemplateData([...templateData, res.data])
            handleClose()
        } catch (error) {
            console.log(error)
        } finally {
            e.target.name.value = ""
            e.target.file.value = null
        }
    }

    useEffect(() => {

        const confr_id = sessionStorage.getItem("host_confr")
        setId(confr_id)

        const fethTemplate = async () => {
            try {
                const res = await axios.get(api + "/get/template/" + confr_id)
                setTemplateData(res.data)
                console.log("template", res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethTemplate()
    }, [])

    return (
        <div className='mb-5'>
            <CreateTemplateModal show={show} handleClose={handleClose} uploadTemplate={uploadTemplate} setTemplateUpload={setTemplateUpload} />
            <div className='mb-3'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h4 className='fw-bold'>อัพโหลด Template </h4>
                    <button className='btn btn-outline-primary btn-sm' onClick={handleShow}>New template +</button>
                </div>
            </div>
            <div>
                {templateData.length > 0 ? (
                    <ul className='list-group'>
                        {templateData.map((item) => (
                            <li className='list-group-item d-flex justify-content-between align-items-center' key={item._id}>
                                <div>
                                    <img src={pdfIcon} alt='pdf' height={32} width={32} className='me-2' />
                                    <small>{item.name}</small>
                                </div>
                                <div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="btn">
                                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => window.open(api + "/pdf/" + item.file)}>
                                                <span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>
                                                <small>View</small>
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => deleteTemplate(item._id, item.file)}>
                                                <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                <small>Delete</small>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                ) : (
                    <SearchItemNotFound />
                )}
            </div>
        </div>
    )
}

export default EditTemplate


function CreateTemplateModal({ show, handleClose, uploadTemplate, setTemplateUpload }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <form onSubmit={uploadTemplate}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไฟล์</label>
                        <input name='name' className='form-control' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>เลือกไฟล์</label>
                        <input name='file' accept='application/pdf' type='file' className='form-control' onChange={e => setTemplateUpload(e.target.files[0])} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Upload template
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}