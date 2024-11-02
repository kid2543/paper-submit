import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchItemNotFound from '../components/SearchItemNotFound';
import useSearch from '../hook/useSearch';
import LoadingPage from '../components/LoadingPage';

const api = process.env.REACT_APP_API_URL

function AdminPub() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/search/publication")

    const [createPub, setCreatePub] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [edit, setEdit] = useState({
        th_name: "",
        en_name: "",
        branch: []
    })

    const handleEdit = (data) => {
        setEdit(data)
        setEditModal(true)
    }

    const handleDel = async (id) => {
        if (window.confirm("ต้องการลบวารสารหรือไม่")) {
            try {
                await axios.delete(api + "/delete/pub/" + id)
                let temp = [...data]
                temp = temp.filter((items) => items._id !== id)
                setData(temp)
            } catch (error) {
                console.log(error)
            }
        }
    }


    if (status === 'idie' || status === 'loading') {
        return <LoadingPage />
    }

    if (status === 'success') {
        return (
            <div className='px-3'>
                <div className='d-flex justify-content-between my-3'>
                    <form onSubmit={handleSearchChange}>
                        <input
                            className='form-control'
                            type='search'
                            placeholder='ค้นหาวารสาร'
                            name='search'
                        />
                    </form>
                    <div>
                        <button type='button' className='btn btn-outline-primary' onClick={() => setCreatePub(true)}>เพิ่มวารสาร</button>
                        <CreatePubModal show={createPub} handleClose={() => setCreatePub(false)} setData={setData} data={data} />
                    </div>
                </div>
                <div>
                    {data.length > 0 ? (
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ชื่อภาษาไทย</th>
                                        <th>ชื่อภาษาอังกฤษ</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item) => (
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
                                                            <span className='me-2'><ion-icon name="create-outline"></ion-icon></span>
                                                            Edit
                                                        </Dropdown.Item>
                                                        <EditPubModal data={edit} setData={setEdit} show={editModal} handleClose={() => setEditModal(false)} />
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDel(item._id)}>
                                                            <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-between align-items-center'>
                                <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-outline-secondary border-0'>
                                    <ion-icon name="arrow-back-outline"></ion-icon> Previous
                                </button>
                                <span>{`Page ${page} of ${totalPages}`}</span>
                                <button onClick={handleNextPage} disabled={page === totalPages} className='btn btn-outline-secondary border-0'>
                                    Next <ion-icon name="arrow-forward-outline"></ion-icon>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <SearchItemNotFound />
                    )}
                </div>
            </div>
        )
    }

    if (error) {
        return <div>Error</div>
    }

}

export default AdminPub

function CreatePubModal(props) {

    const [form, setForm] = useState({
        th_name: "",
        en_name: "",
        branch: [""]
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        let temp = { ...form }
        temp[name] = value
        setForm(temp)
    }

    const handleAdd = () => {
        let temp = { ...form }
        let arr = [...form.branch]
        arr.push("")
        temp.branch = arr
        setForm(temp)
    }

    const handleBrach = (e, index) => {
        const { value } = e.target
        let temp = { ...form }
        temp.branch[index] = value
        setForm(temp)
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(api + "/create/pub", form)
            props.setData([res.data, ...props.data])
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
                        <input name='en_name' className='form-control' required onChange={handleChange} />
                    </div>
                    <div className='mb-3'>
                        <button className='btn btn-primary' type='button' onClick={handleAdd}>+ Add</button>
                    </div>
                    <div>
                        {form.branch.map((items, index) => (
                            <div key={index} className='mb-3'>
                                <label className='form-label'>หัวข้อที่ {index + 1}</label>
                                <textarea className='form-control' defaultValue={items} onChange={e => handleBrach(e, index)} />
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
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
        let arr = [...props.data.branch]
        arr.push("")
        temp.branch = arr
        props.setData(temp)
    }

    const handleBrach = (e, index) => {
        const { value } = e.target
        let temp = { ...props.data }
        temp.branch[index] = value
        props.setData(temp)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(api + "/update/pub/" + props.data._id, props.data)
            props.handleClose()
            alert("Update Success")
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
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
                            {props.data.branch.map((items, index) => (
                                <div className='mb-3' key={index}>
                                    <textarea className='form-control' defaultValue={items} onChange={e => handleBrach(e, index)} />
                                </div>
                            ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}