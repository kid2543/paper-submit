import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminPub from './AdminPub';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import useSearch from '../hook/useSearch';
import LoadingPage from '../components/LoadingPage';
import PaperStatus, { PaperResult } from '../components/PaperStatus';
import Dropdown from 'react-bootstrap/Dropdown';

const api = process.env.REACT_APP_API_URL

function Admin() {

    return (
        <div className='container-md'>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Admin
                </Breadcrumb.Item>
            </Breadcrumb>
            <h3 className='fw-bold mb-3'>Admin Dashboard</h3>
            <Tabs
                defaultActiveKey="host"
                id="uncontrolled-tab-example"
                className="mb-3"
                variant='underline'
            >
                <Tab eventKey="host" title="ผู้จัดงานประชุม">
                    <div className='card p-3'>
                        <HostList />
                    </div>
                </Tab>
                <Tab eventKey="committee" title="กรรมการ">
                    <div className='card p-3'>
                        <CommitteeList />
                    </div>
                </Tab>
                <Tab eventKey="author" title="ผู้ส่งบทความ">
                    <div className='card p-3'>
                        <AuthorList />
                    </div>
                </Tab>
                <Tab eventKey="confr" title="งานประชุม">
                    <div className='card p-3'>
                        <ConfrList />
                    </div>
                </Tab>
                <Tab eventKey="pub" title="วารสาร">
                    <div className='card p-3'>
                        <AdminPub />
                    </div>
                </Tab>
                <Tab eventKey="paper" title="บทความ">
                    <div className='card p-3'>
                        <PaperList />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Admin

function HostList() {

    const { data, error, status, page, totalPages, setData, handleSearchChange, handleNextPage, handlePreviousPage } = useSearch("/host/search")
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')

    const handleDelete = async (userId, userName) => {
        if (window.confirm("ต้องการจะลบ username: " + userName + " หรือไม่?")) {
            try {
                await axios.delete(api + "/delete/user/" + userId)
                setData(data.filter((item) => item._id !== userId))
                alert("ลบสำเร็จ")
            } catch (error) {
                console.error("Error delete:", error)
            }
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append("role", "host")
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post(api + "/signup", value)
            setData([res.data, ...data])
            handleClose()
            alert("สร้างผู้ใช้งานสำเร็จ")
        } catch (error) {
            if (error.status === 400) {
                setErrorText("มีผู้ใช้งานแล้ว")
            }
            console.log(error)
        }
    }

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    if (status === "idie" || status === "loading") {
        return <LoadingPage />
    }

    if (status === 'success') {
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มผู้ใช้งาน</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleCreate}>
                        <Modal.Body className='row g-3'>
                            <div className='col-12'>
                                <label className='form-label'>ชื่อ</label>
                                <input className='form-control' name='fname' required />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>นามสกุล</label>
                                <input className='form-control' name='lname' required />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Username</label>
                                <input className={errorText === '' ? 'form-control' : 'form-control is-invalid'} name='username' required onFocus={() => setErrorText('')} />
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                    {errorText}
                                </div>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Password</label>
                                <input className='form-control' name='password' type='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,29}$' required onChange={e => setPassword(e.target.value)} />
                                <small className='text-muted'>รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ขั้นต่ำ 8 ตัวอักษร</small>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Confirm password</label>
                                <input className='form-control' name='confirm_password' type='password' required pattern={password} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Create
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className='d-flex justify-content-between'>
                    <form onSubmit={handleSearchChange}>
                        <input
                            type="text"
                            name='search'
                            placeholder="Search..."
                            className='form-control'
                        />
                    </form>
                    <button className='btn btn-primary mb-3' type='button' onClick={handleShow}>
                        <ion-icon name="person-add-outline"></ion-icon>
                    </button>
                </div>
                <div className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.length > 0 ? (
                            <tbody>
                                {data?.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <button type='button' onClick={() => handleDelete(item._id, item.username)} className='btn btn-sm btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr className='text-center'>
                                    <td colSpan={4} className='p-3 fw-bold'>ไม่พบรายการ</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
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
        )
    }

    if (error) {
        return <div>Error</div>
    }

}


function ConfrList() {

    const { data, error, status, page, totalPages, setData, handleSearchChange, handleNextPage, handlePreviousPage } = useSearch("/search/confr")
    const [show, setShow] = useState(false)
    const [errorText, setErrorText] = useState('')

    const navigate = useNavigate()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleCreateConfr = async (e) => {
        e.preventDefault()
        try {
            const input = e.target
            const formData = new FormData()
            formData.append("title", input.title.value)
            formData.append("confr_code", input.confr_code.value.toUpperCase())
            formData.append("confr_end_date", input.confr_end_date.value)
            formData.append("owner", sessionStorage.getItem("token"))
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post(api + "/create/conferences", value)
            setData([res.data, ...data])
            alert("สร้างสำเร็จ")
            handleClose()
        } catch (error) {
            if (error.status === 400) {
                setErrorText("รหัสนี้มีผู้ใช้งานแล้ว")
                console.log(error)
            } else {
                console.log(error)
            }
        }
    }

    const handleEdit = (id) => {
        sessionStorage.setItem("host_confr", id)
        navigate("/host/confr/")
    }

    if (status === 'idie' || status === 'loading') {
        return <LoadingPage />
    }

    if (status === 'success') {
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>สร้างงานประชุม</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleCreateConfr}>
                        <Modal.Body className='row g-3'>
                            <div className='col-12'>
                                <label className='form-label'>ชื่องานประชุม</label>
                                <input className='form-control' name='title' required />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>รหัสงานประชุม</label>
                                <input className={errorText ? "form-control is-invalid" : "form-control"} name='confr_code' required onFocus={() => setErrorText('')} />
                                <div className="invalid-feedback">
                                    {errorText}
                                </div>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>วันสิ้นสุดงานประชุม</label>
                                <input className='form-control' type='date' name='confr_end_date' required />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                ปิด
                            </Button>
                            <Button variant="primary" type='submit'>
                                สร้าง
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className='d-flex justify-content-between mb-3'>
                    <form onSubmit={handleSearchChange}>
                        <input className='form-control' placeholder='Search...' name='search' />
                    </form>
                    <div>
                        <button className='btn btn-primary' type='button' onClick={handleShow}>Create New</button>
                    </div>
                </div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Code</td>
                            <td>End date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    {data.length > 0 ? (
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.confr_code}</td>
                                    <td>{dayjs(item.confr_end_date).format("DD MMM YYYY")}</td>
                                    <td>
                                        <div className='form-check form-switch'>
                                            <input className='form-check-input' type='checkbox' defaultChecked={item.status} />
                                            {item.status ? (
                                                <label className='form-check-label'>
                                                    Active
                                                </label>
                                            ) : (
                                                <label className='form-check-label text-muted'>
                                                    Inactive
                                                </label>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-secondary border-0 btn-sm me-2' onClick={() => handleEdit(item._id)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={5} className='text-center'>ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    )}
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
        )
    }

    if (error) {
        return <div>Error</div>
    }

}

function CommitteeList() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/search/committee")

    const [show, setShow] = useState(false)
    const [password, setPassword] = useState('')
    const [errorText, setErrorText] = useState('')

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append("role", "committee")
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post(api + "/signup", value)
            setData([res.data, ...data])
            alert("เพิ่มผู้ใช้งานสำเร็จ")
            handleClose()
        } catch (error) {
            if (error.status === 400) {
                setErrorText("มีผู้ใช้งานแล้ว")
            }
            console.error("Error Create", error)
        }
    }

    const handleDelete = async (userId, userName) => {
        if (window.confirm("ต้องการลบ " + userName + " จริงหรือไม่")) {
            try {
                await axios.delete(api + "/delete/user/" + userId)
                setData(data.filter((item) => item._id !== userId))
                alert("ลบสำเร็จ")
            } catch (error) {
                console.error("Error delete", error)
            }
        }
    }

    if (status === 'idie' || status === 'loading') {
        return <LoadingPage />
    }

    if (status === 'success') {
        return (
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>เพิ่มกรรมการ</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleCreate}>
                        <Modal.Body className='row g-3'>
                            <div className='col-12'>
                                <label className='form-label'>ชื่อ</label>
                                <input className='form-control' name='fname' required />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>นามสกุล</label>
                                <input className='form-control' name='lname' required />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Username</label>
                                <input className={errorText === '' ? 'form-control' : 'form-control is-invalid'} name='username' required onFocus={() => setErrorText('')} />
                                <div className="invalid-feedback">
                                    {errorText}
                                </div>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Password</label>
                                <input className='form-control' name='password' type='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,29}$' onChange={e => setPassword(e.target.value)} required />
                                <small className='text-muted'>รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ขั้นต่ำ 8 ตัวอักษร</small>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>Confirm password</label>
                                <input className='form-control' name='confirm_password' type='password' pattern={password} required />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Create
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <form onSubmit={handleSearchChange}>
                        <input
                            className='form-control'
                            placeholder='Search...'
                            name='search'
                        />
                    </form>
                    <div>
                        <button type='button' className='btn btn-primary' onClick={handleShow}><ion-icon name="person-add-outline"></ion-icon></button>
                    </div>
                </div>
                <div className='table-resonsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {data.length > 0 ? (
                            <tbody>
                                {data?.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.fname}</td>
                                        <td>{item.lname}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <button type='button' onClick={() => handleDelete(item._id, item.username)} className='btn btn-danger btn-sm'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr className='text-center'>
                                    <td colSpan={4} className='p-3 fw-bold'>ไม่พบรายการ</td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
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
        )
    }

    if (error) {
        return <div>Error</div>
    }

}

function PaperList() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/search/paper")

    if (status === 'idie' || status === 'loading') {
        return <LoadingPage />
    }

    if (status === 'success') {
        return (
            <div>
                <div className='my-3'>
                    <form onSubmit={handleSearchChange}>
                        <input className='form-control' name='search' placeholder='ค้นหา...' />
                    </form>
                </div>
                <div>
                    <table className='table align-middle'>
                        <thead>
                            <tr>
                                <th>รหัสบทความ</th>
                                <th style={{width: 500}}>ชื่อบทความ</th>
                                <th>สถานะ</th>
                                <th>ผลลัพธ์</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((items) => (
                                <tr key={items._id}>
                                    <td>{items.paper_code}</td>
                                    <td>{items.title}</td>
                                    <td>
                                        <PaperStatus status={items.status} />
                                    </td>
                                    <td>
                                        <PaperResult status={items.result} />
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">
                                                <span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>
                                                View
                                                </Dropdown.Item>
                                                <Dropdown.Item className='text-danger' href="#/action-3">
                                                <span className='me-2'><ion-icon name="close-outline"></ion-icon></span>
                                                Cancel
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
            </div>
        )
    }

    if (error) {
        return <div>Error</div>
    }

}

function AuthorList() {
    return (
        <div>
            Author
        </div>
    )
}