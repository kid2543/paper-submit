import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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

function EditInv({id}) {

    const [show, setShow] = useState(false)
    const [uploadImageShow, setUploadImageShow] = useState(false)
    const [invImage, setInvImage] = useState(null)
    const [invSpeakerId, setInvSpeakerId] = useState("")
    const [invSpeaker, setInvSpeaker] = useState([])
    const [uploadCV, setUploadCV] = useState(null)
    const [uploadCVShow, setUploadCVShow] = useState(false)
    const [editId, setEditId] = useState("")
    const [invDetail, setInvDetail] = useState({
        name: "",
        desc: "",
        keynote: "",

    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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


    const fethInv = async () => {
        try {
            const res = await axios.get(api + "/get/inv/" + id)
            setInvSpeaker(res.data)
        } catch (error) {
            console.log(error)
        }
    }

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
            setInvSpeaker(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            handleClose()
        }
    }

    const invImageUpload = async (e, invId) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", invImage)
        try {
            await axios.patch(api + "/upload/image/inv/" + invId, formData)
            alert("อัพโหลดข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
        } finally {
            fethInv()
            closeUploadImage()
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
            fethInv()
            closeUploadCV()
        }
    }

    const handleEdit = (invId, name, desc, keynote) => {
        setEditId(invId)
        setInvDetail({
            name: name,
            desc: desc,
            keynote: keynote
        })
    }

    const invDetailUpdate = async (e, invId) => {
        e.preventDefault()
        if (invDetail.name !== "" && invDetail.desc !== "" && invDetail.keynote !== "") {
            try {
                const res = await axios.patch(api + "/update/inv/" + invId, invDetail)
                alert("บันทึกสำเร็จ:" + res.data)
                setEditId("")
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
        fethInv()
    }, [])

    return (
        <div>
            <CreateInvModal show={show} handleClose={handleClose} createInv={createInv} />
            <UploadInvImage show={uploadImageShow} handleClose={closeUploadImage} invId={invSpeakerId} uploadImage={invImageUpload} setImage={setInvImage} />
            <UploadCV show={uploadCVShow} handleClose={closeUploadCV} invId={invSpeakerId} uploadCV={invCVUpload} setCV={setUploadCV} />
            <div className='mb-5'>
                <h4 className='text-primary'>รายละเอียดวิทยากรรับเชิญ</h4>
                <hr />
            </div>
            <div className='mb-3'>
                <button className='btn btn-primary' type='button' onClick={handleShow}>Create New +</button>
            </div>
            {invSpeaker.length > 0 ? (
                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Icon</th>
                                <th>ชื่อ</th>
                                <th>รายละเอียด</th>
                                <th>Keynote</th>
                                <th>CV</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invSpeaker?.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        {editId === item._id ? (
                                            <>
                                                <td>
                                                    <button type='button' onClick={() => showUploadImage(item._id)} className='btn btn-primary'>Upload</button>
                                                </td>
                                                <td>
                                                    <textarea onChange={e => setInvDetail({ ...invDetail, name: e.target.value })} className='form-control' defaultValue={item.name} />
                                                </td>
                                                <td>
                                                    <textarea onChange={e => setInvDetail({ ...invDetail, desc: e.target.value })} className='form-control' defaultValue={item.desc} />
                                                </td>
                                                <td>
                                                    <textarea onChange={e => setInvDetail({ ...invDetail, keynote: e.target.value })} className='form-control' defaultValue={item.keynote} />
                                                </td>
                                                <td>
                                                    <button type='button' onClick={() => showUploadCV(item._id)} className='btn btn-primary'>Upload</button>
                                                </td>
                                                <td className='text-nowrap'>
                                                    <button onClick={e => invDetailUpdate(e, item._id)} type='button' className='btn btn-success me-2'>บันทึก</button>
                                                    <button onClick={() => setEditId("")} type='button' className='btn btn-secondary'>ยกเลิก</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    {item.img ? <img src={api + "/image/" + item.img} height={128} width={128} />: <button type='button' onClick={() => showUploadImage(item._id)} className='btn btn-primary'>Upload</button>}
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.desc}</td>
                                                <td>{item.keynote}</td>
                                                <td>
                                                    {item.cv ? <a href={api + "/pdf/" + item.cv} target='_blank'>CV: {item.name}</a> : <button type='button' onClick={() => showUploadCV(item._id)} className='btn btn-primary'>Upload</button>}
                                                </td>
                                                <td className='text-nowrap'>
                                                    <button onClick={() => handleEdit(item._id, item.name, item.desc, item.keynote)} type='button' className='btn btn-primary me-2'>แก้ไข</button>
                                                    <button onClick={() => handleDelInv(item._id, item.img, item.cv)} type='button' className='btn btn-danger'>ลบ</button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            ) : <h4 className='fw-bold text-center'>ไม่พบข้อมูล กรุณาเพิ่มข้อมูลรายชื่อพิธีกร</h4>}

        </div >
    )
}

export default EditInv

