import React, { useState } from 'react'
import useFetch from '../hook/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

// asset
import mockImage from '../asset/logo.png'

// react-bootstrap
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

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
                toast.success('ลบวิทยากรสำเร็จ')
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
            const res = await axios.patch('/api/inv/update/' + inv_id, json)
            let temp = [...data]
            let newData = temp.map(items => {
                if (items._id === inv_id) {
                    return res.data
                } else {
                    return items
                }
            })
            setData(newData)
            toast.success('แก้ไขวิทยากรสำเร็จ')
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
        <div>
            <div className='mb-3 card'>
                <div className="card-body">
                    <h4 className='fw-bold card-title'>วิทยากร</h4>
                    <p className='text-muted card-text'>เพิ่มวิทยากรรวมถึงแก้ไขรายละเอียดเกี่ยวกับวิทยากรได้ที่นี่</p>
                </div>
            </div>
            <div className='card shadow-sm  mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h4 className='card-title'>รายการวิทยากร</h4>
                            <div className='text-muted'>
                                เพิ่มรายละเอียดและอัพโหลดรูปภาพ พร้อมกับประวัติของวิทยากรเพื่อให้ผู้ส่งบทความที่สนใจฟังการบรรยายในงานประชุมได้ทราบข้อมูลเพิ่มเติม
                            </div>
                        </div>
                        <button className='btn btn-primary' type='button' onClick={() => setShowCreateModal(true)}>
                            <i className='me-2 bi bi-plus-lg'></i>
                            เพิ่มวิทยากร
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
                    data={data}
                    setData={setData}
                />
                <UploadCv
                    show={showCvModal}
                    handleClose={() => setShowCvModal(false)}
                    id={uploadId}
                    name={uploadName}
                    clearData={clearData}
                    data={data}
                    setData={setData}
                />
                <ConfirmDeleteDialog
                    show={showDialog}
                    header='ยืนยันการลบวิทยากร'
                    message='ต้องการลบรายละเอียดและรูปภาพของวิทยากรท่านนี้หรือไม่'
                    onCancel={handleCancel}
                    onConfirm={handleDelete}
                />
                {data &&
                    <div className='row g-3'>
                        {data.map((items, index) => (
                            <div className='col-12 col-md-6 position-relative' key={items._id}>
                                <h6 className='mb-3'>วิทยากรท่านที่: {index + 1}</h6>
                                <div className="card h-100">
                                    <div className='card-body text-center'>
                                        {items.img ? (
                                            <img src={`/uploads/${items.img}`} width={288} className='img-fluid img-thumbnail' alt={items.img} />
                                        ) : (
                                            <img src={mockImage} className='img-fluid img-thumbnail' alt={mockImage} />
                                        )}
                                        <div className='mt-2'>
                                            <button type='button' onClick={() => handleShowUploadImage(items._id, items.name)} className='btn btn-light'>เปลี่ยน</button>
                                        </div>
                                    </div>
                                    <div className='position-absolute top-0 end-0'>
                                        <button type='button' onClick={() => handleShowDialog(items._id)} className='m-3 btn btn-danger btn-sm'>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                    <div className='card-body'>
                                        <form className='row g-3' onSubmit={e => updateInv(e, items._id)}>
                                            <div className='col-12'>
                                                <label className='form-label'>ชื่อวิทยากร</label>
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
                                                <p>CV:
                                                    {items.cv &&
                                                        <a className="ms-2" href={`/uploads/${items.cv}`} target='_blank' rel='noreferrer'>{items.name}</a>
                                                    }
                                                </p>
                                            </div>
                                            <button type='button' onClick={() => handleShowCvModal(items._id, items.name)} className='btn btn-outline-dark'>
                                                <i className="bi bi-upload me-2"></i>
                                                อัพโหลด CV
                                            </button>
                                            <button type='submit' className='btn btn-primary'>ยืนยันการแก้ไข</button>

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

    const [createLoading, setCreateLoading] = useState(false)
    const handleCreate = async (e) => {
        e.preventDefault()
        setCreateLoading(true)
        try {
            const formData = new FormData(e.target)
            formData.append('confr_id', props.id)
            const json = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/inv', json)
            props.setData([...props.data, res.data])
            toast.success('เพิ่มวิทยากรสำเร็จ')
            props.handleClose()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
        } finally {
            setCreateLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มวิทยากร</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อวิทยากร</label>
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
                        ปิด
                    </Button>
                    {createLoading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            เพิ่ม
                        </Button>
                    )}
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

    const [uploadLoading, setUploadLoading] = useState(false)
    const handleUpload = async (e) => {
        e.preventDefault()
        setUploadLoading(true)
        try {
            const formData = new FormData()
            formData.append('image', imageFile)
            const res = await axios.patch('/api/inv/img/' + props.id, formData)
            toast.success('อัพโหลดสำเร็จ')
            let temp = [...props.data]
            let newData = temp.map(items => {
                if (items._id === res.data._id) {
                    return res.data
                } else {
                    return items
                }
            })
            props.setData(newData)
            closeModal()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
            console.log(error)
        } finally {
            setUploadLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>อัพโหลดรูปภาพ: <span className='text-primary'>{props.name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpload}>
                <Modal.Body>
                    <div>
                        <label className='form-label'>เลือกรูป</label>
                        <input type='file' accept='image/*' className='form-control' onChange={e => setImageFile(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        ปิด
                    </Button>
                    {uploadLoading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit' disabled={!imageFile} >
                            <i className='bi bi-upload me-2'></i>
                            อัพโหลด
                        </Button>
                    )}
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

    const [uploadLoading, setUploadLoading] = useState(false)
    const handleUpload = async (e) => {
        e.preventDefault()
        setUploadLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', cvFile)
            const res = await axios.patch('/api/inv/cv/' + props.id, formData)
            let temp = [...props.data]
            let newData = temp.map((items) => {
                if (items._id === props.id) {
                    return res.data
                } else {
                    return items
                }
            })
            props.setData(newData)
            toast.success('อัพโหลดสำเร็จ')
            closeModal()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
        } finally {
            setUploadLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>อัพโหลดประวัติ: <span className='text-primary'>{props.name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpload}>
                <Modal.Body>
                    <div>
                        <label className='form-label'>เลือกไฟล์</label>
                        <input className='form-control' type='file' accept='.pdf, .doc' onChange={e => setCvFile(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        ปิด
                    </Button>
                    {uploadLoading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit' disabled={!cvFile} >
                            <i className='bi bi-upload me-2'></i>
                            อัพโหลด
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}