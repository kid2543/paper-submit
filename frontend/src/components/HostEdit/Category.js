import React, { useDeferredValue, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import useFetch from './hook/useFetch';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL

function Category() {

    const confr_id = sessionStorage.getItem("host_confr")

    const { data, error, status, setData } = useFetch(`${api}/get/category/${confr_id}`)

    const [createModal, setCreateModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [assignModal, setAssignModal] = useState(false)
    const [editData, setEditData] = useState({})

    const handleEdit = (data) => {
        setEditData(data)
        setEditModal(true)
    }


    return (
        <div className='row gy-5'>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3>หัวข้องานประชุม</h3>
                            <div>
                                <button type='button' onClick={() => setCreateModal(true)} className='btn btn-primary rounded-pill'>+ เพิ่มหัวข้องานประชุม</button>
                            </div>
                            <CreateCategoryModal show={createModal} handleClose={() => setCreateModal(false)} id={confr_id} data={data} setData={setData} />
                        </div>
                        <div className='my-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>รหัส</th>
                                        <th>ชื่อ</th>
                                        <th>กรรมการ</th>
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((items) => (
                                        <tr key={items._id}>
                                            <td>{items.category_code}</td>
                                            <td>{items.name}</td>
                                            <td>{items.reviewer_list.length}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" className='' id="dropdown-basic">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleEdit(items)}>
                                                            <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                                                            Edit
                                                        </Dropdown.Item>
                                                        <EditCategoryModal show={editModal} data={editData} setData={setData} handleClose={() => setEditModal(false)} />
                                                        <Dropdown.Item onClick={() => setAssignModal(true)}><span className='me-2'><ion-icon name="person-add-outline"></ion-icon></span>Assign</Dropdown.Item>
                                                        <AssignModal show={assignModal} handleClose={() => setAssignModal(false)} data={items} />
                                                        <Dropdown.Item className='text-danger' href="#/action-2"><span className='me-2'><ion-icon name="close-outline"></ion-icon></span>Cancel</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category

function CreateCategoryModal(props) {

    const [icon, setIcon] = useState(null)

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const input = e.target
            const formData = new FormData()
            formData.append("name", input.name.value)
            formData.append("desc", input.desc.value)
            formData.append("image", icon)
            formData.append("confr_id", props.id)
            formData.append("cate_code", input.cate_code.value)
            const res = await axios.post(api + "/create/category", formData)
            console.log(res)
            alert("Success")
            props.handleClose()
            props.setData([...props.data, res.data])
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มหัวข้องานประชุม</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='form-label'>รูป</label>
                        <input name='icon' className='form-control' accept='image/*' type='file' required onChange={e => setIcon(e.target.files[0])} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รหัสงานประชุม</label>
                        <input name='cate_code' className='form-control' required />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อ</label>
                        <input name='name' className='form-control' required />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียด</label>
                        <textarea name='desc' className='form-control' required />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        สร้าง
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditCategoryModal(props) {

    const [icon, setIcon] = useState(null)

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (icon !== null) {
            try {
                console.log("Uploading...", props.data.icon)
                const input = e.target
                const formData = new FormData()
                formData.append("name", input.name.value)
                formData.append("image", icon)
                formData.append("desc", input.desc.value)
                const res = await axios.patch(api + "/upload/cate/" + props.data._id + '/' + props.data.icon, formData)
                console.log(res.data)
                alert("Success")
            } catch (error) {
                console.log(error)
                alert("Error")
            }
        } else {
            try {
                const formData = new FormData(e.target)
                const value = Object.fromEntries(formData.entries())
                const res = await axios.patch(api + "/update/cate/" + props.data._id, value)
                console.log(res)
                alert("Success")
            } catch (error) {
                console.log(error)
                alert("Error")
            }
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขหัวข้องานประชุม <span className='text-primary'>{props.data.category_code}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <div>
                            <img height={128} width={128} src={api + "/image/" + props.data.icon} alt={props.data.icon} />
                        </div>
                        <label className='form-label'>รูป</label>
                        <input name='icon' className='form-control' accept='image/*' type='file' onChange={e => setIcon(e.target.files[0])} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รหัสงานประชุม</label>
                        <input name='cate_code' className='form-control-plaintext' required readOnly value={props.data.category_code} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>ชื่อ</label>
                        <input name='name' className='form-control' required defaultValue={props.data.name} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียด</label>
                        <textarea name='desc' className='form-control' required defaultValue={props.data.desc} />
                    </div>
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

function AssignModal(props) {

    const list = useFetch("/get/committee/list/" + props.data._id)

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มกรรมการ {props.data.category_code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    List
                    <ul>
                        {list.data?.map((items) => (
                            <li key={items._id}>
                                {items.fname}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    กรรมการ
                    <div className='form-check'>
                        <input className='form-check-input' type='checkbox' value="mock" />
                        <label className='form-check-label'>Default checkbox</label>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    ปิด
                </Button>
                <Button variant="primary" onClick={props.handleClose}>
                    ยืนยัน
                </Button>
            </Modal.Footer>
        </Modal>
    )
}