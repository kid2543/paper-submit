import React, { useState } from 'react'
import useFetch from '../../hook/useFetch';

// component
import SearchItemNotFound from '../SearchItemNotFound';
import LoadingPage from '../LoadingPage';

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

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
        <div className='py-5'>
            <div className='row gy-5'>
                <ModalVenue data={data} setData={setData} show={showModal} handleClose={() => setShowModal(false)} />
                <ModalUploadVenue setData={setData} show={showModalA} handleClose={() => setShowModalA(false)} />
                <div className='col-12'>
                    <div className='mb-4'>
                        <h4 className='fw-bold'>สถานที่จัดงาน</h4>
                        <p className='text-muted'>แก้ไขสถานที่จัดงานและอัพโหลดรูปสถานที่จัดงานได้ที่นี่</p>
                    </div>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h6 className='fw-bold mb-0'>รายละเอียดสถานที่จัดงาน</h6>
                                <div>
                                    <button className='btn me-2' onClick={() => setShowModal(true)}>
                                        <i className='bi bi-pencil-square'></i>
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
                                        <img src={'/uploads/' + data?.venue_image} alt='mock' className='img-fluid' />
                                    }
                                </div>
                                <div>
                                    <h3>{data?.venue.name}</h3>
                                    {data?.venue.desc.map((descs, index) => (
                                        <p key={index}>{descs}</p>
                                    ))}
                                    <div>{data?.venue.remark}</div>
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
            alert('Success')
            props.handleClose()
        } catch (error) {
            console.log(error)
            alert('Error')
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

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อสถานที่จัดงาน</label>
                        <input defaultValue={props.data?.venue.name} className='form-control' onChange={e => setEdit({ ...edit, name: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <div>
                            รายละเอียดสถานที่จัดงาน:
                            <button className='btn btn-outline-primary btn-sm' type='button' onClick={handleAdd}>Add +</button>
                        </div>
                        {edit?.desc.map((items, index) => (
                            <div className='mb-3' key={index}>
                                <label className='form-label'>บรรทัดที่ {index + 1}</label>
                                <textarea className='form-control' defaultValue={items} onChange={e => handleChange(e, index)} />
                            </div>
                        ))}
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียดเพิ่มเติม</label>
                        <input defaultValue={edit?.remark} className='form-control' onChange={e => setEdit({ ...edit, remark: e.target.value })} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Update
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
                alert('Success')
                props.handleClose()
            } catch (error) {
                console.log(error)
                alert('Error')
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
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!newFile}>
                        Update
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}