import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

const api = process.env.REACT_APP_API_URL

function AdminPub() {

    const [pub, setPub] = useState([])
    const [show, setShow] = useState(false)
    const [editData, setEditData] = useState({
        id: "",
        th_name: "",
        en_name: "",
        branch: ""
    })

    const handleClose = () => {
        setEditData({
            id: "",
            th_name: "",
            en_name: "",
            branch: ""
        })
        setShow(false)
    }
    const handleShow = (id, th_name, en_name, branch) => {
        setEditData({
            id: id,
            th_name: th_name,
            en_name: en_name,
            branch: branch
        })
        setShow(true)
    }

    const fethPub = async () => {
        try {
            const res = await axios.get(api + "/all/pub")
            setPub(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const createPub = await axios.post(api + "/create/pub", {
                th_name: e.target.th_name.value,
                en_name: e.target.en_name.value,
                branch: e.target.branch.value
            })
            alert("เพิ่มวารสารสำเร็จ: " + createPub.status)
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด")
        } finally {
            e.target.th_name.value = ""
            e.target.en_name.value = ""
            e.target.branch.value = ""
            fethPub()
        }
    }

    const handleDel = async (pub_id) => {
        if (window.confirm("ต้องการจะลบจริงหรือไม่?")) {
            try {
                const res = await axios.delete(api + "/delete/pub/" + pub_id)
                alert("ลบวารสารสำเร็จ: " + res.status)
            } catch (error) {
                console.log(error)
                alert("เกิดข้อผิดพลาด")
            } finally {
                fethPub()
            }
        }
    }

    useEffect(() => {
        fethPub()
    }, [])

    return (
        <div className='container py-5'>
            <h4 className='fw-bold mb-3'>รายชื่อวารสารทั้งหมด</h4>
            <EditModal
                show={show}
                handleClose={handleClose}
                id={editData.id}
                th_name={editData.th_name}
                en_name={editData.en_name}
                branch={editData.branch}
                fethData={fethPub}
            />
            <form onSubmit={handleCreate} className='row mb-5'>
                <div className='col-12 col-md-4 mb-3'>
                    <label className='form-label text-muted'>ชื่อไทย</label>
                    <input name='th_name' className='form-control' placeholder='กรอกชื่อภาษาไทย (ไม่บังคับ)' />
                </div>
                <div className='col-12 col-md-4 mb-3'>
                    <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                    <input name='en_name' className='form-control' placeholder='name here' required />
                </div>
                <div className='col-12 col-md-4 mb-3'>
                    <label className='form-label text-muted'>สาขา</label>
                    <input name='branch' className='form-control' placeholder='ชื่อสาขาที่เกี่ยวข้อง' required />
                </div>
                <div>
                    <button type='submit' className='btn btn-primary'>เพิ่ม</button>
                </div>
            </form>
            <ul className='list-group'>
                {pub?.map((item) => (
                    <li className='list-group-item d-flex justify-content-between align-items-center' key={item._id}>
                        <div>
                            {item.en_name} {item.th_name ? <span className='text-muted'>({item.th_name})</span> : null}
                            <small className="d-block text-muted">{item.branch}</small>
                        </div>
                        <div>
                            <button type='button' onClick={() => handleShow(item._id, item.th_name, item.en_name, item.branch)} className='btn btn-outline-primary border-0'>Edit</button>
                            <button type='button' onClick={() => handleDel(item._id)} className='btn btn-outline-danger border-0'>Del</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPub

function EditModal({ show, handleClose, id, th_name, en_name, branch, fethData }) {

    const createPub = async (e) => {
        e.preventDefault()
        try {
            const createPub = await axios.patch(api + "/update/pub/" + id, {
                th_name: e.target.th_name.value,
                en_name: e.target.en_name.value,
                branch: e.target.branch.value,
            })
            alert("แก้ไขข้อมูลสำเร็จ: " + createPub.status)
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด")
        } finally {
            fethData()
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูล <span className='text-primary'>{en_name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={createPub}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไทย</label>
                        <input required name='th_name' className='form-control' defaultValue={th_name} placeholder='ไม่มีให้ใส่ -' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                        <input name='en_name' className='form-control' defaultValue={en_name} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>สาขา</label>
                        <input name='branch' className='form-control' defaultValue={branch} required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" type='button' onClick={handleClose}>
                        Close
                    </button>
                    <button type='submit' className="btn btn-primary">
                        Save Changes
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}