import React, { useState } from 'react'
import useFetch from '../hook/useFetch'

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function HostEditPresentation() {

    const id = sessionStorage.getItem('host_confr')
    const { data, setData, loading, error } = useFetch('/api/conference/host/' + id)

    // modal data
    const [showA, setShowA] = useState(false)
    const [showB, setShowB] = useState(false)


    if (loading === 'idle' || loading === 'loading') {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div className='py-5'>
            <div>
                <div className='mb-4'>
                    <h4 className='fw-bold'>ข้อแนะนำการนำเสนอ</h4>
                    <p className='text-muted'>เพิ่มและแก้ไขข้อแนะนำการเสนอสำหรับ ผู้นำเสนอ กรรมการ และผู้ชม ได้ที่นี่</p>
                </div>
                <div className='card border-0 shadow-sm mb-5'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h6 className='fw-bold mb-0'>ข้อแนะการนำเสนอบทความ</h6>
                            <div>
                                <button className='btn' type='button' onClick={() => setShowA((true))}>
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                            </div>
                        </div>
                        {data &&
                            <ul>
                                <GuidelineModal show={showA} handleClose={() => setShowA(false)} setData={setData} id={id} data={data.presentation_guideline} />
                                {data.presentation_guideline.map((items, index) => (
                                    <li key={index}>{items}</li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
                <div className='card border-0 shadow-sm my-5'>
                    <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h6 className='fw-bold mb-0'>รายละเอียดเพิ่มเติม</h6>
                            <div>
                                <button className='btn' type='button' onClick={() => setShowB(true)}>
                                    <i className='bi bi-pencil-square'></i>
                                </button>
                            </div>
                        </div>
                        {data &&
                            <div>
                                <RemarkModal show={showB} handleClose={() => setShowB(false)} data={data.presentation_remark} setData={setData} id={id} />
                                {data.presentation_remark}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostEditPresentation

function GuidelineModal(props) {

    const [guideline, setGuideline] = useState(props.data || [])

    // add arr
    const handleAdd = () => {
        setGuideline([...guideline, ""])
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...guideline]
        temp[index] = value
        setGuideline(temp)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference', {
                _id: props.id,
                presentation_guideline: guideline
            })
            props.setData(res.data)
            alert('Success')
            props.handleClose()
        } catch (error) {
            console.log(error)
            alert('Error')
        }
    }


    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ข้อแนะนำการนำเสนอ</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row gy-3'>
                    <div>
                        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>Add +</button>
                    </div>
                    {guideline.map((items, index) => (
                        <div className='col-12' key={index}>
                            <label className='form-label'>ข้อที่: {index + 1}</label>
                            <textarea className='form-control' value={items} onChange={e => handleChange(e, index)} />
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

function RemarkModal(props) {

    const [remark, setRemark] = useState(props.data || "")

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference', {
                _id: props.id,
                presentation_remark: remark
            })
            props.setData(res.data)
            alert('Success')
            props.handleClose()
        } catch (error) {
            console.log(error)
            alert('Error')
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ข้อแนะนำการนำเสนอ</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleUpdate}>
                <Modal.Body className='row'>
                    <div className='col-12'>
                        <label className='form-label'>รายละเอียดเพิ่มเติม</label>
                        <textarea className='form-control' value={remark} onChange={e => setRemark(e.target.value)} />
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