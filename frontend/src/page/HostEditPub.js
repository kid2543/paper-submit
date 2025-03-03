import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Modal,
    Button
} from 'react-bootstrap'
import { toast } from 'react-toastify'
import useFetch from '../hook/useFetch'
import { Link } from 'react-router-dom'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'

function HostEditPub() {

    // modal
    const [showCreate, setShowCreate] = useState(false)
    const id = sessionStorage.getItem('host_confr')
    const pub = useFetch('/api/publication/confr/' + id)

    // edit modal
    const [showEdit, setShowEdit] = useState(false)
    const [editData, setEditData] = useState({
        _id: '',
        th_name: '',
        en_name: '',
        desc: [''],
        confr_id: ''
    })

    const handleShowEdit = (data) => {
        setShowEdit(true)
        setEditData(data)
    }

    const handleCloseEdit = () => {
        setShowEdit(false)
        setEditData({
            _id: '',
            th_name: '',
            en_name: '',
            desc: [''],
            confr_id: ''
        })
    }

    // handleDelete publication
    const handleDelete = async () => {
        if (!deleteId) {
            toast.warning('เลือกวารสารก่อนทำการกดลบ')
            return
        }

        try {
            await axios.delete('/api/publication/' + deleteId)
            pub.setData(pub.data.filter(items => items._id !== deleteId))
            toast.success('ลบวารสารสำเร็จ')
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
        } finally {
            handleCloseDelete()
        }
    }

    // confirm delete modal
    const [showDelete, setShowDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const handleCloseDelete = () => {
        setDeleteId('')
        setShowDelete(false)
    }

    const handleShowDelete = (pub_id) => {
        setDeleteId(pub_id)
        setShowDelete(true)
    }
    if (!id) {
        return <div>เกิดข้อผิดพลาด <Link to='/'>กลับหน้าแรก</Link></div>
    }

    return (
        <div>
            <section>
                <div className='card mb-3'>
                    <div className="card-body">
                        <h4 className="card-title">วารสาร</h4>
                        <p className="text-muted card-text">เพิ่มวารสารได้ที่นี่</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="d-md-flex justify-content-between mb-3">
                            <div>
                                <h4 className="card-title">รายการวารสาร</h4>
                                <div className='text-muted'>
                                    หากมีวารสารที่เข้าร่วม สามารถเพิ่มรายละเอียดได้ที่นี่ และจะไปแสดงในหน้าการส่งบทความของผู้ส่งบทความเพื่อให้สามารถเลือกได้ว่าจะส่งมายังวารสารหรือไม่
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary" type='button' onClick={() => setShowCreate(true)}>
                                    <i className='bi bi-plus-lg me-2'></i>
                                    เพิ่มวารสาร
                                </button>
                                <CreatePublicationModal
                                    show={showCreate}
                                    handleClose={() => setShowCreate(false)}
                                    data={pub.data}
                                    setData={pub.setData}
                                />
                                <EditPublicationModal
                                    show={showEdit}
                                    handleClose={handleCloseEdit}
                                    editData={editData}
                                    data={pub.data}
                                    setData={pub.setData}
                                />
                                <ConfirmDeleteDialog
                                    header='ยืนยันการลบวารสาร'
                                    message='ต้องการลบวารสารนี้หรือไม่ ?'
                                    onCancel={handleCloseDelete}
                                    onConfirm={handleDelete}
                                    show={showDelete}
                                />
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table" style={{ minWidth: 1000 }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อภาษาไทย</th>
                                        <th>ชื่อภาษาอังกฤษ</th>
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pub.data?.map((items, index) => (
                                        <tr key={items._id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {items.th_name}
                                            </td>
                                            <td>
                                                {items.en_name}
                                            </td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-light"
                                                        type='button'
                                                        onClick={() => handleShowEdit(items)}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() => handleShowDelete(items._id)}
                                                        className="btn btn-light"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HostEditPub

function CreatePublicationModal({ show, handleClose, setData, data }) {

    const [th_name, setThName] = useState('')
    const [en_name, setEnName] = useState('')
    const [desc, setDesc] = useState([''])
    const confr_id = sessionStorage.getItem('host_confr')

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...desc]
        temp[index] = value
        setDesc(temp)
    }

    const handleDelete = (index) => {
        let temp = [...desc]
        temp = temp.filter((items, idx) => idx !== index)
        setDesc(temp)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/publication', {
                th_name,
                en_name,
                desc,
                confr_id
            })
            setData([res.data, ...data])
            toast.success('เพิ่มวารสารสำเร็จ')
            setThName('')
            setEnName('')
            setDesc([''])
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มวารสาร</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body>
                    <div className="row g-3">
                        <div>
                            <label className="form-label">
                                ชื่อภาษาไทย
                            </label>
                            <input
                                className="form-control"
                                value={th_name}
                                onChange={e => setThName(e.target.value)}
                                required
                                placeholder='หากไม่มีให้ใส่ -'
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="form-label">
                                ชื่อภาษาอังกฤษ
                            </label>
                            <input
                                className="form-control"
                                value={en_name}
                                onChange={e => setEnName(e.target.value)}
                                required
                                placeholder='หากไม่มีให้ใส่ -'
                            />
                        </div>
                        <p>รายละเอียดวารสาร</p>
                        {desc.map((descs, index) => (
                            <div key={index}>
                                <div className="text-muted">
                                    บรรทัดที่: {index + 1}
                                </div>
                                <hr />
                                <label className="form-label">
                                    รายละเอียด
                                </label>
                                <textarea
                                    value={descs}
                                    className='form-control mb-3'
                                    rows={5}
                                    onChange={e => handleChange(e, index)}
                                />
                                <div>
                                    <button
                                        className="btn btn-outline-danger"
                                        type='button'
                                        onClick={() => handleDelete(index)}
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        ลบ
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                type='button'
                                className="btn btn-success"
                                onClick={() => setDesc([...desc, ''])}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                เพิ่มรายละเอียด
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        สร้าง
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}


function EditPublicationModal({ show, handleClose, data, setData, editData }) {

    const [th_name, setThName] = useState('')
    const [en_name, setEnName] = useState('')
    const [desc, setDesc] = useState([''])

    useEffect(() => {
        setThName(editData.th_name)
        setEnName(editData.en_name)
        setDesc(editData.desc)
    }, [editData])

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...desc]
        temp[index] = value
        setDesc(temp)
    }

    const handleDelete = (index) => {
        let temp = [...desc]
        temp = temp.filter((items, idx) => idx !== index)
        setDesc(temp)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/publication/' + editData._id, {
                th_name,
                en_name,
                desc,
            })
            let temp = [...data]
            temp = temp.map(items => {
                if (items._id === res.data._id) {
                    return res.data
                } else {
                    return items
                }
            })
            setData(temp)
            toast.success('เพิ่มวารสารสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            handleClose()
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editData?.th_name}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body>
                    <div className="row g-3">
                        <div>
                            <label className="form-label">
                                ชื่อภาษาไทย
                            </label>
                            <input
                                className="form-control"
                                value={th_name}
                                onChange={e => setThName(e.target.value)}
                                required
                                placeholder='หากไม่มีให้ใส่ -'
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="form-label">
                                ชื่อภาษาอังกฤษ
                            </label>
                            <input
                                className="form-control"
                                value={en_name}
                                onChange={e => setEnName(e.target.value)}
                                required
                                placeholder='หากไม่มีให้ใส่ -'
                            />
                        </div>
                        <p className="form-label">รายละเอียดวารสาร</p>
                        {desc.map((descs, index) => (
                            <div key={index}>
                                <div className="text-muted">
                                    บรรทัดที่: {index + 1}
                                </div>
                                <hr />
                                <label className="form-label">
                                    รายละเอียด
                                </label>
                                <textarea
                                    value={descs}
                                    className='form-control mb-3'
                                    rows={5}
                                    onChange={e => handleChange(e, index)}
                                />
                                <div>
                                    <button
                                        className="btn btn-outline-danger"
                                        type='button'
                                        onClick={() => handleDelete(index)}
                                    >
                                        ลบรายละเอียด
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button
                                type='button'
                                className="btn btn-success"
                                onClick={() => setDesc([...desc, ''])}
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                เพิ่มรายละเอียด
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        อัพเดท
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}