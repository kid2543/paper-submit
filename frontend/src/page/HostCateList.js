import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import ConfirmModal from '../components/ConfirmModal';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function HostCateList() {

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [show, setShow] = useState(false)
    const [showCM, setShowCM] = useState(false)
    const [createError, setCreateError] = useState(null)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const id = sessionStorage.getItem('host_confr')

    const deleteCate = async (cate_id) => {
        if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
            try {
                const res = await axios.delete('/api/category/' + cate_id)
                toast.success(res.data)
                setSearchData(searchData.filter(items => items._id !== cate_id))
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data.error)
            }
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
            toast.success('เพิ่มงานประชุมสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด')
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
        <div className='py-5'>
            <ToastContainer />
            <ConfirmModal show={showCM} setShow={setShowCM} noReturn={true} />
            <div className='mb-4'>
                <h4 className='fw-bold'>หัวข้องานประชุม</h4>
                <p className='text-muted'>เพิ่มหัวข้องานประชุมและแก้ไขกรรมการประจำหัวข้อได้ที่นี่</p>
            </div>
            <div className='card border-0 shadow-sm'>
                <div className='card-body'>
                    <div className='d-md-flex justify-content-between mb-4 align-items-center'>
                        <h6 className='fw-bold mb-0'>รายการหัวข้องานประชุม</h6>
                        <button type='button' onClick={handleShow} className='btn btn-primary'><i className="bi bi-plus-lg me-2"></i>เพิ่มหัวข้องานประชุม</button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create Category</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={handleCreate}>
                                <Modal.Body className='row g-3 align-items-center'>
                                    <div className='col-12'>
                                        <label className='col-form-label'>รหัสหัวข้อ</label>
                                        <input className='form-control' name='category_code' pattern='([?=.*A-Za-z])(?=.*\d).{7,}' />
                                        <small>รหัสหัวข้อประกอบด้วย ตัวอักษรและตัวเลข อย่างน้อย 8 ตัวอักษร</small>
                                    </div>
                                    <div className='col-12'>
                                        <label className='col-form-label'>ชื่อหัวข้อ</label>
                                        <input className='form-control' name='name' />
                                    </div>
                                    <div className='col-12'>
                                        <label className='col-form-label'>รายละเอียด</label>
                                        <textarea className='form-control' name='desc' />
                                    </div>
                                    {createError && <div className='text-danger'>{createError}</div>}
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn" onClick={handleClose}>
                                        Close
                                    </button>
                                    <button type='submit' className="btn btn-primary">
                                        Create
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
                                        <th>รูป</th>
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
                                                <Link to={`/host/edit/category/${cate._id}`} type='button' className='btn btn-primary me-2'>
                                                    <i className='bi bi-pen'></i>
                                                </Link>
                                                <button onClick={() => deleteCate(cate._id)} type='button' className='btn btn-danger'>
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                                {/* <div className='d-flex'>
                                                    <Dropdown drop='down-centered'>
                                                        <Dropdown.Toggle variant="btn">
                                                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href={'/host/edit/category/' + cate._id}>
                                                                <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                                                                Edit
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => deleteCate(cate._id, cate.icon)}>
                                                                <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div> */}
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