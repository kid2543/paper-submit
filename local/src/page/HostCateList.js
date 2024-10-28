import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import ConfirmModal from '../components/ConfirmModal';
import SearchItemNotFound from '../components/SearchItemNotFound';
import Dropdown from 'react-bootstrap/Dropdown';

const api = process.env.REACT_APP_API_URL

function HostCateList() {

    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [id, setId] = useState("")
    const [show, setShow] = useState(false);
    const [createCateData, setCreateCateData] = useState({
        cate_name: "",
        cate_code: "",
        cate_desc: "",
        cate_icon: null
    })
    const [showCM, setShowCM] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteCate = async (cate_id, icon) => {
        if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
            try {
                const del = await axios.delete(api + "/delete/cate/" + cate_id + "/" + icon)
                let filterData = data.filter((item) => item._id !== cate_id)
                setData(filterData)
                setSearchData(filterData)
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

    const handleChangeCreate = (e) => {
        setCreateCateData({ ...createCateData, [e.target.name]: e.target.value })
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", createCateData.cate_name)
            formData.append("cate_code", createCateData.cate_code)
            formData.append("desc", createCateData.cate_desc)
            formData.append("confr_id", id)
            formData.append("image", createCateData.cate_icon)
            const res = await axios.post(api + "/create/category", formData)
            setShowCM(true)
            handleClose()
            setData(prev => [res.data, ...prev])
            setSearchData(prev => [res.data, ...prev])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const confr_id = sessionStorage.getItem("host_confr")
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
    }, [])


    return (
        <div className='container my-5'>
            <ConfirmModal show={showCM} setShow={setShowCM} noReturn={true} />
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
                        <form onSubmit={handleCreate}>
                            <Modal.Body className='row g-3 align-items-center'>
                                <div className='col-12'>
                                    <label className='col-form-label'>รหัสหัวข้อ</label>
                                    <input className='form-control' name='cate_code' onChange={handleChangeCreate} />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>ชื่อหัวข้อ</label>
                                    <input className='form-control' name='cate_name' onChange={handleChangeCreate} />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>รายละเอียด</label>
                                    <textarea className='form-control' name='cate_desc' onChange={handleChangeCreate} />
                                </div>
                                <div className='col-12'>
                                    <label className='col-form-label'>รูป</label>
                                    <input className='form-control' type='file' name='cate_icon' onChange={e => setCreateCateData({ ...createCateData, cate_icon: e.target.files[0] })} />
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
                    <button type='button' onClick={handleShow} className='btn btn-outline-primary btn-sm'><ion-icon name="add-circle-outline"></ion-icon> New</button>
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
                                            <Dropdown drop='down-centered'>
                                                <Dropdown.Toggle variant="btn">
                                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href={"/host/cate/" + cate._id}>
                                                        <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => deleteCate(cate._id, cate.icon)}>
                                                        <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <SearchItemNotFound />}
        </div>
    )
}

export default HostCateList