import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchItemNotFound from '../components/SearchItemNotFound';


const api = process.env.REACT_APP_API_URL

function AdminPub() {

    const [pub, setPub] = useState([])
    const [show, setShow] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [editData, setEditData] = useState({
        id: "",
        th_name: "",
        en_name: "",
        branch: [],
    })
    const [branch, setBranch] = useState([])

    const handleClose = () => {
        setEditData({
            id: "",
            th_name: "",
            en_name: "",
            branch: []
        })
        setShow(false)
    }
    const handleShow = (id, th_name, en_name, branch) => {
        setEditData({
            id: id,
            th_name: th_name,
            en_name: en_name,
        })
        setBranch(branch)
        setShow(true)
    }

    const handleCloseCreate = () => setShowCreate(false)
    const handleShowCreate = () => setShowCreate(true)

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const createPub = await axios.post(api + "/create/pub", {
                th_name: e.target.th_name.value,
                en_name: e.target.en_name.value,
                branch: branch
            })
            alert("เพิ่มวารสารสำเร็จ: " + createPub.status)
            handleCloseCreate()
            setPub(prev => [...prev, createPub.data])
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด")
        } finally {
            e.target.th_name.value = ""
            e.target.en_name.value = ""
            setBranch([])
        }
    }

    const handleUpdateCate = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(api + "/update/pub/" + e.target.id.value, {
                th_name: e.target.th_name.value,
                en_name: e.target.en_name.value,
                branch: branch
            })
            const update = pub.map((item) => {
                if (item._id === e.target.id.value) {
                    let newItem = {
                        _id: e.target.id.value,
                        th_name: e.target.th_name.value,
                        en_name: e.target.en_name.value,
                        branch: branch,
                    }
                    return newItem
                } else {
                    return item
                }
            })
            setPub(update)
            alert("Update Success")
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDel = async (pub_id) => {
        if (window.confirm("ต้องการจะลบจริงหรือไม่?")) {
            try {
                const res = await axios.delete(api + "/delete/pub/" + pub_id)
                alert("ลบวารสารสำเร็จ: " + res.status)
                setPub(pub.filter((item) => item._id !== pub_id))
            } catch (error) {
                console.log(error)
                alert("เกิดข้อผิดพลาด")
            }
        }
    }

    useEffect(() => {

        const fethPub = async () => {
            try {
                const res = await axios.get(api + "/all/pub")
                setPub(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethPub()
    }, [])

    return (
        <div className='px-3'>
            <div className='row gy-3 mb-3'>
                <div className='col-md-4'>
                    <p className='fw-bold mb-0'>รายชื่อวารสารทั้งหมด <span className='text-muted'>{pub.length}</span></p>
                </div>
                <div className='col-md-4'>
                    <input className='form-control' type='search' placeholder='ค้นหาวารสาร' />
                </div>
                <div className='col-md-4 text-md-end'>
                    <button type='button' onClick={handleShowCreate} className='btn btn-outline-primary'>เพิ่มวารสาร</button>
                </div>
            </div>
            <EditModal
                show={show}
                handleClose={handleClose}
                id={editData.id}
                th_name={editData.th_name}
                en_name={editData.en_name}
                branch={branch}
                createPub={handleUpdateCate}
                setBranch={setBranch}
            />
            <CreatePubModal
                show={showCreate}
                handleClose={handleCloseCreate}
                handleCreate={handleCreate}
                setBranch={setBranch}
                branch={branch}
            />
            {pub.length > 0 ? (
                <ul className='list-group'>
                    {pub?.map((item) => (
                        <li className='list-group-item d-flex justify-content-between align-items-center' key={item._id}>
                            <div>
                                {item.en_name} {item.th_name ? <span className='text-muted'>({item.th_name})</span> : null}
                                <div>
                                    {item.branch?.map((list, index) => (
                                        <small key={index} className='text-muted'>{list},</small>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Dropdown align="end">
                                    <Dropdown.Toggle variant='btn'>
                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleShow(item._id, item.th_name, item.en_name, item.branch)}><span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDel(item._id)}><span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <SearchItemNotFound />
            )}
        </div>
    )
}

export default AdminPub

function EditModal({ show, handleClose, id, th_name, en_name, branch, createPub, setBranch }) {

    const [Name, setName] = useState("")

    const handleAdd = () => {
        setBranch([...branch, Name])
        setName("")
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูล <span className='text-primary'>{en_name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={createPub}>
                <Modal.Body>
                    <div>
                        <input name='id' className='d-none' defaultValue={id} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไทย</label>
                        <input required name='th_name' className='form-control' defaultValue={th_name} placeholder='ไม่มีให้ใส่ -' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                        <input name='en_name' className='form-control' defaultValue={en_name} required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>Aim and scope</label>
                        <input value={Name} onChange={e => setName(e.target.value)} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-primary btn-sm' type='button' onClick={handleAdd}>+ Add</button>
                    </div>
                    <ul className='list-group'>
                        {branch?.map((item, index) => (
                            <li className='list-group-item' key={index}>
                                {item} <button type='button' onClick={() => setBranch(branch.filter(a => a !== branch[index]))} className='btn btn-outline-danger btn-sm ms-2'>Delete</button>
                            </li>
                        ))}
                    </ul>
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

function CreatePubModal({ show, handleClose, handleCreate, setBranch, branch }) {

    const [Name, setName] = useState("")

    const handleAdd = () => {
        setBranch([...branch, Name])
        setName("")
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Publication</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไทย</label>
                        <input name='th_name' className='form-control' placeholder='ไม่มีให้ใส่ -' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                        <input name='en_name' className='form-control' required />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>Aim and Scope</label>s
                        <input value={Name} className='form-control' onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-primary' type='button' onClick={handleAdd}>+ Add</button>
                    </div>
                    <div className='list-group'>
                        {branch?.map((item, index) => (
                            <div key={index} className='list-group-item'>
                                {item} <button type='button' className='btn btn-outline-danger btn-sm ms-2' onClick={() => {
                                    setBranch(
                                        branch.filter(a => a !== branch[index])
                                    )
                                }}>Delete</button>
                            </div>
                        ))}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}