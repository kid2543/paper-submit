import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';

const api = process.env.REACT_APP_API_URL

function HostCateList() {

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [id, setId] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCate = async (cate_id, icon) => {
        if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
            try {
                const del = await axios.delete(api + "/delete/cate/" + cate_id + "/" + icon)
                setData(data.filter((item) => item._id !== cate_id))
                alert("ลบผู้ใช้งานสำเร็จ: " + del.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const searchCate = async (e) => {
        e.preventDefault()
        try {
            if (e.target.cate_name.value) {
                const res = await axios.get(api + `/search/cate/${e.target.cate_name.value}/${id}`)
                setSearchData(res.data)
            } else {
                setSearchData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const confr_id = sessionStorage.getItem("confr")
        setId(confr_id)

        const fethCate = async () => {
            try {
                const res = await axios.get(api + "/get/cofr/cate/" + confr_id)
                setData(res.data)
                setSearchData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethCate()

        if (!confr_id || confr_id === "undefined") {
            return (
                <div>
                    <button className='btn btn-primary'>สร้างงานประชุม</button>
                </div>
            )
        }
    }, [])

    return (
        <div className='container my-5'>
            <div className='mb-3'>
                <h4 className='m-0 fw-bold'>หัวข้องานประชุม</h4>
            </div>
            <div className='d-md-flex justify-content-between mb-3'>
                <form onSubmit={searchCate} className='col-md-4 mb-3'>
                    <div className='input-group'>
                        <input name='cate_name' type='text' className='form-control' placeholder='ค้นหาจากชื่อหัวข้อ' />
                        <button type='submit' className='btn btn-outline-secondary btn-sm'>
                            <ion-icon name="search"></ion-icon>
                        </button>
                    </div>
                </form>
                <div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Category</Modal.Title>
                        </Modal.Header>
                        <form>
                            <Modal.Body className='row g-3 align-items-center'>
                                <div className='col-12'>
                                    <label className='col-form-label'>รหัสงานประชุม</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>ชื่อหัวข้อ</label>
                                    <input className='form-control' />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>รายละเอียด</label>
                                    <input className='form-control' placeholder='desc' />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>รูป</label>
                                    <input className='form-control' type='file' />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                </button>
                                <button type='submit' className="btn btn-primary">
                                    Save Changes
                                </button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                    <button type='button' onClick={handleShow} className='btn btn-primary'>Create New +</button>
                </div>
            </div>
            {data.length > 0 ? (
                <div className="table-responsive">
                    <table className='table table-hover'>
                        <thead className='table-secondary'>
                            <tr>
                                <th>รหัส</th>
                                <th>รูป</th>
                                <th>ชื่อ</th>
                                <th>จำนวนกรรมการ</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchData?.map((cate) => (
                                <tr key={cate._id}>
                                    <td>{cate.category_code}</td>
                                    <td>
                                        <img src={api + "/image/" + cate.icon} alt={cate.icon} className='rounded-circle' width={32} height={32} />
                                    </td>
                                    <td>{cate.name}</td>
                                    <td>{cate.reviewer_list.length}</td>
                                    <td>
                                        <div className='d-flex'>
                                            <NavLink to={cate._id}><ion-icon name="create"></ion-icon></NavLink>
                                            <button type='button' onClick={() => deleteCate(cate._id, cate.icon)} className='btn btn-sm text-decoration-none text-danger'><ion-icon name="trash-bin"></ion-icon></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='text-center'>
                    ไม่พบข้อมูล
                </div>
            )}
        </div>
    )
}

export default HostCateList