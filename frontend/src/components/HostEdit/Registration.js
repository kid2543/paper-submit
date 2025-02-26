import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import useFetch from '../../hook/useFetch'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Registration() {

    const id = sessionStorage.getItem('host_confr')
    const { data, error, status, setData } = useFetch(`/api/conference/host/` + id)

    // modal data
    const [showModalA, setShowModalA] = useState(false)
    const [showModalB, setShowModalB] = useState(false)
    const [showModalC, setShowModalC] = useState(false)
    const [showModalD, setShowModalD] = useState(false)

    if (status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if (error) {
        return <SearchItemNotFound />
    }


    return (
        <div>
            <div className='mb-3 card'>
                <div className='card-body'>
                    <h4 className='fw-bold card-title'>ข้อมูลการลงทะเบียน</h4>
                    <p className='card-text text-muted'>แก้ไขข้อมูลการลงทะเบียนได้ที่นี่</p>
                </div>
            </div>
            <div className='row g-3'>
                <ModalAcc
                    data={data}
                    show={showModalA}
                    handleClose={() => setShowModalA(false)}
                    setData={setData}
                />
                <div className='col-12 col-lg-6'>
                    <div className='card shadow-sm h-100'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <h4>รายละเอียดบัญชี</h4>
                                <div>
                                    <button className='btn' onClick={() => setShowModalA(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                </div>
                            </div>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>ชื่อธนาคาร</th>
                                        <td>{data?.bank_name}</td>
                                    </tr>
                                    <tr>
                                        <th>ชื่อบัญชี</th>
                                        <td>{data?.acc_name}</td>
                                    </tr>
                                    <tr>
                                        <th>ประเภทบัญชี</th>
                                        <td>{data?.bank_type}</td>
                                    </tr>
                                    <tr>
                                        <th>เลขบัญชี</th>
                                        <td>{data?.acc_no}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <ModalRegis
                        data={data}
                        show={showModalB}
                        handleClose={() => setShowModalB(false)}
                        setData={setData}
                    />
                    <div className='card  shadow-sm h-100'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <h4>อัตราค่าลงทะเบียน</h4>
                                <button className='btn' onClick={() => setShowModalB(true)}>
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                            </div>
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>ประเภทผู้เข้าร่วม</th>
                                            <th colSpan={2}>อัตราค่าลงทะเบียน</th>
                                        </tr>
                                        <tr>
                                            <th>-</th>
                                            <th>Early bird</th>
                                            <th>Regular</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.regis_type.map((items) => (
                                            <tr key={items._id}>
                                                <td>{items.name}</td>
                                                <td>{new Intl.NumberFormat('en-US').format(items.price_1)} บาท</td>
                                                <td>{new Intl.NumberFormat('en-US').format(items.price_2)} บาท</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <div className='card  shadow-sm h-100'>
                        <div className='card-body'>
                            <div>
                                <ModalRegisDate
                                    data={data}
                                    setData={setData}
                                    handleClose={() => setShowModalC(false)}
                                    show={showModalC}
                                />
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <h4>กำหนดการชำระเงิน</h4>
                                    <button className='btn' onClick={() => setShowModalC(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                </div>
                                <p><b>Early bird</b> : {data?.regis_eb_start_date && dayjs(data?.regis_eb_start_date).format("DD MMM YYYY")} - {data?.regis_eb_end_date && dayjs(data?.regis_eb_end_date).format("DD MMM YYYY")}</p>
                                <p><b>Regular</b> : {data?.regis_rl_start_date && dayjs(data?.regis_rl_start_date).format("DD MMM YYYY")} - {data?.regis_rl_end_date && dayjs(data?.regis_rl_end_date).format("DD MMM YYYY")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <ModalSchedule
                        show={showModalD}
                        handleClose={() => setShowModalD(false)}
                        setData={setData}
                        id={id}
                    />
                    <div className='card h-100'>
                        <div className="card-body">
                            <div>
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <h4>กำหนดการงานประชุม</h4>
                                    <button className='btn' onClick={() => setShowModalD(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                {data.schedule ? (
                                    <Link to={`/uploads/${data.schedule}`} target='_blank' rel='noreferrer' className="btn btn-primary">
                                        <i className="bi bi-file-earmark me-2"></i>
                                        ดูไฟล์กำหนดการ
                                    </Link>

                                ) : (
                                    <button onClick={() => setShowModalD(true)} type='button' className="btn btn-outline-primary">
                                        อัพโหลดไฟล์กำหนดการ
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration

function ModalAcc(props) {

    const [updateLoading, setUpdateLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            toast.success('อัพเดทสำเร็จ')
            props.handleClose()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
        } finally {
            setUpdateLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row g-3'>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อธนาคาร</label>
                        <input className='form-control' name='bank_name' defaultValue={props.data?.bank_name} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อบัญชี</label>
                        <input className='form-control' name='acc_name' defaultValue={props.data?.acc_name} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>ประเภทบัญชี</label>
                        <input className='form-control' name='bank_type' defaultValue={props.data?.bank_type} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>เลขบัญชี</label>
                        <input
                            maxLength={10}
                            className='form-control'
                            name='acc_no'
                            defaultValue={props.data?.acc_no}
                            pattern='[0-9]{10}' />
                        <div className="form-text">เฉพาะตัวเลข 10 หลักเท่านั้น</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    {updateLoading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            แก้ไข
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function ModalRegis(props) {

    const [edit, setEdit] = useState(props.data?.regis_type)
    const [key, setKey] = useState(0)


    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const update = await axios.patch('/api/conference', {
                _id: props.data._id,
                regis_type: edit
            })
            props.setData(update.data)
            toast.success('แก้ไขสำเร็จ')
            props.handleClose()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
        }
    }

    const handleAdd = () => {
        setEdit([...edit, { name: '', price_1: '', price_2: '' }])
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        let temp = [...edit]
        temp[index][name] = value
        setEdit(temp)
    }

    const handleDelete = (index) => {
        let temp = [...edit]
        temp = temp.filter((items, idx) => idx !== index)
        setEdit(temp)
        setKey(key + 1)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดการลงทะเบียน</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3' key={key}>
                    {edit?.map((items, index) => (
                        <div key={index} className='row g-3'>
                            <div className='col-12'>
                                <div className="form-text">
                                    ประเภทที่ {index + 1}
                                </div>
                                <hr />
                                <label className="form-label">ชื่อประเภท</label>
                                <input
                                    required
                                    className='form-control'
                                    name='name'
                                    placeholder='หากไม่มีให้ใส่ -'
                                    defaultValue={items.name}
                                    onChange={e => handleChange(e, index)}
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Early bird</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    name='price_1'
                                    defaultValue={items.price_1}
                                    onChange={e => handleChange(e, index)}
                                    required
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Regular</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    name='price_2'
                                    defaultValue={items.price_2}
                                    onChange={e => handleChange(e, index)}
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => handleDelete(index)}
                                    className="btn btn-outline-danger"
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    ลบประเภทการลงทะเบียน
                                </button>
                            </div>
                            <hr />
                        </div>
                    ))}
                    <div className='col-12'>
                        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
                            <i className="me-2 bi bi-plus-lg"></i>
                            เพิ่มประเภทการลงทะเบียน
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" type='button' onClick={props.handleClose}>
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

function ModalRegisDate(props) {

    const [editStatus, setEditStatus] = useState(false)

    const [updateLoading, setUpdateLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data?._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            toast.success('อัพเดทสำเร็จ')
            props.handleClose()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            setUpdateLoading(false)
        }
    }

    const handleCancel = () => {
        setEditStatus(false)
        props.handleClose()
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>กำหนดการชำระเงิน</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <p className='fw-bold'>Early bird</p>
                    <div className='col-12'>
                        <label className='form-label'>Start</label>
                        <input
                            type='date'
                            name='regis_eb_start_date'
                            className='form-control'
                            defaultValue={dayjs(props.data?.regis_eb_start_date).format('YYYY-MM-DD')}
                            onChange={() => setEditStatus(true)} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>End</label>
                        <input
                            className='form-control'
                            type='date'
                            name='regis_eb_end_date'
                            defaultValue={dayjs(props.data?.regis_eb_end_date).format('YYYY-MM-DD')}
                            onChange={() => setEditStatus(true)}
                        />
                    </div>
                    <hr />
                    <p className='fw-bold'>Regular</p>
                    <div className='col-12'>
                        <label className='form-label'>Start</label>
                        <input
                            className='form-control'
                            type='date'
                            name='regis_rl_start_date'
                            defaultValue={dayjs(props.data?.regis_rl_start_date).format('YYYY-MM-DD')}
                            onChange={() => setEditStatus(true)}
                        />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>End</label>
                        <input
                            className='form-control'
                            type='date'
                            name='regis_rl_end_date'
                            defaultValue={dayjs(props.data?.regis_rl_end_date).format('YYYY-MM-DD')}
                            onChange={() => setEditStatus(true)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleCancel}>
                        ปิด
                    </Button>
                    {updateLoading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit' disabled={!editStatus}>
                            อัพเดท
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function ModalSchedule(props) {

    const [scheduleFile, setScheduleFile] = useState(null)

    const handleUpload = async (e) => {
        e.preventDefault()
        if (!scheduleFile) {
            toast.warning('กรุณาเลือกไฟล์')
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', scheduleFile)
            const res = await axios.patch('/api/conference/schedule/' + props.id, formData)
            props.setData(res.data)
            toast.success('อัพโหลดไฟล์กำหนดการสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            props.handleClose()
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่ม / แก้ไขกำหนดการ</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpload}>
                <Modal.Body>
                    <label className="form-label">
                        เลือกไฟล์กำหนดการ
                    </label>
                    <input
                        className="form-control"
                        type='file'
                        accept='.pdf'
                        onChange={e => setScheduleFile(e.target.files[0])}
                        required
                    />
                    <div className="form-text">
                        เฉพาะ PDF เท่านั้น
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit' disabled={!scheduleFile}>
                        <i className="me-2 bi bi-upload"></i>
                        อัพโหลด
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}