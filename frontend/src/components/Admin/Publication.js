import React, { useEffect, useState } from "react"
import useSearch from "../../hook/useSearch"
import axios from "axios"

// component
import LoadingPage from "../LoadingPage"

// react boostrap
import {
    Button,
    Modal,
} from 'react-bootstrap';
import { toast } from "react-toastify";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function Publication() {

    const {
        data,
        error,
        status,
        setData,
        handleSearchChange,
        handleNextPage,
        handlePreviousPage,
        page,
        totalPages
    } = useSearch("/api/publication/search")

    const [createPub, setCreatePub] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [edit, setEdit] = useState({
        th_name: "",
        en_name: "",
        desc: []
    })

    const handleCloseEditModal = () => {
        setEdit({
            th_name: '',
            en_name: '',
            desc: []
        })
        setEditModal(false)
    }

    const handleEdit = (data) => {
        setEdit(data)
        setEditModal(true)
    }

    // handle delete modal and function
    const [deleteId, setDeleteId] = useState('')
    const [showDelete, setShowDelete] = useState(false)
    const [errorText, setErrorText] = useState(null)
    const handleShowDelete = (id) => {
        setDeleteId(id)
        setShowDelete(true)
    }
    const handleCloseDelete = () => {
        setDeleteId('')
        setShowDelete(false)
    }
    const handleDel = async (id) => {
        setErrorText(null)
        try {
            await axios.delete('/api/publication/' + id)
            let temp = [...data]
            temp = temp.filter((items) => items._id !== id)
            setData(temp)
            toast.success('ลบวารสารแล้ว')
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
            setErrorText(error.response.data?.error)
        } finally {
            handleCloseDelete()
        }
    }

    return (
        <div>
            <ConfirmDeleteDialog
                header='ยืนยันการลบวารสาร ?'
                message='ต้องการลบวารสารหรือไม่ เนื่องจากหากมีบทความที่มาการส่งบทความมายังวารสารนี้แล้วจะไม่สามารถลบได้'
                onCancel={handleCloseDelete}
                onConfirm={() => handleDel(deleteId)}
                show={showDelete}

            />
            {errorText &&
                <div className="alert alert-danger">
                    {errorText}
                </div>
            }
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold card-title">รายการวารสาร</h4>
                        <div>
                            <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => setCreatePub(true)}
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มวารสาร
                            </button>
                            <CreatePubModal
                                show={createPub}
                                handleClose={() => setCreatePub(false)}
                                setData={setData}
                                data={data}
                            />
                            <EditPubModal
                                show={editModal}
                                handleClose={handleCloseEditModal}
                                data={edit}
                                setData={setData}
                                updateData={data}
                            />
                        </div>
                    </div>
                    {error && <div className="text-danger">Error</div>}
                    <form className="mb-3" onSubmit={handleSearchChange}>
                        <input
                            className='form-control'
                            type='search'
                            placeholder='ค้นหา'
                            name='search'
                        />
                    </form>
                    <div>
                        {status === 'idle' || status === 'loading' ? (
                            <LoadingPage />
                        ) : (
                            <div >
                                {data &&
                                    <div className="table-responsive" style={{ minWidth: "1000px", minHeight: "400px" }}>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ชื่อภาษาไทย</th>
                                                    <th>ชื่อภาษาอังกฤษ</th>
                                                    <th>เพิ่มเติม</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {item.th_name}
                                                        </td>
                                                        <td>
                                                            {item.en_name}
                                                        </td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleEdit(item)}
                                                                    className="btn btn-light">
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleShowDelete(item._id)}
                                                                    className="btn btn-light text-danger">
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                            {/* <Dropdown align="end">
                                                                <Dropdown.Toggle variant='dark'>
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
                                                            </Dropdown> */}
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
            toast.success('เพิ่มวารสารแล้ว')
            props.handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>สร้างวารสารใหม่</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleCreate}>
                <Modal.Body>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อไทย</label>
                        <input
                            name='th_name'
                            className='form-control'
                            placeholder='ไม่มีให้ใส่ -'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ชื่อภาษาอังกฤษ</label>
                        <input
                            name='en_name'
                            className='form-control'
                            placeholder="ไม่มีให้ใส่ -"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <button
                            className='btn btn-success'
                            type='button'
                            onClick={handleAdd}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            เพิ่มรายละเอียด
                        </button>
                    </div>
                    <div>
                        {form.desc.map((items, index) => (
                            <div key={index} className='mb-3'>
                                <label className='form-label'>ข้อที่ {index + 1}</label>
                                <textarea className='form-control' defaultValue={items} onChange={e => handleDesc(e, index)} />
                            </div>
                        ))}
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

function EditPubModal(props) {

    const [data, setData] = useState({
        th_name: '',
        en_name: '',
        desc: []
    })
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const handleAdd = () => {
        let temp = { ...data }
        temp.desc.push('')
        setData(temp)
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        let temp = { ...data }
        temp[name] = value
        setData(temp)
    }

    const handleChangeDesc = (e, index) => {
        const { value } = e.target
        let temp = { ...data }
        temp.desc[index] = value
        setData(temp)
    }

    const handleDelete = (index) => {
        let temp = { ...data }
        temp.desc = temp.desc.filter((items, idx) => idx !== index)
        setData(temp)
    }

    const handleUpdate = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const res = await axios.patch('/api/publication/' + data._id, data)
            let temp = [...props.updateData]
            const newData = temp.map((items) => {
                if (items._id === res.data._id) {
                    return res.data
                } else {
                    return items
                }
            })
            props.setData(newData)
            toast.success('แก้ไขวารสารสำเร็จ')
            props.handleClose()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขวารสาร: <span className="text-primary">{props.data?.en_name}</span></Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className="row g-3">
                    <div>
                        <label className="form-label">ชื่อภาษาไทย</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="ไม่มีให้ใส่ -"
                            value={data?.th_name}
                            name="th_name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label">ชื่อภาษาอังกฤษ</label>
                        <input
                            type="text"
                            placeholder="ไม่มีให้ใส่ -"
                            className="form-control"
                            value={data?.en_name}
                            name="en_name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <p className="fw-bold mb-0">รายละเอียดวารสาร</p>
                        <div className="mb-3">
                            <Button type="button" onClick={handleAdd} variant="success">
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มวารสาร
                            </Button>
                        </div>
                        <div className="row g-3">
                            {data?.desc.map((items, index) => (
                                <div key={index}>
                                    <label className="form-label">
                                        ข้อที่: {index + 1}
                                        <Button type="button" variant="" onClick={() => handleDelete(index)} className="text-danger">
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </label>
                                    <textarea
                                        value={items}
                                        rows={3}
                                        className="form-control"
                                        onChange={e => handleChangeDesc(e, index)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button disabled={isLoading} variant="primary" type='submit'>
                        อัพเดท
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}