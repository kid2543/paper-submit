import React, { useState } from 'react'
import useFetch from '../../hook/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

// react bootstrap
import { 
    Modal,
    Button,
    Breadcrumb
     } from 'react-bootstrap'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

function Award() {

    const { id } = useParams()
    const paper = useFetch('/api/paper/category/' + id)
    const cate = useFetch('/api/category/one/' + id)
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({
        _id: '',
        title: ''
    })

    const handleShow = (_id, title) => {
        setModalData({ _id, title })
        setShow(true)
    }

    const handleClose = () => {
        setModalData({ _id: '', title: '' })
        setShow(false)
    }

    if (paper.data?.length === 0) {
        return <h4 className='py-5'>ไม่พบบทความ</h4>
    }

    return (
        <div className='py-5'>
            <Breadcrumb>
                <Breadcrumb.Item href="/host/edit/award">รางวัลดีเด่น</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    แก้ไขรางวัลดีเด่น
                </Breadcrumb.Item>
            </Breadcrumb>
            <ToastContainer />
            {cate.data &&
                <div className='mb-4'>
                    <h4 className='fw-bold'>รางวัลดีเด่นประจำหัวข้อ <span className='text-primary'>{cate.data.name}</span></h4>
                    <p className='text-muted'>จัดอันดับรางวัลดีเด่นได้ที่นี่!</p>
                    <div>
                        <button type='button' onClick={() => navigate(`/host/view/award/${id}`)} className='btn btn-primary text-white'>ดูการจัดอันดับ</button>
                    </div>
                </div>
            }
            {paper.data &&
                <div>
                    <UpdateAwardRateModal
                        show={show}
                        handleClose={handleClose}
                        data={modalData}
                        key={paper.key}
                        setKey={paper.setKey}
                    />
                    <h6 className='fw-bold mb-4'>รายการบทความในหัวข้อนี้</h6>
                    <div className='table-responsive'>
                        <table className='table' style={{ minWidth: '1000px' }}>
                            <thead>
                                <tr>
                                    <th>อันดับปัจจุบัน</th>
                                    <th>รหัสบทความ</th>
                                    <th>ชื่อ</th>
                                    <th>เครื่องมือ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paper.data.map(papers => (
                                    <tr key={papers._id}>
                                        <td>{papers.award_rate}</td>
                                        <td>{papers.paper_code}</td>
                                        <td>{papers.title}</td>
                                        <td>
                                            <button onClick={() => handleShow(papers._id, papers.paper_code)} type='button' className='btn btn-primary'>
                                                <i className='bi bi-pencil-square'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Award


function UpdateAwardRateModal(props) {

    const [award, setAward] = useState('')

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.patch('/api/paper/award', {
                id: props.data._id,
                award_rate: award
            })
            toast.success('สำเร็จ')
            props.setKey(props.key + 1)
            props.handleClose()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด')
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.data?.title}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body>
                    <label className='form-label'>เลือกอันดับ</label>
                    <select name='award' className="form-select" value={award} onChange={e => setAward(e.target.value)} required>
                        <option value="">เลือกอันดับ</option>
                        <option value="1">อันดับที่ 1</option>
                        <option value="2">อันดับที่ 2</option>
                        <option value="3">อันดับที่ 3</option>
                        <option value="4">อันดับที่ 4</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        ยืนยัน
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}