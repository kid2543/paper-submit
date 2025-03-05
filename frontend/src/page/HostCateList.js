import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Modal,
} from 'react-bootstrap';
import ConfirmModal from '../components/ConfirmModal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';


function HostCateList() {

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [show, setShow] = useState(false)
    const [showCM, setShowCM] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [createError, setCreateError] = useState(null)


    // confrim modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // delete modal
    const handleShowDelete = (id) => {
        setShowDeleteModal(true)
        setDeleteId(id)
    }
    const handleCloseDelete = () => {
        setShowDeleteModal(false)
        setDeleteId('')
    }

    const id = sessionStorage.getItem('host_confr')

    const deleteCate = async (cate_id) => {
        if (cate_id) {
            try {
                const res = await axios.delete('/api/category/' + cate_id)
                toast.success(res.data)
                setSearchData(searchData.filter(items => items._id !== cate_id))
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data.error)
            } finally {
                handleCloseDelete()
            }
        } else {
            toast.error('กรุณาเลือกหัวข้อที่จะลบ')
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const { category_code, name, desc } = e.target
            const res = await axios.post('/api/category', {
                category_code: category_code.value.toUpperCase(),
                name: name.value,
                desc: desc.value,
                confr_id: id
            })
            setShowCM(true)
            handleClose()
            setData(prev => [res.data, ...prev])
            setSearchData(prev => [res.data, ...prev])
            toast.success('เพิ่มหัวข้อสำเร็จ')
            setCreateError('')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            setCreateError(error.response.data?.error)
        }
    }

    useEffect(() => {

        const fethCate = async () => {
            try {
                const res = await axios.get('/api/category/' + id)
                setData(res.data)
                setSearchData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethCate()
    }, [id])


    return (
        <div>
            <ConfirmModal
                show={showCM}
                setShow={setShowCM}
                noReturn={true}
            />
            <ConfirmDeleteDialog
                header='ยืนยันการลบหัวข้องานประชุม'
                message='ต้องการลบหัวข้องานประชุมนี้หรือไม่'
                onCancel={handleCloseDelete}
                onConfirm={() => deleteCate(deleteId)}
                show={showDeleteModal}
            />
            <div className='mb-3 card'>
                <div className="card-body">
                    <h4 className='fw-bold card-title'>หัวข้องานประชุม</h4>
                    <p className='text-muted card-text'>เพิ่มหัวข้องานประชุมและแก้ไขกรรมการประจำหัวข้อได้ที่นี่</p>
                </div>
            </div>
            <div className='card  shadow-sm'>
                <div className='card-body'>
                    <div className='d-md-flex justify-content-between mb-3 align-items-center'>
                        <div>
                            <h4 className='card-title'>รายการหัวข้องานประชุม</h4>
                            <div className='text-muted'>
                                เพิ่มหัวข้องานประชุมเพื่อใช้สำหรับการส่งบทความ กรอกรายละเอียด และชื่อหัวข้อรวมถึงรหัสหัวข้อเพื่อใช้ตั้ง รหัสบทความที่ส่งเข้ามา
                            </div>
                        </div>
                        <button type='button' onClick={handleShow} className='btn btn-primary'><i className="bi bi-plus-lg me-2"></i>เพิ่มหัวข้องานประชุม</button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>เพิ่มหัวข้องานประชุม</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={handleCreate}>
                                <Modal.Body className='row g-3 align-items-center'>
                                    <div className='col-12'>
                                        <label className='col-form-label'>รหัสหัวข้อ</label>
                                        <input
                                            className='form-control'
                                            name='category_code'
                                            pattern='([?=.*A-Za-z])(?=.*\d).{4,}'
                                            onFocus={() => setCreateError('')}
                                        />
                                        <div className="form-text">รหัสหัวข้อประกอบด้วย ตัวอักษรภาษาอังกฤษและตัวเลข อย่างน้อย 4 ตัวอักษร</div>
                                    </div>
                                    <div className='col-12'>
                                        <label className='col-form-label'>ชื่อหัวข้อ</label>
                                        <input className='form-control' name='name' />
                                    </div>
                                    <div className='col-12'>
                                        <label className='col-form-label'>รายละเอียด</label>
                                        <textarea rows={5} className='form-control' name='desc' />
                                    </div>
                                    {createError && <div className='text-danger'>{createError}</div>}
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn" onClick={handleClose}>
                                        ปิด
                                    </button>
                                    <button type='submit' className="btn btn-primary">
                                        สร้าง
                                    </button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                    </div>
                    {data.length > 0 ? (
                        <div className='table-responsive' style={{ minHeight: "280px" }}>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>รหัส</th>
                                        <th>ชื่อ</th>
                                        <th>จำนวนกรรมการ</th>
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchData?.map((cate) => (
                                        <tr key={cate._id}>
                                            <td>{cate.category_code}</td>
                                            <td>{cate.name}</td>
                                            <td>{cate.reviewer_list.length}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link to={`/host/edit/category/${cate._id}`} type='button' className='btn btn-light'>
                                                        <i className='bi bi-pen'></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleShowDelete(cate._id)}
                                                        type='button'
                                                        className='btn btn-light'
                                                    >
                                                        <i className='bi bi-trash'></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : "ไม่พบข้อมูล"}
                </div>
            </div>
        </div>
    )
}

export default HostCateList