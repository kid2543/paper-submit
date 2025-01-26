import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import useFetch from '../../hook/useFetch'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Registration() {

    const id = sessionStorage.getItem('host_confr')
    const { data, error, status, setData } = useFetch(`/api/conference/host/` + id)

    // modal data
    const [showModalA, setShowModalA] = useState(false)
    const [showModalB, setShowModalB] = useState(false)
    const [showModalC, setShowModalC] = useState(false)

    if (status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if (error) {
        return <SearchItemNotFound />
    }


    return (
        <div className='py-5'>
            <div className='mb-4'>
                <h4 className='fw-bold'>ข้อมูลการลงทะเบียน</h4>
                <p className='text-muted'>แก้ไขข้อมูลการลงทะเบียนได้ที่นี่</p>
            </div>
            <div className='row gy-5'>
                <ModalAcc data={data} show={showModalA} handleClose={() => setShowModalA(false)} setData={setData} />
                <div className='col-12'>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <h6 className='fw-bold mb-0'>รายละเอียดบัญชี</h6>
                                <div>
                                    <button className='btn' onClick={() => setShowModalA(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                </div>
                            </div>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td>ชื่อธนาคาร</td>
                                        <td>{data?.bank_name}</td>
                                    </tr>
                                    <tr>
                                        <td>ชื่อบัญชี</td>
                                        <td>{data?.acc_name}</td>
                                    </tr>
                                    <tr>
                                        <td>ประเภทบัญชี</td>
                                        <td>{data?.bank_type}</td>
                                    </tr>
                                    <tr>
                                        <td>เลขบัญชี</td>
                                        <td>{data?.acc_no}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <ModalRegis data={data} show={showModalB} handleClose={() => setShowModalB(false)} setData={setData} />
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-4'>
                                <h6 className='fw-bold mb-0'>อัตราค่าลงทะเบียน</h6>
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
                <div className='col-12'>
                    <div className='card border-0 shadow-sm'>
                        <div className='card-body'>
                            <div>
                                <ModalRegisDate data={data} setData={setData} handleClose={() => setShowModalC(false)} show={showModalC} />
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <h6 className='fw-bold mb-0'>กำหนดการชำระเงิน</h6>
                                    <button className='btn' onClick={() => setShowModalC(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                </div>
                                <p>Early bird registration : {data?.regis_eb_start_date && dayjs(data?.regis_eb_start_date).format("DD/MMM/YYYY")} - {data?.regis_eb_end_date && dayjs(data?.regis_eb_end_date).format("DD/MMM/YYYY")}</p>
                                <p>Regular registration : {data?.regis_rl_start_date && dayjs(data?.regis_rl_start_date).format("DD/MMM/YYYY")} - {data?.regis_rl_end_date && dayjs(data?.regis_rl_end_date).format("DD/MMM/YYYY")}</p>
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

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            alert('Success')
            props.handleClose()
        } catch (error) {
            alert('Error')
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row'>
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
                        <input className='form-control' name='acc_no' defaultValue={props.data?.acc_no} pattern='[0-9]{10}' />
                        <small>เฉพาะตัวเลขเท่านั้น</small>
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

function ModalRegis(props) {

    const [edit, setEdit] = useState(props.data?.regis_type)


    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const update = await axios.patch('/api/conference', {
                _id: props.data._id,
                regis_type: edit
            })
            props.setData(update.data)
            alert('Success')
            props.handleClose()
        } catch (error) {
            alert('Error')
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

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดบัญชี</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>Add +</button>
                    </div>
                    {edit?.map((items, index) => (
                        <div key={index} className='row gy-2'>
                            <div className='col-12'>
                                <label className='form-label'>ประเภทที่ {index + 1}</label>
                                <input className='form-control' name='name' defaultValue={items.name} onChange={e => handleChange(e, index)} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Early bird</label>
                                <input type='number' className='form-control' name='price_1' defaultValue={items.price_1} onChange={e => handleChange(e, index)} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Regular</label>
                                <input type='number' className='form-control' name='price_2' defaultValue={items.price_2} onChange={e => handleChange(e, index)} />
                            </div>
                            <hr />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" type='button' onClick={props.handleClose}>
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

function ModalRegisDate(props) {

    const [editStatus, setEditStatus] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data?._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            alert('Success')
            props.handleClose()
        } catch (error) {
            console.log(error)
            alert('Error')
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
                        <input type='date' name='regis_eb_start_date' className='form-control' defaultValue={dayjs(props.data?.regis_eb_start_date).format('YYYY-MM-DD')} onChange={() => setEditStatus(true)} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>End</label>
                        <input className='form-control' type='date' name='regis_eb_end_date' defaultValue={dayjs(props.data?.regis_eb_end_date).format('YYYY-MM-DD')} onChange={() => setEditStatus(true)} />
                    </div>
                    <hr />
                    <p className='fw-bold'>Regular</p>
                    <div className='col-12'>
                        <label className='form-label'>Start</label>
                        <input className='form-control' type='date' name='regis_rl_start_date' defaultValue={dayjs(props.data?.regis_rl_start_date).format('YYYY-MM-DD')} onChange={() => setEditStatus(true)} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>End</label>
                        <input className='form-control' type='date' name='regis_rl_end_date' defaultValue={dayjs(props.data?.regis_rl_end_date).format('YYYY-MM-DD')} onChange={() => setEditStatus(true)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!editStatus}>
                        Update
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}