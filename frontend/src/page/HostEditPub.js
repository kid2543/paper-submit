import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import ConfirmDialog from '../components/ConfirmDialog'

function HostEditPub() {

    const [pub, setPub] = useState([])
    const [pubConfr, setPubConfr] = useState([])
    const [newPub, setNewPub] = useState([])
    const [query, setQuery] = useState('')

    const confr_id = sessionStorage.getItem("host_confr")

    //modal
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    // handle check in publcation table
    const handleCheck = (e) => {
        const { checked, value } = e.target
        if (checked === true) {
            setNewPub([...newPub, value])
        } else {
            setNewPub(newPub.filter((items) => items !== value))
        }
    }

    // update publication list
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference', {
                _id: confr_id,
                publication: newPub
            })
            setPubConfr(res.data.publication)
            toast.success('แก้ไขรายชื่อวารสารสำเร็จ')
            handleClose()
            setNewPub([])
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกคร้ง')
            console.log(error)
        }
    }

    useEffect(() => {

        const fethPub = async () => {
            try {
                const res = await axios.get('/api/publication')
                setPub(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const fethConfrPub = async () => {
            try {
                const res = await axios.get('/api/conference/host/' + confr_id)
                setPubConfr(res.data.publication)
            } catch (error) {
                console.log(error)
            }
        }

        fethPub()
        fethConfrPub()
    }, [confr_id])

    const filterPub = pub?.filter(items =>
        items.en_name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div>
            <ConfirmDialog
                show={show}
                handleClose={handleClose}
                header='ยืนยันการเลือกวารสาร ?'
                text='เมื่อทำการเลือกวารสารใหม่วารสารที่เคยเลือกไว้จะหายไป ต้องการยืนยันการเลือกหรือไม่ ?'
                handleSubmit={handleUpdate}
            />
            <div className='mb-3 card'>
                <div className="card-body">
                    <h4 className='fw-bold card-title'>วารสาร</h4>
                    <p className='text-muted card-text'>แก้ไขรายการวารสารได้ที่นี่</p>
                </div>
            </div>
            <div className='card  shadow-sm mb-3'>
                <div className='card-body'>
                    <div className='mb-3'>
                        <h4 className='card-title'>รายชื่อวารสารในงานประชุม</h4>
                        <small className='text-muted card-text'>เลือกวารสารที่ต้องการทั้งหมดแล้วกดบันทึกเพื่อ หากต้องการเปลี่ยนให้เลือกวารสารทั้งหมดใหม่อีกครั้ง</small>
                    </div>
                    <ol>
                        {pubConfr.length <= 0 && <div>ไม่พบข้อมูล</div>}
                        {pubConfr?.map((items) => (
                            <li key={items._id}>
                                <p>{items.en_name} ({items.th_name})</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className='card  shadow-sm'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <h4 className='card-title'>รายชื่อวารสารทั้งหมด</h4>
                        <div>
                            <input className='form-control' placeholder='ค้นหาวารสาร' onChange={e => setQuery(e.target.value)} />
                        </div>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อ EN</th>
                                    <th>ชื่อ TH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterPub?.map((items) => (
                                    <tr key={items._id}>
                                        <td>
                                            <input type='checkbox' value={items._id} onChange={e => handleCheck(e)} checked={newPub.includes(items._id)} />
                                        </td>
                                        <td>
                                            {items.en_name}
                                        </td>
                                        <td>
                                            {items.th_name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='text-end'>
                            <button
                                onClick={handleShow}
                                className='btn btn-success'
                                type='button'
                                disabled={newPub.length <= 0}
                            >
                                <i className='bi bi-floppy me-2'></i>
                                บันทึก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HostEditPub