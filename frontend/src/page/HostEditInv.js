import React, { useState } from 'react'
import useFetch from '../hook/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

// asset
import mockImage from '../asset/logo.png'

// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import { toast, ToastContainer } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

const api = process.env.REACT_APP_API_URL

function HostEditInv() {

    const id = sessionStorage.getItem('host_confr')
    const { data, setData, loading, error } = useFetch('/api/inv/' + id)

    // modal data
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUploadImageModal, setShowUploadImageModal] = useState(false)
    const [showCvModal, setShowCvModal] = useState(false)
    const [uploadId, setUploadId] = useState('')
    const [uploadName, setUploadName] = useState('')

    // confirm delete
    const [showDialog, setShowDialog] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const handleShowUploadImage = (id, name) => {
        setUploadId(id)
        setUploadName(name)
        setShowUploadImageModal(true)
    }

    const handleShowCvModal = (id, name) => {
        setUploadId(id)
        setUploadName(name)
        setShowCvModal(true)
    }

    const clearData = () => {
        setUploadId('')
        setUploadName('')
    }

    // confirm modal fn
    const handleShowDialog = (id) => {
        setDeleteId(id)
        setShowDialog(true)

    }

    const handleCancel = () => {
        setDeleteId('')
        setShowDialog(false)
    }

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await axios.delete('/api/inv/' + deleteId)
                setData(data.filter(item => item._id !== deleteId))
                toast.success('ลบพิธีกรสำเร็จ')
                handleCancel()
            } catch (error) {
                console.log(error)
                toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่ในภายหลัง')
            }
        } else {
            return
        }

    }

    const updateInv = async (e, inv_id) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const json = Object.fromEntries(formData.entries())
        try {
            await axios.patch('/api/inv/update/' + inv_id, json)
            toast.success('แก้ไขพิธีกรสำเร็จ')
        } catch (error) {
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่ภายหลัง')
            console.log(error)
        }
    }

    if (loading === 'idle' || loading === 'loading') {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }


    return (
        <div className='py-5'>
            <ToastContainer />
            <div className='mb-4'>
                <h4 className='fw-bold '>พิธีกร</h4>
                <p className='text-muted'>เพิ่มพิธีกรรวมถึงแก้ไขรายละเอียดเกี่ยวกับพิธีกรได้ที่นี่</p>
            </div>
            <div className='card shadow-sm border-0 mb-4'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6 className='fw-bold mb-0'>เพิ่มพิธีกร</h6>
                        <button className='btn btn-primary' type='button' onClick={() => setShowCreateModal(true)}>
                            <i className='me-2 bi bi-plus-lg'></i>
                            เพิ่มพิธีกร
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <CreateInvModal
                    show={showCreateModal}
                    handleClose={setShowCreateModal}
                    id={id}
                    data={data}
                    setData={setData}
                />
                <UploadImage
                    show={showUploadImageModal}
                    handleClose={() => setShowUploadImageModal(false)}
                    id={uploadId}
                    name={uploadName}
                />
                <UploadCv
                    show={showCvModal}
                    handleClose={() => setShowCvModal(false)}
                    id={uploadId}
                    name={uploadName}
                    clearData={clearData}
                />
                <ConfirmDeleteDialog
                    show={showDialog}
                    header='ยืนยันการลบพิธีกร'
                    message='ต้องการลบรายละเอียดและรูปภาพของพิธีกรท่านนี้หรือไม่'
                    onCancel={handleCancel}
                    onConfirm={handleDelete}
                />
                <h6 className='fw-bold mb-4'>รายละเอียดพิธีกร</h6>
                {data &&
                    <div className='row g-3'>
                        {data.map((items, index) => (
                            <div className='col-12 position-relative' key={items._id}>
                                <h6 className='mb-3'>พิธีกรท่านที่: {index + 1}</h6>
                                <div className="card">
                                    <div className='card-body text-center'>
                                        {items.img ? (
                                            <img src={`/uploads/${items.img}`} className='border rounded-circle p-3' alt={items.img} />
                                        ) : (
                                            <img src={mockImage} className='border rounded-circle p-3' alt={mockImage} />
                                        )}
                                        <div className='mt-2'>
                                            <button type='button' onClick={() => handleShowUploadImage(items._id, items.name)} className='btn btn-light'>เปลี่ยน</button>
                                        </div>
                                    </div>
                                    <div className='position-absolute top-0 end-0'>
                                        <button type='button' onClick={() => handleShowDialog(items._id)} className='m-3 btn btn-danger'>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                    <div className='card-body'>
                                        <form className='row g-3' onSubmit={e => updateInv(e, items._id)}>
                                            <div className='col-12'>
                                                <label className='form-label'>ชื่อพิธีกร</label>
                                                <input name='name' className='form-control' defaultValue={items.name} />
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>รายละเอียด</label>
                                                <textarea name='desc' className='form-control' defaultValue={items.desc} />
                                            </div>
                                            <div className='col-12'>
                                                <label className='form-label'>Keynote</label>
                                                <input name='keynote' className='form-control' defaultValue={items.keynote} />
                                            </div>
                                            <div>
                                                <button type='submit' className='btn btn-primary'>Update</button>
                                            </div>
                                            <div>
                                                <p>
                                                    {items.cv &&
                                                        <a href={`${api}/uploads/${items.cv}`} target='_blank' rel='noreferrer'>CV-{items.name}</a>
                                                    }
                                                </p>
                                                <button type='button' onClick={() => handleShowCvModal(items._id, items.name)} className='btn btn-light'>Upload CV</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div >
    )
}

export default HostEditInv

function CreateInvModal(props) {

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append('confr_id', props.id)
            const json = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/inv', json)
            props.setData([...props.data, res.data])
            alert('Success')
            props.handleClose()
        } catch (error) {
            console.log(error)
            alert('Error')
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มพิธีกร</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อพิธีกร</label>
                        <input className='form-control' name='name' required />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียด</label>
                        <textarea name='desc' className='form-control' required />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>Keynote</label>
                        <input name='keynote' className='form-control' required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function UploadImage(props) {

    const [imageFile, setImageFile] = useState(null)

    const closeModal = () => {
        setImageFile(null)
        props.handleClose()
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('image', imageFile)
            await axios.patch('/api/inv/img/' + props.id, formData)
            alert('Success')
            closeModal()
        } catch (error) {
            alert('Error')
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Upload รูปภาพ: <span className='text-primary'>{props.name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpload}>
                <Modal.Body>
                    <div>
                        <label className='form-label'>Upload</label>
                        <input type='file' accept='image/*' className='form-control' onChange={e => setImageFile(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!imageFile} >
                        Upload
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function UploadCv(props) {

    const [cvFile, setCvFile] = useState(null)

    const closeModal = () => {
        setCvFile(null)
        props.handleClose()
        props.clearData()
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('file', cvFile)
            await axios.patch('/api/inv/cv/' + props.id, formData)
            alert('Success')
            closeModal()
        } catch (error) {
            alert('Error')
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Upload รูปภาพ: <span className='text-primary'>{props.name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpload}>
                <Modal.Body>
                    <div>
                        <label className='form-label'>Upload</label>
                        <input className='form-control' type='file' accept='.pdf, .doc' onChange={e => setCvFile(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!cvFile} >
                        Upload
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}