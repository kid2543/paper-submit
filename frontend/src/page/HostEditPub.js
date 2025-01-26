import React, { useEffect, useState } from 'react'
import axios from 'axios'


function HostEditPub() {

    const [pub, setPub] = useState([])
    const [pubConfr, setPubConfr] = useState([])
    const [newPub, setNewPub] = useState([])
    const [query, setQuery] = useState('')

    const confr_id = sessionStorage.getItem("host_confr")


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
        if (window.confirm('ยืนยันข้อมูลหรือไม่ ?')) {
            try {
                const res = await axios.patch('/api/conference', {
                    _id: confr_id,
                    publication: newPub
                })
                setPubConfr(res.data.publication)
                alert('Success')
            } catch (error) {
                alert('Error')
                console.log(error)
            }
        } else {
            return
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
        <div className='py-5'>
            <div className='mb-4'>
                <h4 className='fw-bold'>วารสาร</h4>
                <p className='text-muted'>แก้ไขรายการวารสารได้ที่นี่</p>
            </div>
            <div className='card border-0 shadow-sm mb-4'>
                <div className='card-body'>
                    <div className='mb-4'>
                        <h6 className='fw-bold'>รายชื่อวารสารในงานประชุม</h6>
                        <small className='text-muted'>เลือกวารสารที่ต้องการทั้งหมดแล้วกดบันทึกเพื่อ หากต้องการเปลี่ยนให้เลือกวารสารทั้งหมดใหม่อีกครั้ง</small>
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
            <div className='card border-0 shadow-sm'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h6 className='fw-bold'>รายชื่อวารสารทั้งหมด</h6>
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
                            <button className='btn btn-success' type='submit' disabled={newPub.length <= 0}>
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