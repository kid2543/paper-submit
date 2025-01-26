import React, { useState } from "react"
import useSearch from "../../hook/useSearch"
import axios from "axios"

// component
import LoadingPage from "../LoadingPage"

// react boostrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

function Publication() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/publication/search")

    const [createPub, setCreatePub] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [key, setKey] = useState(0)
    const [edit, setEdit] = useState({
        th_name: "",
        en_name: "",
        desc: []
    })

    const handleEdit = (data) => {
        setEdit(data)
        setEditModal(true)
    }

    const handleDel = async (id) => {
        if (window.confirm("ต้องการลบวารสารหรือไม่")) {
            try {
                await axios.delete('/api/publication/' + id)
                let temp = [...data]
                temp = temp.filter((items) => items._id !== id)
                setData(temp)
                alert('Deleted')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='mx-5 my-5'>
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <p className="fw-bold">รายการวารสาร</p>
                    {error && <div className="text-danger">Error</div>}
                    <div className='d-flex justify-content-between my-3'>
                        <form onSubmit={handleSearchChange}>
                            <input
                                className='form-control'
                                type='search'
                                placeholder='ค้นหา'
                                name='search'
                            />
                        </form>
                        <div>
                            <button type='button' className='btn btn-primary' onClick={() => setCreatePub(true)}>เพิ่มวารสาร</button>
                            <CreatePubModal show={createPub} handleClose={() => setCreatePub(false)} setData={setData} data={data} />
                        </div>
                    </div>
                    <div>
                        {status === 'idle' || status === 'loading' ? (
                            <LoadingPage />
                        ) : (
                            <div key={key} >
                                {data &&
                                    <div className="table-responsive" style={{ minWidth: "500px", minHeight: "200px" }}>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>ชื่อภาษาไทย</th>
                                                    <th>ชื่อภาษาอังกฤษ</th>
                                                    <th>เพิ่มเติม</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>
                                                            {item.th_name}
                                                        </td>
                                                        <td>
                                                            {item.en_name}
                                                        </td>
                                                        <td>
                                                            <Dropdown align="end">
                                                                <Dropdown.Toggle variant='btn'>
                                                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item type='button' onClick={() => handleEdit(item)}>
                                                                        <span className='me-2'><i className="bi bi-pen"></i></span>
                                                                        แก้ไข
                                                                    </Dropdown.Item>
                                                                    <EditPubModal setKey={setKey} key={key} data={edit} setData={setEdit} show={editModal} handleClose={() => setEditModal(false)} setSearch={setData} searchData={data} />
                                                                    <Dropdown.Item className='text-danger' type='button' onClick={() => handleDel(item._id)}>
                                                                        <span className='me-2'><i className="bi bi-trash"></i></span>
                                                                        ลบ
                                                                    </Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span>{`Page ${page} of ${totalPages}`}</span>
                                            <div>
                                                <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                                                    <i className="bi bi-arrow-left"></i> ก่อนหน้า
                                                </button>
                                                <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link'>
                                                    ถัดไป <i className="bi bi-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Publication

function CreatePubModal(props) {

    const [form, setForm] = useState({
        th_name: "",
        en_name: "",
        desc: [""]
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        let temp = { ...form }
        temp[name] = value
        setForm(temp)
    }

    const handleAdd = () => {
        let temp = { ...form }
        let arr = [...form.desc]
        arr.push("")
        temp.desc = arr
        setForm(temp)
    }

    const handleDesc = (e, index) => {
        const { value } = e.target
        let temp = { ...form }
        temp.desc[index] = value
        setForm(temp)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/publication', form)
            props.setData([res.data, ...props.data])
            setForm({
                th_name: "",
                en_name: "",
                desc: [""]
            })
            alert('Created')
            props.handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Publication</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไทย</label>
                        <input name='th_name' className='form-control' placeholder='ไม่มีให้ใส่ -' required onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                        <input name='en_name' className='form-control' placeholder="ไม่มีให้ใส่ -" required onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-primary' type='button' onClick={handleAdd}>+ Add</button>
                    </div>
                    <div>
                        {form.desc.map((items, index) => (
                            <div key={index} className='mb-3'>
                                <label className='form-label'>ย่อหน้าที่ {index + 1}</label>
                                <textarea className='form-control' defaultValue={items} onChange={e => handleDesc(e, index)} />
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditPubModal(props) {

    const handleChange = (e) => {
        const { name, value } = e.target
        let temp = { ...props.data }
        temp[name] = value
        props.setData(temp)
    }

    const handleAdd = () => {
        let temp = { ...props.data }
        let arr = [...props.data.desc]
        arr.push("")
        temp.desc = arr
        props.setData(temp)
    }

    const handleDesc = (e, index) => {
        const { value } = e.target
        let temp = { ...props.data }
        temp.desc[index] = value
        props.setData(temp)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const data = props.data
        const id = props.data._id
        try {
            const res = await axios.patch('/api/publication/' + id, data)
            props.handleClose()
            props.setKey(props.key + 1)
            const newData = props.searchData.map((items) => {
                if(items._id === id) {
                    return res.data
                } else {
                    return items
                }
            })
            props.setSearch(newData)
            alert("Update Success")
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                {props.data &&
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>แก้ไขวารสาร {props.data.en_name}</Modal.Title>
                        </Modal.Header>
                        <form onSubmit={handleUpdate}>
                            <Modal.Body className='row gy-3'>
                                <div className='col-12'>
                                    <label className='form-label'>ชื่อภาษาไทย</label>
                                    <input name='th_name' className='form-control' defaultValue={props.data.th_name} onChange={handleChange} />
                                </div>
                                <div className='col-12'>
                                    <label className='form-label'>ชื่อภาษาอังกฤษ</label>
                                    <input name='en_name' className='form-control' defaultValue={props.data.en_name} onChange={handleChange} />
                                </div>
                                <div className='col-12'>
                                    <label className='form-label'>เป้าหมาย</label>
                                    <div className='mb-3'>
                                        <button type='button' onClick={handleAdd} className='btn btn-primary'>+ Add</button>
                                    </div>
                                    {props.data.desc.map((items, index) => (
                                        <div className='mb-3' key={index}>
                                            <textarea className='form-control' defaultValue={items} onChange={e => handleDesc(e, index)} />
                                        </div>
                                    ))}
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
                    </>
                }
            </Modal>
        </div>
    )
}