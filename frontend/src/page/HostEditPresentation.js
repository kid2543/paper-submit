import React, { useState } from 'react'
import useFetch from '../hook/useFetch'

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'


function HostEditPresentation() {

    const id = sessionStorage.getItem('host_confr')
    const { data, setData, loading, error } = useFetch('/api/conference/host/' + id)

    // modal data
    const [showA, setShowA] = useState(false)
    const [showB, setShowB] = useState(false)
    const [showModalD, setShowModalD] = useState(false)

    console.log(data)


    if (loading === 'idle' || loading === 'loading') {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <div className='mb-3 card'>
                <div className='card-body'>
                    <h4 className='fw-bold card-title'>ข้อแนะนำการนำเสนอ</h4>
                    <p className='text-muted card-text'>เพิ่มและแก้ไขข้อแนะนำการเสนอสำหรับ ผู้นำเสนอ กรรมการ และผู้ชม ได้ที่นี่</p>
                </div>
            </div>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='mb-3'>
                            <h4>ข้อแนะการนำเสนอบทความ</h4>
                            <div className='text-muted'>
                                เพิ่มข้อแนะนำสำหรับผู้นำเสนอ เพื่อให้ผู้นำเสนอเตรียมตัวก่อนทำการนำเสนอได้อย่างถูกต้อง
                            </div>
                        </div>
                        <div>
                            <button className='btn' type='button' onClick={() => setShowA((true))}>
                                <i className='bi bi-pencil-square'></i>
                            </button>
                        </div>
                    </div>
                    {data &&
                        <ul>
                            <GuidelineModal show={showA} handleClose={() => setShowA(false)} setData={setData} id={id} data={data.presentation_guideline} />
                            {data.presentation_guideline.map((items, index) => (
                                <li key={index}>{items}</li>
                            ))}
                        </ul>
                    }
                </div>
            </div>
            <div className='card mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='mb-3'>
                            <h4>รายละเอียดเพิ่มเติม</h4>
                            <div className='text-muted'>
                                รายละเอียดเพิ่มเติมเกี่ยวกับการเสนอ เช่นการที่ผู้ส่งบทความไม่มานำเสนอจะมีเงื่อนไขตามที่งานประชุมกำหนด เป็นต้น
                            </div>
                        </div>
                        <div>
                            <button className='btn' type='button' onClick={() => setShowB(true)}>
                                <i className='bi bi-pencil-square'></i>
                            </button>
                        </div>
                    </div>
                    {data &&
                        <div>
                            <RemarkModal show={showB} handleClose={() => setShowB(false)} data={data.presentation_remark} setData={setData} id={id} />
                            {data.presentation_remark}
                        </div>
                    }
                </div>
            </div>
            <div>
                <ModalSchedule
                    show={showModalD}
                    handleClose={() => setShowModalD(false)}
                    setData={setData}
                    id={id}
                />
                <div className='card'>
                    <div className="card-body">
                        <div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='mb-3'>
                                    <h4>กำหนดการงานประชุม / กำหนดการนำเสนอ</h4>
                                    <div className='text-muted'>
                                        อัปโหลดกำหนดการนำเสนอ เพื่อให้ผู้เข้าร่วมงานประชุมดูเวลา และสถานที่ในการนำเสนอ หรือเข้าร่วมกิจกรรมต่างๆ ของงานประชุม
                                    </div>
                                </div>
                                {data?.schedule ? (

                                    <button className='btn' onClick={() => setShowModalD(true)}>
                                        <i className='bi bi-pencil-square'></i>
                                    </button>
                                ) : null
                                }
                            </div>
                        </div>
                        <div>
                            {data?.schedule ? (
                                <Link to={`/uploads/${data.schedule}`} target='_blank' rel='noreferrer' className="btn btn-primary">
                                    <i className="bi bi-file-earmark me-2"></i>
                                    ดูไฟล์กำหนดการ
                                </Link>

                            ) : (
                                <button onClick={() => setShowModalD(true)} type='button' className="btn btn-outline-primary">
                                    อัปโหลดไฟล์กำหนดการ
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostEditPresentation

function ModalSchedule(props) {

    const [scheduleFile, setScheduleFile] = useState(null)

    const [loading, setLoading] = useState(false)
    const handleUpload = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!scheduleFile) {
            toast.warning('กรุณาเลือกไฟล์')
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', scheduleFile)
            const res = await axios.patch('/api/conference/schedule/' + props.id, formData)
            props.setData(res.data)
            toast.success('อัปโหลดไฟล์กำหนดการสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            props.handleClose()
            setLoading(false)
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
                    {loading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit' disabled={!scheduleFile}>
                            <i className="me-2 bi bi-upload"></i>
                            อัปโหลด
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function GuidelineModal(props) {

    const [guideline, setGuideline] = useState(props.data || [])

    // add arr
    const handleAdd = () => {
        setGuideline([...guideline, ""])
    }

    const handleDelete = (index) => {
        let temp = [...guideline]
        temp = temp.filter((items, idx) => idx !== index)
        setGuideline(temp)
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...guideline]
        temp[index] = value
        setGuideline(temp)
    }

    const [updateLoading, setUpdateLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            const res = await axios.patch('/api/conference', {
                _id: props.id,
                presentation_guideline: guideline
            })
            props.setData(res.data)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            props.handleClose()
            setUpdateLoading(false)
        }
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ข้อแนะนำการนำเสนอ</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row g-3'>
                    {guideline.map((items, index) => (
                        <div className='col-12' key={index}>
                            <div className='form-text'>ข้อแนะนำ: {index + 1}</div>
                            <hr />
                            <label className="form-label">ข้อแนะนำ</label>
                            <textarea
                                className='form-control'
                                value={items}
                                onChange={e => handleChange(e, index)}
                                rows={8}
                            />
                            <div className="mt-3">
                                <button onClick={() => handleDelete(index)} className="btn btn-outline-danger" type='button'>
                                    <i className="bi bi-trash me-2"></i>
                                    ลบข้อแนะนำนี้
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
                            <i className="me-2 bi bi-plus-lg"></i>
                            เพิ่มหัวข้อ
                        </button>
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
                            ยืนยัน
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function RemarkModal(props) {

    const [remark, setRemark] = useState(props.data || "")

    const [updateLoading, setUpdateLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            const res = await axios.patch('/api/conference', {
                _id: props.id,
                presentation_remark: remark
            })
            props.setData(res.data)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            props.handleClose()
            setUpdateLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดเพิ่มเติม</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row'>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียดเพิ่มเติม</label>
                        <textarea
                            className='form-control'
                            value={remark}
                            onChange={e => setRemark(e.target.value)}
                            rows={5}
                        />
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
                            ยืนยัน
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}