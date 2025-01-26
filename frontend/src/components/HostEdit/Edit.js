import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'


function Edit() {

    const confr_id = sessionStorage.getItem("host_confr")

    const [data, setData] = useState(null)
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState(null)
    const [key, setKey] = useState(0)

    useEffect(() => {
        setStatus('loading')
        const fethData = async () => {
            try {
                const res = await axios.get('/api/conference/host/' + confr_id)
                setData(res.data)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
            } finally {
                setStatus('success')
            }
        }
        fethData()
    }, [confr_id])

    // modal data
    const [titleModal, setTitleModal] = useState(false)
    const [descModal, setDescModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [importantDate, setImportantDate] = useState(false)
    const [confrModal, setConfrModal] = useState(false)
    const [logoModal, setLogoModal] = useState(false)
    const [tagModal, setTagModal] = useState(false)
    const [cateModal, setCateModal] = useState(false)

    const handleUpdate = async (e, form, modal) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference', form)
            alert("Success")
            setData(res.data)
            modal()
            setKey(key + 1)
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }

    if (status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if (error) {
        return <SearchItemNotFound />
    }

    return (
        <div key={key}>
            {data &&
                <div className='row gy-5'>
                    <div className='col-12' >
                        <Layout>
                            <div className='py-4'>
                                <h1 className='text-center'>{data.title}</h1>
                                <p className='text-center text-muted'>{data.sub_title}</p>
                                <div className='position-absolute top-0 end-0 m-2'>
                                    <button type='button' onClick={() => setTitleModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                                </div>
                                <EditTitleModal
                                    data={data}
                                    handleClose={() => setTitleModal(false)}
                                    show={titleModal}
                                    handleUpdate={handleUpdate}
                                />
                            </div>
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <EditTagModal show={tagModal} handleClose={() => setTagModal(false)} data={data} handleUpdate={handleUpdate} />
                            <div className='py-4'>
                                <h3>Tag</h3>
                                <hr />
                            </div>
                            <ol>
                                {data.tag?.map((items, index) => (
                                    <li key={index}>
                                        {items}
                                    </li>
                                ))}
                            </ol>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setTagModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <div className='py-4'>
                                <h3>หมวดหมู่งานประชุม</h3>
                                <hr />
                            </div>
                            <div>
                                {data.cate}
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setCateModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <EditCateModal show={cateModal} handleClose={() => setCateModal(false)} data={data} handleUpdate={handleUpdate} />
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <ConfrDateModal show={confrModal} handleClose={() => setConfrModal(false)} data={data} setData={setData} />
                            <div className='py-4'>
                                <h3>ระยะเวลาการดำเนินงาน</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setConfrModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <p>เริ่มต้น: {data.confr_start_date && dayjs(data.confr_start_date).format('DD/MM/YYYY')}</p>
                            <p>สิ้นสุด: {data.confr_end_date && dayjs(data.confr_end_date).format('DD/MM/YYYY')}</p>
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <UploadLogo show={logoModal} handleClose={() => setLogoModal(false)} setData={setData} id={confr_id} />
                            <div className='py-4'>
                                <h3>Logo ประจำงานประชุม</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setLogoModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <div>
                                {data.logo && <img src={`/uploads/${data.logo}`} alt={data.confr_code} className='img-fluid' width={128} />}
                            </div>
                        </Layout>
                    </div>
                    <div className='col-12'>
                        <Layout>
                            <div className='py-4'>
                                <h3>รายละเอียดงานประชุม</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setDescModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <EditDescModal
                                show={descModal}
                                handleClose={() => setDescModal(false)}
                                data={data}
                                handleUpdate={handleUpdate}
                            />
                            <div>
                                {data.confr_desc?.map((items, index) => (
                                    <p key={index} className='text-muted mb-4' >
                                        <span className='me-3'></span>{items}
                                    </p>
                                ))}
                            </div>
                        </Layout>
                    </div>
                    <div className='col-12'>
                        <Layout>
                            <div>
                                <h3>กำหนดการ</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setDateModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>เวลา</th>
                                            <th>รายละเอียด</th>
                                            <th>กรรมการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.schedule?.map((list, index) => (
                                            <tr key={index}>
                                                <td>{list.start} - {list.end}</td>
                                                <td>
                                                    {list.items?.map((desc, idx) => (
                                                        <p key={idx}>{desc}</p>
                                                    ))}
                                                </td>
                                                <td>
                                                    {list.session?.map((chair, idx) => (
                                                        <p className='fw-bold' key={idx}>{chair}</p>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Layout>
                        <EditDateModal show={dateModal} handleClose={() => setDateModal(false)} data={data} handleUpdate={handleUpdate} />
                    </div>
                    <div className='col-12'>
                        <Layout>
                            <div className='py-4'>
                                <h3 className='fw-bold'>แผนและปฏิทินการจัดโครงการ</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setImportantDate(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <EditImportantDate show={importantDate} handleClose={() => setImportantDate(false)} data={data} handleUpdate={handleUpdate} />
                            <div>
                                {data.important_date?.map((items) => (
                                    <div key={items._id} className='show-btn-hover'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {items.date_name}
                                        </div>
                                        <div>
                                            {dayjs(items.start_date).format("DD/MMM/YYYY")} - {dayjs(items.end_date).format("DD/MMM/YYYY")}
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </Layout>
                    </div>
                </div>
            }
        </div>
    )

}

export default Edit

function Layout({ children }) {
    return (
        <div className='card shadow-sm border-0 h-100 position-relative'>
            <div className='card-body'>
                {children}
            </div>
        </div>
    )
}

function EditTitleModal(props) {

    const [form, setForm] = useState(props.data)


    const handleChange = (e) => {
        const { name, value } = e.target
        let mock = { ...form }
        mock[name] = value
        setForm(mock)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขหัวข้องานประชุม</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='form-label'>หัวข้อ</label>
                        <input required name='title' className='form-control' type='text' defaultValue={props.data?.title} onChange={e => handleChange(e)} />
                    </div>
                    <div>
                        <label className='form-label'>หัวข้อรอง</label>
                        <input name='sub_title' className='form-control' type='text' defaultValue={props.data?.sub_title} onChange={e => handleChange(e)} />
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
        </Modal>
    )
}

function EditDescModal(props) {

    const [form, setForm] = useState(props.data)
    const [desc, setDesc] = useState(props.data.confr_desc)

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...desc]
        temp[index] = value
        setDesc(temp)
        setForm({ ...form, confr_desc: temp })
    }

    const handleDel = (index) => {
        let temp = [...desc]
        temp = temp.filter((items, idx) => idx !== index)
        setDesc(temp)
        setForm({ ...form, confr_desc: temp })

    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>รายละเอียดงานประชุม</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body className='row gy-3'>
                    <div>
                        <button type='button' className='btn btn-primary' onClick={() => setDesc([...desc, ""])}>+ Add</button>
                    </div>
                    {desc?.map((items, index) => (
                        <div className='col-12' key={index}>
                            <label className='form-label text-muted'>ย่อหน้าที่ {index + 1}</label>
                            <textarea required className='form-control' defaultValue={items} onChange={e => handleChange(e, index)} />
                            <div className='my-2 text-end'>
                                <button className='btn text-danger' type='button' onClick={() => handleDel(index)}>Delete</button>
                            </div>
                            <hr />
                        </div>
                    ))}
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
        </Modal>
    )
}

function EditDateModal(props) {

    const [form, setForm] = useState(props.data)
    const [schedule, setSchedule] = useState(props.data.schedule)

    const handleAdd = () => {
        let temp = [...schedule]
        temp = [...temp, {
            start: "",
            end: "",
            items: [],
            session: []
        }]
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const addDesc = (index) => {
        let temp = []
        let desc = []
        temp = [...schedule]
        desc = temp[index].items
        desc.push("")
        temp[index].items = desc
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const addSession = (index) => {
        let temp = []
        let session = []
        temp = [...schedule]
        session = temp[index].session
        session.push('')
        temp[index].session = session
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        let temp = [...schedule]
        temp[index][name] = value
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const changeDesc = (e, index, index2) => {
        const { value } = e.target
        let temp = [...schedule]
        temp[index].items[index2] = value
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const changeSession = (e, index, index2) => {
        const { value } = e.target
        let temp = [...schedule]
        temp[index].session[index2] = value
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const handleDelete = (index) => {
        let temp = [...schedule]
        temp = temp.filter((item, idx) => idx !== index)
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const deleteSub = (index1, index2) => {
        let temp = [...schedule]
        temp[index1].items = temp[index1].items.filter((items, idx) => idx !== index2)
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }

    const deleteSession = (index1, index2) => {
        let temp = [...schedule]
        temp[index1].session = temp[index1].session.filter((items, idx) => idx !== index2)
        setSchedule(temp)
        setForm({ ...form, schedule: temp })
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขกำหนดการ</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body>
                    <div className='mb-3'>
                        <button onClick={handleAdd} className='btn btn-primary' type='button'>เพิ่มกำหนดการ</button>
                    </div>
                    {schedule.map((items, index) => (
                        <div key={index} className='row g-3'>
                            <div className='d-flex justify-content-between aling-items-center'>
                                <p className='mb-0 bg-light p-2 rounded text-primary'>
                                    กำหนดการที่ {index + 1}
                                </p>
                                <div className='text-end'>
                                    <button className='btn text-danger btn-sm' type='button' onClick={() => handleDelete(index)}>ลบกำหนดการ</button>
                                </div>
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>เริ่ม</label>
                                <input className='form-control' name='start' type='time' value={items.start} onChange={e => handleChange(e, index)} required />
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>สิ้นสุด</label>
                                <input className='form-control' name='end' type='time' value={items.end} onChange={e => handleChange(e, index)} required />
                            </div>

                            <div className='row g-3'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='mb-0 fw-bold'>รายละเอียด</p>
                                    <div>
                                        <button className='btn btn-outline-primary' type='button' onClick={() => addDesc(index)}>เพิ่มหัวข้อ</button>
                                    </div>
                                </div>
                                {items.items?.map((sub, idx) => (
                                    <div className='col-12' key={idx}>
                                        <label className='form-label'>{idx + 1}.</label>
                                        <textarea className='form-control' name='items' defaultValue={sub} onChange={e => changeDesc(e, index, idx)} required />
                                        <div className='my-2 text-end'>
                                            <button className='btn text-danger btn-sm' type='button' onClick={() => deleteSub(index, idx)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='row g-3'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <p className='fw-bold mb-0'>กรรมการประจำ Session</p>
                                    <div>
                                        <button type='button' onClick={() => addSession(index)} className='btn btn-outline-primary'>เพิ่มกรรมการ</button>
                                    </div>
                                </div>
                                {items.session?.map((sub, idx) => (
                                    <div className='col-12' key={idx}>
                                        <label className='form-label'>{idx + 1}.</label>
                                        <input className='form-control' name='session' defaultValue={sub} onChange={e => changeSession(e, index, idx)} required />
                                        <div className='my-2 text-end'>
                                            <button className='btn text-danger btn-sm' type='button' onClick={() => deleteSession(index, idx)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>
                    ))}
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
        </Modal>
    )
}

function EditImportantDate(props) {

    const [form, setForm] = useState(props.data)
    const [list, setList] = useState(props.data.important_date)

    const handleAdd = () => {
        setList([...list, { date_name: "", start_date: dayjs(new Date()).format("YYYY-MM-DD"), end_date: dayjs(new Date()).format("YYYY-MM-DD") }])
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        let temp = [...list]
        temp[index][name] = value
        setList(temp)
        setForm({ ...form, important_date: temp })
    }

    const handleDel = (index) => {
        let temp = [...list]
        temp = temp.filter((item, idx) => idx !== index)
        setList(temp)
        setForm({ ...form, important_date: temp })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขแผนการจัดโครงการ</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body className='row gy-5'>
                    <div className='col-12'>
                        <button className='btn btn-primary' type='button' onClick={handleAdd}>+ Add</button>
                    </div>
                    {list.map((items, index) => (
                        <div className='col-12' key={index}>
                            <p>รายการที่ {index + 1}</p>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    ชื่อ
                                </label>
                                <input required className='form-control' value={items.date_name} name='date_name' onChange={e => handleChange(e, index)} />
                            </div>
                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <label className='form-label'>เริ่ม</label>
                                    <input required className='form-control' name='start_date' type='date' value={dayjs(items.start_date).format("YYYY-MM-DD")} onChange={e => handleChange(e, index)} />
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>สิ้นสุด</label>
                                    <input required className='form-control' name='end_date' type='date' value={dayjs(items.end_date).format("YYYY-MM-DD")} onChange={e => handleChange(e, index)} />
                                </div>
                            </div>
                            <div className='text-end'>
                                <button type='button' className='btn text-danger' onClick={() => handleDel(index)}>Delete</button>
                            </div>
                            <hr />
                        </div>
                    ))}
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
        </Modal>
    )
}


function ConfrDateModal(props) {

    const [editState, setEditState] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data?._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            alert('Success')
            closeModal()
        } catch (error) {
            alert('Error')
            console.log(error)
        }
    }

    const closeModal = () => {
        setEditState(false)
        props.handleClose()
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ระยะเวลาการดำเนินงาน</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        <label className='from-label'>เริ่มต้น</label>
                        <input className='form-control' name='confr_start_date' type='date' defaultValue={dayjs(props.data?.confr_start_date).format('YYYY-MM-DD')} onChange={() => setEditState(true)} />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>สิ้นสุด</label>
                        <input className='form-control' name='confr_end_date' type='date' defaultValue={dayjs(props.data?.confr_end_date).format('YYYY-MM-DD')} onChange={() => setEditState(true)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!editState}>
                        Update
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

// upload logo
function UploadLogo(props) {

    const [file, setFile] = useState(null)

    const closeModal = () => {
        setFile(null)
        props.handleClose()
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('image', file)
            const res = await axios.patch('/api/conference/logo/' + props.id, formData)
            props.setData(res.data)
            alert('Success')
            closeModal()
        } catch (error) {
            console.log(error)
            alert('Error')
        }
    }



    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Logo</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body>
                    <label className='form-label'>เลือกรูปภาพ</label>
                    <input className='form-control' type='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' disabled={!file}>
                        Upload
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditTagModal(props) {

    const [data, setData] = useState(props.data.tag)
    const [form, setForm] = useState(props.data)

    const handleAdd = () => {
        setData([...data, ""])
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...data]
        temp[index] = value
        setData(temp)
        setForm({ ...form, tag: temp })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไข Tag</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body>
                    <div className='mb-3'>
                        <button type='button' onClick={handleAdd} className='btn btn-outline-primary'>เพิ่ม Tag</button>
                    </div>
                    {data &&
                        <div>
                            {data.map((items, index) => (
                                <div key={index} className='mb-3'>
                                    <label className='form-label'>Tag: {index + 1}</label>
                                    <input className='form-control' type='text' defaultValue={items} onChange={e => handleChange(e, index)} />
                                </div>
                            ))}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditCateModal(props) {

    const [form, setForm] = useState(props.data)

    const handleChange = (e) => {
        const { value } = e.target
        setForm({ ...form, cate: value })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขหมวดหมู่งานประชุม</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body>
                    <div>
                        <p>หมวดหมู่ปัจจุบัน: {props.data.cate}</p>
                        <label className='form-label'>เลือกหมวดหมู่ที่ต้องการเปลี่ยน</label>
                        <select className="form-select" onChange={handleChange}>
                            <option value="">-- เลือกหมวดหมู่</option>
                            <option value="การประชุมวิชาการระดับชาติ">การประชุมวิชาการระดับชาติ</option>
                            <option value="การประชุมวิชาการระดับนานาชาติ">การประชุมวิชาการระดับนานาชาติ</option>
                            <option value="การประชุมวิชาการเฉพาะทาง">การประชุมวิชาการเฉพาะทาง</option>
                            <option value="การประชุมวิชาการประจำปี">การประชุมวิชาการประจำปี</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}