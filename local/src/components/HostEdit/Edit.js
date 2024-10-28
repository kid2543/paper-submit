import React, { useState } from 'react'
import Logo from '../../asset/logo.png'
import dayjs from 'dayjs'
import useFetch from './hook/useFetch'
import LoadingPage from '../LoadingPage'
import SearchItemNotFound from '../SearchItemNotFound'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'

const api = process.env.REACT_APP_API_URL

const startDate = new Date("2022-10-10")
const endDate = new Date("2025-10-10")

const important_date = [
    {
        id: 0,
        name: "Full paper submission",
        start_date: startDate,
        end_date: endDate,
    },
    {
        id: 1,
        name: "Final full paper submission deadline 1",
        start_date: startDate,
        end_date: endDate,
    },
    {
        id: 2,
        name: "Final full paper submission deadline 2",
        start_date: startDate,
        end_date: endDate,
    },
    {
        id: 3,
        name: "Acceptance notification 1",
        start_date: startDate,
        end_date: endDate,
    },
    {
        id: 4,
        name: "Acceptance notification 2",
        start_date: startDate,
        end_date: endDate,
    },
]

function Edit() {

    const confr_id = sessionStorage.getItem("host_confr")

    const { data, error, status, setData } = useFetch(`${api}/get/confr/${confr_id}`)

    const [titleModal, setTitleModal] = useState(false)
    const [descModal, setDescModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [importantDate, setImportantDate] = useState(false)

    console.log("data", data)

    const handleUpdate = async (e, form, modal) => {
        e.preventDefault()
        try {
            await axios.patch(api + "/update/conferences/" + confr_id, form)
            alert("Success")
            setData(form)
            modal()
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

    if (status === 'success') {
        return (
            <div className='row gy-5'>
                <div className='col-12' >
                    <Layout>
                        <div className='py-4'>
                            <h1 className='text-center'>{data?.title}</h1>
                            <p className='text-center text-muted'>{data?.sub_title}</p>
                            <div className='position-absolute top-0 end-0 m-1'>
                                <button type='button' onClick={() => setTitleModal(true)} className='btn text-secondary'><ion-icon name="pencil-outline"></ion-icon></button>
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
                <div className='col-12'>
                    <Layout>
                        <div className='py-4'>
                            <h3>รายละเอียดงานประชุม</h3>
                            <hr />
                        </div>
                        <div className='position-absolute top-0 end-0 m-1'>
                            <button type='button' onClick={() => setDescModal(true)} className='btn text-secondary'><ion-icon name="pencil-outline"></ion-icon></button>
                        </div>
                        <EditDescModal
                            show={descModal}
                            handleClose={() => setDescModal(false)}
                            data={data}
                            handleUpdate={handleUpdate}
                        />
                        <div>
                            {data.confr_desc?.map((items, index) => (
                                <p key={index} className='text-muted' >
                                    {items}
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
                        <div className='position-absolute top-0 end-0 m-1'>
                            <button type='button' onClick={() => setDateModal(true)} className='btn text-secondary'><ion-icon name="pencil-outline"></ion-icon></button>
                        </div>
                        <div>
                            <table className='table'>
                                <tbody>
                                    {data.schedule?.map((list, index) => (
                                        <tr key={index}>
                                            <td>{list.start} - {list.end}</td>
                                            <td>
                                                {list.items?.map((desc, idx) => (
                                                    <p key={idx}>{desc}</p>
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
                        <div className='position-absolute top-0 end-0 m-1'>
                            <button type='button' onClick={() => setImportantDate(true)} className='btn text-secondary'><ion-icon name="pencil-outline"></ion-icon></button>
                        </div>
                        <EditImportantDate show={importantDate} handleClose={() => setImportantDate(false)} data={data} />
                        <div>
                            {important_date.map((items) => (
                                <div key={items.id} className='show-btn-hover'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        {items.name}
                                    </div>
                                    <div>
                                        {dayjs(items.start_date).format("DD MMM YYYY")} - {dayjs(items.end_date).format("DD MMM YYYY")}
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </Layout>
                </div>
            </div>
        )
    }

}

export default Edit

function Layout({ children }) {
    return (
        <div className='card position-relative'>
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
                    <Button variant="secondary" onClick={props.handleClose}>
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
                    <Button variant="secondary" onClick={props.handleClose}>
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
            items: []
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


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขกำหนดการ</Modal.Title>
            </Modal.Header>
            <form onSubmit={e => props.handleUpdate(e, form, props.handleClose)}>
                <Modal.Body className='row gy-3'>
                    <div>
                        <button onClick={handleAdd} className='btn btn-primary' type='button'>+ Add</button>
                    </div>
                    {schedule.map((items, index) => (
                        <div key={index} className='row g-3'>
                            <div className='col-12'>
                                หัวข้อที่ {index + 1}
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>เริ่ม</label>
                                <input className='form-control' name='start' type='time' value={items.start} onChange={e => handleChange(e, index)} required />
                            </div>
                            <div className='col-6'>
                                <label className='form-label'>สิ้นสุด</label>
                                <input className='form-control' name='end' type='time' value={items.end} onChange={e => handleChange(e, index)} required />
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-link' type='button' onClick={() => addDesc(index)}>เพิ่มหัวข้อ</button>
                            </div>
                            <div className='row g-3'>
                                {items.items?.map((sub, idx) => (
                                    <div className='col-12' key={idx}>
                                        <textarea className='form-control' name='items' defaultValue={sub} onChange={e => changeDesc(e, index, idx)} required />
                                        <div>
                                            <button className='btn text-danger' type='button' onClick={() => deleteSub(index, idx)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='text-end'>
                                <button className='btn text-danger' type='button' onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                            <hr />
                        </div>
                    ))}
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
    )
}

function EditImportantDate(props) {

    const [form, setForm] = useState(props.data)

    console.log("form", form)

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขแผนการจัดโครงการ</Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body className='row gy-3'>
                    <div className='col-12'>
                        
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
    )
}