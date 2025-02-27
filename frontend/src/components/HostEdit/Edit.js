import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import { toast } from 'react-toastify';


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
    const [importantDate, setImportantDate] = useState(false)
    const [confrModal, setConfrModal] = useState(false)
    const [logoModal, setLogoModal] = useState(false)
    const [tagModal, setTagModal] = useState(false)
    const [cateModal, setCateModal] = useState(false)

    const [loadingButton, setLoadingButton] = useState(false)
    const handleUpdate = async (e, form, modal) => {
        e.preventDefault()
        setLoadingButton(true)
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
        } finally {
            setLoadingButton(false)
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
                                    loading={loadingButton}
                                />
                            </div>
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <EditTagModal
                                show={tagModal}
                                handleClose={() => setTagModal(false)}
                                data={data}
                                handleUpdate={handleUpdate}
                                loading={loadingButton}
                            />
                            <div className='py-4'>
                                <h4>Tag</h4>
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
                                <h4>หมวดหมู่งานประชุม</h4>
                                <hr />
                            </div>
                            <ul>
                                {data.cate?.map((items, index) => (
                                    <li key={index}>{items}</li>
                                ))}
                            </ul>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setCateModal(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <EditCateModal
                                show={cateModal}
                                handleClose={() => setCateModal(false)}
                                data={data}
                                handleUpdate={handleUpdate}
                                loading={loadingButton}
                            />
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <ConfrDateModal
                                show={confrModal}
                                handleClose={() => setConfrModal(false)}
                                data={data}
                                setData={setData}
                            />
                            <div className='py-4'>
                                <h4>ระยะเวลาการดำเนินงาน</h4>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button
                                    type='button'
                                    onClick={() => setConfrModal(true)}
                                    className='btn'>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                            </div>
                            <p>เริ่มต้น: {data.confr_start_date && dayjs(data.confr_start_date).format('DD MMM YYYY')}</p>
                            <p>สิ้นสุด: {data.confr_end_date && dayjs(data.confr_end_date).format('DD MMM YYYY')}</p>
                        </Layout>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Layout>
                            <UploadLogo
                                show={logoModal}
                                handleClose={() => setLogoModal(false)}
                                setData={setData}
                                id={confr_id}
                            />
                            <div className='py-4'>
                                <h4>Logo ประจำงานประชุม</h4>
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
                                <h4>รายละเอียดงานประชุม</h4>
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
                            <div className='py-4'>
                                <h4>แผนและปฏิทินการจัดโครงการ</h4>
                                <hr />
                            </div>
                            <div className='position-absolute top-0 end-0 m-2'>
                                <button type='button' onClick={() => setImportantDate(true)} className='btn'><i className="bi bi-pencil-square"></i></button>
                            </div>
                            <EditImportantDate
                                show={importantDate}
                                handleClose={() => setImportantDate(false)}
                                data={data}
                                handleUpdate={handleUpdate}
                            />
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
                        <textarea
                            required
                            name='title'
                            className='form-control'
                            rows={3}
                            defaultValue={props.data?.title} onChange={e => handleChange(e)} />
                    </div>
                    <div>
                        <label className='form-label'>หัวข้อรอง</label>
                        <textarea
                            name='sub_title'
                            className='form-control'
                            rows={3}
                            defaultValue={props.data?.sub_title}
                            onChange={e => handleChange(e)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    {props.loading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            ยืนยัน
                        </Button>
                    )}
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
                    {desc?.map((items, index) => (
                        <div className='col-12' key={index}>
                            <label className='form-label text-muted me-2'>ย่อหน้าที่ {index + 1}</label>
                            <div>
                                <textarea
                                    required
                                    className='form-control mb-2'
                                    defaultValue={items}
                                    onChange={e => handleChange(e, index)}
                                    rows={10}
                                />
                                <button className='btn btn-outline-danger' type='button' onClick={() => handleDel(index)}>
                                    <i className="bi bi-trash me-1"></i>
                                    ลบรายละเอียด
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button type='button' className='btn btn-outline-primary' onClick={() => setDesc([...desc, ""])}>
                            <i className="bi bi-plus me-2"></i>
                            เพิ่มรายละเอียด
                        </button>
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
                    {list.map((items, index) => (
                        <div className='col-12' key={index}>
                            <div className="form-text">รายการที่ {index + 1}</div>
                            <hr />
                            <div className='mb-3'>
                                <label className='form-label'>
                                    ชื่อ
                                </label>
                                <input required className='form-control' value={items.date_name} name='date_name' onChange={e => handleChange(e, index)} />
                            </div>
                            <div className='row mb-3'>
                                <div className='col-6'>
                                    <label className='form-label'>เริ่ม (MM/DD/YYYY)</label>
                                    <input
                                        required
                                        className='form-control'
                                        name='start_date'
                                        type='date'
                                        value={dayjs(items.start_date).format("YYYY-MM-DD")}
                                        onChange={e => handleChange(e, index)}
                                    />
                                    <div className="form-text">
                                        หากมีวันเดียวให้ใส่แค่วันเริ่มต้น
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <label className='form-label'>สิ้นสุด</label>
                                    <input
                                        className='form-control'
                                        name='end_date'
                                        type='date'
                                        value={dayjs(items.end_date).format("YYYY-MM-DD")}
                                        onChange={e => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                            <div className='text-end'>
                                <button type='button' className='btn btn-outline-danger' onClick={() => handleDel(index)}>ลบกำหนดการ</button>
                            </div>
                        </div>
                    ))}
                    <div className='col-12'>
                        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
                            <i className="bi bi-plus"></i>
                            เพิ่มกำหนดการ
                        </button>
                    </div>
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

    const [loading, setLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(e.target)
            formData.append('_id', props.data?._id)
            const json = Object.fromEntries(formData.entries())
            const update = await axios.patch('/api/conference', json)
            props.setData(update.data)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log(error)
        } finally {
            props.handleClose()
            setLoading(false)
        }
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
                        <input
                            className='form-control'
                            name='confr_start_date'
                            type='date'
                            defaultValue={dayjs(props.data?.confr_start_date).format('YYYY-MM-DD')}
                        />
                    </div>
                    <div className='col-12'>
                        <label className='form-label'>สิ้นสุด</label>
                        <input
                            className='form-control'
                            name='confr_end_date'
                            type='date'
                            defaultValue={dayjs(props.data?.confr_end_date).format('YYYY-MM-DD')}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={props.handleClose}>
                        ปิด
                    </Button>
                    {loading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            ยืนยัน
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

// upload logo
function UploadLogo(props) {

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const closeModal = () => {
        setFile(null)
        props.handleClose()
    }

    const handleUpdate = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('image', file)
            const res = await axios.patch('/api/conference/logo/' + props.id, formData)
            props.setData(res.data)
            toast.success('Success')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
        } finally {
            setLoading(false)
            closeModal()
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
                    <Button variant="primary" type='submit' disabled={!file || loading}>
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
                        <div key={key} className="row g-3">
                            {data.map((items, index) => (
                                <div key={index}>
                                    <label className='form-label text-muted'>Tag: {index + 1}</label>
                                    <div className="input-group">
                                        <input
                                            className='form-control'
                                            type='text'
                                            defaultValue={items}
                                            onChange={e => handleChange(e, index)}
                                            required />
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
                    {props.loading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            ยืนยัน
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}

function EditCateModal(props) {

    const [form, setForm] = useState(props.data)
    const [key, setKey] = useState(0)

    const handleAdd = () => {
        let temp = { ...form }
        temp.cate.push('')
        setForm(temp)
    }

    const handleDelete = (index) => {
        let temp = { ...form }
        temp.cate = temp.cate.filter((items, idx) => idx !== index)
        setKey(key + 1)
        setForm(temp)
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = { ...form }
        temp.cate[index] = value
        setForm(temp)
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขหมวดหมู่งานประชุม</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body className="row g-3" key={key}>
                    {form.cate?.map((items, index) => (
                        <div key={index}>
                            <label className="form-label">หมวดหมู่ที่ {index + 1}</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    value={items}
                                    onChange={e => handleChange(e, index)}
                                />
                                <button
                                    className="btn btn-outline-danger"
                                    type='button'
                                    onClick={() => handleDelete(index)}
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    ลบ
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-3">
                        <button
                            className="btn btn-outline-primary"
                            type='button'
                            onClick={handleAdd}
                        >
                            <i className="bi bi-plus me-1"></i>
                            เพิ่มหมวดหมู่
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='' onClick={props.handleClose}>ปิด</Button>
                    {props.loading ? (
                        <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button variant="primary" type='submit'>
                            ยืนยัน
                        </Button>
                    )}
                </Modal.Footer>
            </form>
        </Modal>
    )
}