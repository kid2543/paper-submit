import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import Dropdown from 'react-bootstrap/Dropdown'

const api = process.env.REACT_APP_API_URL

function Committee() {

    const [loading, setLoading] = useState(true)
    const [paper, setPaper] = useState([])

    const navigate = useNavigate()


    const reviewStatus = (status) => {
        switch (status) {
            case 0: return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
            case 1: return <span className="badge rounded-pill bg-success">ตรวจแล้ว</span>
            case 2: return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
            default: return <span className="badge rounded-pill bg-secondary">ไม่ระบุ</span>
        }
    }

    const handleReviewStatus = (status, id) => {
        switch (status) {
            case 0: return <Dropdown.Item onClick={() => navigate("/committee/review/" + id)}><span className='me-2'><ion-icon name="shield-checkmark-outline"></ion-icon></span>ให้คะแนน</Dropdown.Item>
            case 1: return <Dropdown.Item onClick={() => navigate("/committee/review/result/" + id)}><span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>ดูการให้คะแนน</Dropdown.Item>
            case 2: return "-"
            default: return "ไม่ระบุ"
        }
    }

    useEffect(() => {

        const id = sessionStorage.getItem("token")

        const fethData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(api + "/get/review/" + id)
                console.log("paper_data: ", res.data)
                setPaper(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        setTimeout(() => {
            setLoading(false)
        }, 1000)

        fethData()
    }, [])

    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className='container my-5'>
            <div className='mb-5'>
                <h4 className='fw-bold'>ตรวจบทความ</h4>
            </div>
            <section>
                <div className='mb-5'>
                    <p className='text-muted'>รายการบทความ</p>
                    {paper.length > 0 ? (
                        <div>
                            <div className='table-responsive-md'>
                                <table className='table text-nowrap table-hover'>
                                    <thead className='fw-bold'>
                                        <tr>
                                            <th>รหัสบทความ</th>
                                            <th>ชื่อบทความ</th>
                                            <th>ไฟล์บทความ</th>
                                            <th>สถานะ</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paper?.map((paperList) => (
                                            <tr key={paperList._id}>
                                                <td>{paperList.paper_id?.paper_code}</td>
                                                <td>{paperList.paper_id?.title}</td>
                                                <td>
                                                    {paperList.paper_id?.close_name_file ? (
                                                        <a href={api + "/pdf/" + paperList.paper_id?.close_name_file} target='_blank' rel='noreferrer'>{paperList.paper_id?.paper_code}</a>
                                                    ) : "-"}
                                                </td>
                                                <td>
                                                    {reviewStatus(paperList.status)}
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="btn" id="dropdown-basic">
                                                            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            {handleReviewStatus(paperList.status, paperList._id)}
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : "ไม่พบรายการที่ต้องตรวจ"}

                </div>
            </section>
        </div>
    )
}

export default Committee