import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../ConfirmDeleteDialog';


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
    const [editDateData, setEditDateData] = useState({})
    const [importantDate, setImportantDate] = useState(false)
    const [confrModal, setConfrModal] = useState(false)
    const [logoModal, setLogoModal] = useState(false)
    const [tagModal, setTagModal] = useState(false)
    const [cateModal, setCateModal] = useState(false)
    const [createDateModal, setCreateDateModal] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [scheduleId, setScheduleId] = useState('')

    const handleShowEditDate = (items) => {
        console.log(items)
        setEditDateData(items)
        setDateModal(true)
    }

    const handleUpdate = async (e, form, modal) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference', form)
            toast.success("อัพเดทสำเร็จ")
            setData(res.data)
            if (modal) {
                modal()
            }
            setKey(key + 1)
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        }
    }

    const handleShowDeleteDialog = (id) => {
        setScheduleId(id)
        setShowDeleteDialog(true)
    }

    const deleteSchedule = (e, id) => {
        let temp = { ...data }
        temp.schedule = temp.schedule.filter(items => items._id !== id)
        handleUpdate(e, temp)
        setShowDeleteDialog(false)
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
                <div className='row g-3'>
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
                            <p>เริ่มต้น: {data.confr_start_date && dayjs(data.confr_start_date).format('DD MMM YYYY')}</p>
                            <p>สิ้นสุด: {data.confr_end_date && dayjs(data.confr_end_date).format('DD MMM YYYY')}</p>
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
                        <ConfirmDeleteDialog
                            header='ยืนยันการลบกำหนดการ ?'
                            message='ต้องการลบกำหนดการหรือไม่'
                            onCancel={() => setShowDeleteDialog(false)}
                            onConfirm={e => deleteSchedule(e, scheduleId)}
                            show={showDeleteDialog}
                        />
                        <Layout>
                            <div>
                                <h3>กำหนดการ</h3>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setCreateDateModal(true)} className='btn'><i className="bi bi-plus-lg"></i></button>
                            </div>
                            <div>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>เวลา</th>
                                            <th>รายละเอียด</th>
                                            <th>กรรมการ</th>
                                            <th>เครื่องมือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.schedule?.sort((a,b) => a.start.localeCompare(b.start)).map((list, index) => (
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
                                                <td>
                                                    <div className="btn-group">
                                                        <button onClick={() => handleShowEditDate(list)} className="btn btn-outline-dark" type='button'>
                                                            <i className="bi bi-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleShowDeleteDialog(list._id)}
                                                            className="btn btn-outline-dark"
                                                            type='button'
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Layout>
                        <EditDateModal
                            show={dateModal}
                            handleClose={() => setDateModal(false)}
                            data={data}
                            editDate={editDateData}
                            handleUpdate={handleUpdate}
                        />
                        <CreateDateModal
                            show={createDateModal}
                            handleClose={() => setCreateDateModal(false)}
                            data={data}
                            handleUpdate={handleUpdate}
                        />
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
                                            {dayjs(items.start_date).format("DD MMM YYYY")} {items.end_date && 
                                            <>
                                            - {dayjs(items.end_date).format("DD MMM YYYY")}
                                            </>
                                            }
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
        <div className='card h-100 position-relative'>
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

function CreateDateModal(props) {

    const [desc, setDesc] = useState([""])
    const [chair, setChair] = useState([])

    // desc
    const handleChangeDesc = (e, index) => {
        const { value } = e.target
        let temp = [...desc]
        temp[index] = value
        setDesc(temp)
    }

    const handleAddDesc = () => {
        setDesc([...desc, ""])
    }

    const handleDeleteDesc = (index) => {
        setDesc(desc.filter((items, idx) => idx !== index))
    }

    // chair
    const handleChangeChair = (e, index) => {
        const { value } = e.target
        let temp = [...chair]
        temp[index] = value
        setChair(temp)
    }

    const handleAddChair = () => {
        setChair([...chair, ""])
    }

    const handleDeleteChair = (index) => {
        setChair(chair.filter((items, idx) => idx !== index))
    }


    // update data
    const updateSchedule = (e) => {
        e.preventDefault()
        let temp = [...props.data.schedule]
        let allData = { ...props.data }
        temp.push({
            start: e.target.start.value,
            end: e.target.end.value,
            items: desc,
            session: chair
        })
        allData.schedule = temp
        props.handleUpdate(e, allData, props.handleClose)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มกำหนดการ</Modal.Title>
            </Modal.Header>
            <form onSubmit={updateSchedule}>
                <Modal.Body className="row g-3">
                    <div className="col-6">
                        <label>เริ่มต้น</label>
                        <input name='start' className="form-control" type='time' required />
                    </div>
                    <div className="col-6">
                        <label>สิ้นสุด</label>
                        <input name='end' className="form-control" type='time' required />
                    </div>
                    <div>
                        <div className="mb-3">
                            <p className="fw-bold mb-0">รายละเอียด</p>
                            <button onClick={handleAddDesc} type='button' className="btn btn-success">
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มรายละเอียด
                            </button>
                        </div>
                        <div className="row g-3">
                            {desc.map((descs, index) => (
                                <div key={index}>
                                    <label className="form-label">หัวข้อที่ {index + 1}</label>
                                    <div className="input-group">
                                        <textarea
                                            rows={3}
                                            onChange={e => handleChangeDesc(e, index)}
                                            value={descs}
                                            type='text'
                                            className='form-control'
                                            required
                                        />
                                        <button
                                            type='button'
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteDesc(index)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <p className="fw-bold mb-0">กรรมการ</p>
                            <button onClick={handleAddChair} type='button' className="btn btn-success">
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มกรรมการ
                            </button>
                        </div>
                        <div className="row g-3">
                            {chair.map((chairs, index) => (
                                <div key={index}>
                                    <label className="form-label">กรรมการท่านที่: {index + 1}</label>
                                    <div className="input-group">
                                        <input
                                            key={index}
                                            onChange={e => handleChangeChair(e, index)}
                                            value={chairs}
                                            type='text'
                                            className='form-control'
                                            required
                                        />
                                        <button
                                            onClick={() => handleDeleteChair(index)}
                                            type='button'
                                            className="btn btn-danger"
                                        >
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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

function EditDateModal(props) {

    const [data, setData] = useState({
        start: '',
        end: '',
        items: [],
        session: []
    })

    useEffect(() => {
        setData(props.editDate)
    }, [props.editDate])

    // desc
    const handleAddDesc = () => {
        let temp = { ...data }
        temp.items.push('')
        setData(temp)
    }

    const handleChangeDesc = (e, index) => {
        const { value } = e.target
        let temp = { ...data }
        temp.items[index] = value
        setData(temp)
    }

    const handleDeleteDesc = (index) => {
        let temp = { ...data }
        temp.items = temp.items.filter((list, idx) => idx !== index)
        setData(temp)
    }

    //chair
    const handleAddChair = () => {
        let temp = { ...data }
        temp.session.push('')
        setData(temp)
    }

    const handleChangeChair = (e, index) => {
        const { value } = e.target
        let temp = { ...data }
        temp.session[index] = value
        setData(temp)
    }

    const handleDeleteChair = (e, index) => {
        let temp = { ...data }
        temp.session = temp.session.filter((list, idx) => idx !== index)
        setData(temp)
    }

    const handleCloseModal = () => {
        setData({
            start: '',
            end: '',
            items: [],
            session: []
        })
        props.handleClose()
    }

    const updateSchedule = (e) => {
        e.preventDefault()
        let temp = { ...props.data }
        temp.schedule = temp.schedule.map((items) => {
            if (items._id === data._id) {
                return data
            } else {
                return items
            }
        })
        props.handleUpdate(e, temp, props.handleClose)
    }

    return (
        <Modal show={props.show} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มกำหนดการ</Modal.Title>
            </Modal.Header>
            <form
                onSubmit={updateSchedule}
            >
                <Modal.Body className="row g-3">
                    <div className="col-6">
                        <label>เริ่มต้น</label>
                        <input
                            name='start'
                            className="form-control"
                            value={data?.start}
                            type='time'
                            required
                            onChange={e => setData({ ...data, start: e.target.value })}
                        />
                    </div>
                    <div className="col-6">
                        <label>สิ้นสุด</label>
                        <input
                            name='end'
                            className="form-control"
                            type='time'
                            value={data?.end}
                            required
                            onChange={e => setData({ ...data, end: e.target.value })}
                        />
                    </div>
                    <div>
                        <div className="mb-3">
                            <p className="fw-bold mb-0">รายละเอียด</p>
                            <button
                                onClick={handleAddDesc}
                                type='button'
                                className="btn btn-success"
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มรายละเอียด
                            </button>
                        </div>
                        <div className="row g-3">
                            {data.items?.map((descs, index) => (
                                <div key={index}>
                                    <label className="form-label">หัวข้อที่ {index + 1}</label>
                                    <div className="input-group">
                                        <textarea
                                            rows={3}
                                            onChange={e => handleChangeDesc(e, index)}
                                            value={descs}
                                            type='text'
                                            className='form-control'
                                            required
                                        />
                                        <button
                                            type='button'
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteDesc(index)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <p className="fw-bold mb-0">กรรมการ</p>
                            <button
                                onClick={handleAddChair}
                                type='button'
                                className="btn btn-success"
                            >
                                <i className="bi bi-plus-lg me-2"></i>
                                เพิ่มกรรมการ
                            </button>
                        </div>
                        <div className="row g-3">
                            {data.session?.map((chairs, index) => (
                                <div key={index}>
                                    <label className="form-label">กรรมการท่านที่: {index + 1}</label>
                                    <div className="input-group">
                                        <input
                                            key={index}
                                            onChange={e => handleChangeChair(e, index)}
                                            value={chairs}
                                            type='text'
                                            className='form-control'
                                            required
                                        />
                                        <button
                                            onClick={() => handleDeleteChair(index)}
                                            type='button'
                                            className="btn btn-danger"
                                        >
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleCloseModal}>
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
                                    <input className='form-control' name='end_date' type='date' value={dayjs(items.end_date).format("YYYY-MM-DD")} onChange={e => handleChange(e, index)} />
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
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        อัพเดท
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
            toast.success('แก้ไขสำเร็จ')
            closeModal()
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
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
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit' disabled={!editState}>
                        อัพเดท
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
            toast.success('Success')
            closeModal()
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
        }
    }



    return (
        <Modal show={props.show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>อัพโหลดรูป Logo</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body>
                    <label className='form-label'>เลือกรูปภาพ</label>
                    <input className='form-control' type='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={closeModal}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit' disabled={!file}>
                        อัพโหลด
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditTagModal(props) {

    const [data, setData] = useState(props.data.tag)
    const [form, setForm] = useState(props.data)
    const [key, setKey] = useState(0)

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

    const deleteTag = (index) => {
        let temp = [...data]
        let newData = temp.filter((items, idx) => idx !== index)
        setData(newData)
        setForm({ ...form, tag: newData })
        setKey(key + 1)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไข Tags</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body>
                    <div className='mb-3 d-flex justify-content-between align-items-center'>
                        <h6 className="fw-bold">รายการ Tags</h6>
                        <button type='button' onClick={handleAdd} className='btn btn-outline-primary'>
                            <i className="bi bi-plus-lg me-2"></i>
                            เพิ่ม
                        </button>
                    </div>
                    {data &&
                        <div key={key}>
                            {data.map((items, index) => (
                                <div key={index}>
                                    <label className='form-label'>Tag: {index + 1}</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        defaultValue={items}
                                        onChange={e => handleChange(e, index)}
                                        required />
                                    <div className="text-end mt-2">
                                        <button type='button' onClick={() => deleteTag(index)} className='btn btn-danger btn-sm'>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" type='submit'>
                        แก้ไข
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