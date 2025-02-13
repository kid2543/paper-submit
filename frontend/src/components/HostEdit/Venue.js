import React, { useState } from 'react'
import useFetch from '../../hook/useFetch';

// component
import SearchItemNotFound from '../SearchItemNotFound';
import LoadingPage from '../LoadingPage';

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Venue() {

    const id = sessionStorage.getItem('host_confr')
    const { data, error, status, setData } = useFetch(`/api/conference/host/` + id)

    // modal data
    const [showModal, setShowModal] = useState(false)
    const [showModalA, setShowModalA] = useState(false)


    if (status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if (error) {
        return <SearchItemNotFound />
    }

    return (
        <div>
            <div className='row g-3'>
                <ModalVenue
                    data={data}
                    setData={setData}
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                />
                <ModalUploadVenue
                    setData={setData}
                    show={showModalA}
                    handleClose={() => setShowModalA(false)}
                />
                <div className='col-12'>
                    <div className='mb-3 card'>
                        <div className='card-body'>
                            <h4 className='fw-bold card-title'>สถานที่จัดงาน</h4>
                            <p className='text-muted card-text'>แก้ไขสถานที่จัดงานและอัพโหลดรูปสถานที่จัดงานได้ที่นี่</p>
                        </div>
                    </div>
                    <div className='card  shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h4>รายละเอียดสถานที่จัดงาน</h4>
                                <div>
                                    <button className='btn btn-outline-dark me-2' onClick={() => setShowModal(true)}>
                                        <i className='bi bi-pencil-square me-2'></i>
                                        แก้ไขรายละเอียด
                                    </button>
                                    <button className='btn btn-primary' onClick={() => setShowModalA(true)}>
                                        <span className='me-2'>
                                            <i className='bi bi-upload'></i>
                                        </span>
                                        อัพโหลดรูป
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {data?.venue_image &&
                                        <img src={'/uploads/' + data?.venue_image} alt={data?.venue.name} className='img-fluid' />
                                    }
                                </div>
                                <div>
                                    <h1>{data?.venue.name}</h1>
                                    {data?.venue.desc.map((descs, index) => (
                                        <p key={index}>{descs}</p>
                                    ))}
                                    <Link to={data?.venue.remark}>{data?.venue.remark}</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Venue

function ModalVenue(props) {

    const [edit, setEdit] = useState(props.data?.venue)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const update = await axios.patch('/api/conference', {
                _id: props.data?._id,
                venue: edit
            })
            props.setData(update.data)
            toast.success('อัพโหลดสำเร็จ')
            props.handleClose()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
        }
    }

    const handleAdd = () => {
        let temp = { ...edit }
        temp.desc.push('')
        setEdit(temp)
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = { ...edit }
        temp.desc[index] = value
        setEdit(temp)
    }

    const handleDelete = (index) => {
        let temp = { ...edit }
        temp.desc = temp.desc.filter((desc, idx) => idx !== index)
        setEdit(temp)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row g-3'>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อสถานที่จัดงาน</label>
                        <input
                            defaultValue={props.data?.venue.name}
                            className='form-control'
                            onChange={e => setEdit({ ...edit, name: e.target.value })}
                        />
                    </div>
                    <div className='col-12'>
                        <p>
                            รายละเอียดสถานที่จัดงาน:
                        </p>
                        <div>
                            <button
                                className='btn btn-outline-primary btn-sm'
                                type='button'
                                onClick={handleAdd}>
                                <i className='me-2 bi bi-plus'></i>
                                เพิ่มรายละเอียดสถานที่
                            </button>
                        </div>

                    </div>
                    <div className="row g-3">
                        {edit?.desc.map((items, index) => (
                            <div key={index}>
                                <div className="form-text">
                                    ย่อหน้าที่: {index + 1}
                                </div>
                                <hr />
                                <div className="mb-3">
                                    <label className='form-label'>รายละเอียดสถานที่</label>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        type='button'
                                        className="btn btn-outline-danger ms-2"
                                        >
                                        ลบย่อหน้านี้
                                    </button>
                                </div>
                                <textarea
                                    className='form-control'
                                    defaultValue={items}
                                    onChange={e => handleChange(e, index)}
                                    rows={5}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>Link สำหรับข้อมูลเพิ่มเติม</label>
                        <input defaultValue={edit?.remark} className='form-control' onChange={e => setEdit({ ...edit, remark: e.target.value })} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
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

function ModalUploadVenue(props) {

    const [newFile, setNewFile] = useState(null)

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (newFile) {
            const formData = new FormData()
            formData.append('image', newFile)
            try {
                const res = await axios.patch('/api/conference/venue/' + sessionStorage.getItem('host_confr'), formData)
                props.setData(res.data)
                toast.success('อัพเดทสำเร็จ')
                props.handleClose()
            } catch (error) {
                console.log(error)
                toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            }
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body>
                    <div>
                        <label className='form-label'>รูปสถานที่จัดงาน</label>
                        <input type='file' accept='image/*' className='form-control' onChange={e => setNewFile(e.target.files[0])} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit' disabled={!newFile}>
                        อัพเดท
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}