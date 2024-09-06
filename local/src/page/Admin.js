import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function Admin() {

    const navigate = useNavigate()

    const today = dayjs(new Date()).format("DD/MMM/YYYY")

    const [hostList, setHostList] = useState([])
    const [confrList, setConfrList] = useState([])

    const fethHostList = async () => {
        try {
            const res = await axios.get(api + "/all/host")
            setHostList(res.data)
            console.log("hostlist data:", res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fethConfr = async () => {
        try {
            const res = await axios.get(api + "/all/confr")
            setConfrList(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const activeConfr = async (status, confr_id) => {
        if (window.confirm("ต้องการเปลี่ยนสถานะบทความหรือไม่")) {
            try {
                await axios.patch(api + "/update/conferences/" + confr_id, {
                    status: status
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleEndDate = (date) => {
        console.log(today, date)
        if (date < today) {
            return <span className='badge bg-danger'>{date}</span>
        } else if (date === today) {
            return <span className='badge bg-warning'>{date}</span>
        } else {
            return <span className='badge bg-primary'>{date}</span>
        }
    }



    useEffect(() => {
        fethHostList()
        fethConfr()
    }, [])

    return (
        <div className='container py-5'>
            <h4 className='fw-bold mb-3'>Admin Dashboard</h4>
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    รายชื่อผู้จัดงานทั้งหมด
                </div>
                <div>
                    <button type='button' onClick={() => navigate("create")} className='btn btn-primary'>เพิ่มผู้จัดงานประชุม</button>
                </div>
            </div>
            <div className='table-responsive'>
                {hostList.length > 0 ? (
                    <table className='table table-hover text-nowrap'>
                        <thead className='table-primary'>
                            <tr>
                                <th>ชื่อ</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>มหาวิทยาลัย</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostList?.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <a href={"/user/" + item._id}>{item.prefix} {item.fname} {item.lname}</a>
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.phone}
                                    </td>
                                    <td>
                                        {item.university}
                                    </td>
                                    <td>
                                        <button className='btn btn-outline-danger border-0'><ion-icon name="trash-bin"></ion-icon></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h4 className='text-center fw-bold my-5'>ไม่พบข้อมูล</h4>
                )}
            </div>
            <p>รายการงานประชุม</p>
            <div className='table-responsive'>
                <table className='table table-hover'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Conference code</th>
                            <th>Title</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {confrList?.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <a href={"/confr/" + item._id}>
                                        {item.confr_code}
                                    </a>
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td>
                                    <span className='badge bg-primary'>{dayjs(item.confr_start_date).format("DD/MMM/YYYY")}</span>
                                </td>
                                <td>
                                    {handleEndDate(dayjs(item.confr_end_date).format("DD/MMM/YYYY"))}
                                </td>
                                <td>
                                    {item.status ? <span className='badge bg-primary'>Active</span> : <span className='badge bg-danger'>Close</span>}
                                </td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input onChange={e => activeConfr(e.target.checked, item._id)} defaultChecked={item.status} className="form-check-input" type="checkbox" />
                                        <label className="form-check-label">On/off</label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Admin