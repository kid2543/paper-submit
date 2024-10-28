import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import SearchItemNotFound from '../SearchItemNotFound'
import UserIcon from '../../asset/user.png'

const api = process.env.REACT_APP_API_URL

function UploadCV({ show, handleClose, uploadCV, invId, setCV }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload CV</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => uploadCV(e, invId)}>
                <Modal.Body>
                    <input type='file' className='form-control' accept='application/pdf' onChange={e => setCV(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button type='submit' className="btn btn-primary">
                        Upload
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function UploadInvImage({ show, handleClose, invId, uploadImage, setImage }) {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload รูปพิธีกร</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => uploadImage(e, invId)}>
                <Modal.Body>
                    <input type='file' className='form-control' accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <button type='button' className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button type='submit' className="btn btn-primary">
                        Upload
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function CreateInvModal({ show, handleClose, createInv }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New</Modal.Title>
            </Modal.Header>
            <form onSubmit={createInv}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อวิทยากรรับเชิญ</label>
                        <input name='name' className='form-control' type='text' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>รายละเอียด</label>
                        <textarea name='desc' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>Keynote</label>
                        <input name='keynote' className='form-control' type='text' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' type='button' onClick={handleClose}>Close</button>
                    <button className='btn btn-primary' type='submit'>Create</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditInv() {


    const [id, setId] = useState("")
    const [show, setShow] = useState(false)
    const [uploadImageShow, setUploadImageShow] = useState(false)
    const [invImage, setInvImage] = useState(null)
    const [invSpeakerId, setInvSpeakerId] = useState("")
    const [invSpeaker, setInvSpeaker] = useState([])
    const [uploadCV, setUploadCV] = useState(null)
    const [uploadCVShow, setUploadCVShow] = useState(false)
    const [invDetail, setInvDetail] = useState({
        name: "",
        desc: "",
        keynote: "",

    })
    const [showEdit, setShowEdit] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleShowEdit = () => setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)

    //uploadImage
    const showUploadImage = (invId) => {
        setInvSpeakerId(invId)
        setUploadImageShow(true)
    }
    const closeUploadImage = () => setUploadImageShow(false)

    //upload CV
    const showUploadCV = (invId) => {
        setInvSpeakerId(invId)
        setUploadCVShow(true)
    }
    const closeUploadCV = () => setUploadCVShow(false)

    const createInv = async (e) => {
        e.preventDefault()
        const input = e.target
        try {
            const res = await axios.post(api + "/create/inv", {
                name: input.name.value,
                desc: input.desc.value,
                keynote: input.keynote.value,
                confr_id: id
            })
            alert("เพิ่มพิธีกรสำเร็จ")
            let newItem = [...invSpeaker]
            newItem.push(res.data)
            setInvSpeaker(newItem)
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const invImageUpload = async (e, invId) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", invImage)
        try {
            const res = await axios.patch(api + "/upload/image/inv/" + invId, formData)
            alert("อัพโหลดข้อมูลสำเร็จ")
            const newItem = invSpeaker.map(item => {
                if (item._id === invId) {
                    return {
                        ...item,
                        img: res.data
                    }
                } else {
                    return item
                }
            })
            setInvSpeaker(newItem)
            closeUploadImage()
        } catch (error) {
            console.log(error)
        }
    }

    const invCVUpload = async (e, invId) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", uploadCV)
        try {
            await axios.patch(api + "/upload/file/inv/" + invId, formData)
            alert("อัพโหลดข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
        } finally {
            closeUploadCV()
        }
    }

    const handleEdit = (invId, name, desc, keynote) => {
        setInvDetail({
            _id: invId,
            name: name,
            desc: desc,
            keynote: keynote
        })
        handleShowEdit()
    }

    const invDetailUpdate = async (e) => {
        e.preventDefault()
        if (invDetail.name !== "" && invDetail.desc !== "" && invDetail.keynote !== "") {
            try {
                const res = await axios.patch(api + "/update/inv/" + invDetail._id, invDetail)
                alert("บันทึกสำเร็จ:" + res.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("กรุณากรอกข้อมูลให้ครบ")
        }

    }

    const handleDelInv = async (invId, image, cv) => {
        try {
            const del = await axios.delete(api + `/delete/inv/${invId}/${image}/${cv}`)
            setInvSpeaker(invSpeaker.filter((item) => item._id !== invId))
            console.log(del)
            alert("ลบข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด")
        }
    }

    useEffect(() => {

        const confr_id = sessionStorage.getItem("host_confr")
        setId(confr_id)

        const fethInv = async () => {
            try {
                const res = await axios.get(api + "/get/inv/" + confr_id)
                setInvSpeaker(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethInv()
    }, [])

    return (
        <div>
            <EditInvDetail show={showEdit} handleClose={handleCloseEdit} data={invDetail} setData={setInvDetail} handleUpdate={invDetailUpdate} />
            <CreateInvModal show={show} handleClose={handleClose} createInv={createInv} />
            <UploadInvImage show={uploadImageShow} handleClose={closeUploadImage} invId={invSpeakerId} uploadImage={invImageUpload} setImage={setInvImage} />
            <UploadCV show={uploadCVShow} handleClose={closeUploadCV} invId={invSpeakerId} uploadCV={invCVUpload} setCV={setUploadCV} />
            <div className='mb-3'>
                <div className='d-flex justify-content-between mb-3 align-items-center'>
                    <h4 className='fw-bold'>รายละเอียดวิทยากรรับเชิญ</h4>
                    <button className='btn btn-outline-primary btn-sm' type='button' onClick={handleShow}>Create New +</button>
                </div>
            </div>
            {invSpeaker.length > 0 ? (
                <div className='row gy-5'>
                    {invSpeaker.map((item) => (
                        <div key={item._id} className='col-12 col-md-6 col-lg-4'>
                            <div className='card p-3 h-100'>
                                <div className='text-end mb-2'>
                                    <Dropdown drop='down-centered'>
                                        <Dropdown.Toggle variant="btn" id="dropdown-basic">
                                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEdit(item._id, item.name, item.desc, item.keynote)}>
                                                <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelInv(item._id, item.img, item.cv)}>
                                                <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                Delete
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => showUploadImage(item._id)}>
                                                <span className='me-2'><ion-icon name="image-outline"></ion-icon></span>
                                                Upload Image
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => showUploadCV(item._id)}>
                                                <span className='me-2'><ion-icon name="document-outline"></ion-icon></span>
                                                Upload Cv
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {item.img ? <img src={api + "/image/" + item.img} alt={"invite speaker " + item.img} className='card-img-top' /> : <img src={UserIcon} alt="inv" className='card-img-top' />}
                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        {item.name}
                                    </h5>
                                    <p className='card-text'>{item.desc}</p>
                                    <div>
                                        {item.cv ?
                                            <a href={api + "/pdf/" + item.cv} target='_blank' className='btn btn-outline-secondary' rel='noreferrer'>
                                                <span className='me-2'><ion-icon name="document-outline"></ion-icon> CV</span>
                                                CV
                                            </a> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <SearchItemNotFound />}

        </div >
    )
}

export default EditInv

function EditInvDetail({ show, handleClose, data, setData, handleUpdate }) {

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>ชื่อ</label>
                            <input className='form-control' onChange={e => setData({ ...data, name: e.target.value })} defaultValue={data.name} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>รายละเอียด</label>
                            <textarea className='form-control' onChange={e => setData({ ...data, desc: e.target.value })} defaultValue={data.desc} required />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>Keynote</label>
                            <input className='form-control' onChange={e => setData({ ...data, keynote: e.target.value })} defaultValue={data.keynote} required />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

