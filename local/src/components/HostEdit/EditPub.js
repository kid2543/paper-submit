import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchItemNotFound from '../SearchItemNotFound'

const api = process.env.REACT_APP_API_URL

function EditPub() {

    const [id, setId] = useState("")
    const [pub, setPub] = useState([])
    const [pubList, setPubList] = useState([])
    const [sPub, setSPub] = useState([])
    const [pubChecked, setPubChecked] = useState([])

    const handleCheck = (e) => {
        if (e.target.checked) {
            setPubList([...pubList, e.target.value])
        } else {
            setPubList(pubList.filter((item) => item !== e.target.value))
        }
    }

    const searchPub = async (e) => {
        e.preventDefault()
        try {
          if (e.target.pub_name.value) {
            const res = await axios.get(api + "/search/pub/" + e.target.pub_name.value)
            setSPub(res.data)
          } else {
            setSPub(pub)
          }
        } catch (error) {
          console.log(error)
        }
      }

    const savePub = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(api + "/update/conferences/" + id, {
                publication: pubList,
            })
            const res = await axios.get(api + "/get/pub/" + id)
            setPubChecked(res.data)
            alert("เพิ่มข้อมูลสำเร็จ")
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด: " + error.status)
        }
    }

    useEffect(() => {

        const confr_id = sessionStorage.getItem("host_confr")
        setId(confr_id)

        const fethPub = async () => {
            try {
                const res = await axios.get(api + "/all/pub")
                setPub(res.data)
                setSPub(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const fethConfrPub = async () => {
            try {
                const res = await axios.get(api + "/get/pub/" + confr_id)
                setPubChecked(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethPub()
        fethConfrPub()
    }, [])


    return (
        <div className='container my-5'>
            <div>
                <h4 className='fw-bold mb-5'>วารสาร</h4>
                <div>
                    <div className='mb-3'>
                        <p className='text-muted mb-0'>
                            วารสารที่เลือกตอนนี้:
                        </p>
                        {pubChecked.length > 0 ? (
                            <ul className='mt-3'>
                                {pubChecked?.map((item) => (
                                    <li key={item._id} className='mb-3'>
                                        {item.en_name} ({item.th_name}) <br />
                                        <small className='text-muted'>สาขา: {item.branch}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : "-" }

                    </div>
                    <div className='d-md-flex justify-content-between mb-3'>
                        <form onSubmit={searchPub} className='col-md-4 mb-3'>
                            <div className='input-group'>
                                <input name='pub_name' type='search' className='form-control' placeholder='ค้นหาจากชื่อวารสาร EN' />
                                <button type='submit' className='btn btn-outline-secondary btn-sm'>
                                    <ion-icon name="search"></ion-icon>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='table-responsive'>
                        {pub.length > 0 ? (
                            <table className='table table-hover text-nowrap'>
                                <thead className='table-secondary'>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อภาษาไทย</th>
                                        <th>ชื่อภาษาอังกฤษ</th>
                                        <th>สาขา</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sPub?.map((item) => (
                                        <tr key={item._id}>
                                            <td>
                                                <input onChange={handleCheck} type='checkbox' value={item._id} />
                                            </td>
                                            <td>
                                                {item.th_name}
                                            </td>
                                            <td>
                                                {item.en_name}
                                            </td>
                                            <td>
                                                {item.branch?.map((list, index) => (
                                                    <small key={index} className='text-muted'>{list},</small>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className='col-md-2 mb-5'>
                                <SearchItemNotFound />
                            </div>
                        ) }

                        <div>
                            <button type='button' onClick={savePub} className='btn btn-success'>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPub