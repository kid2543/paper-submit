import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PaperStatus from '../components/PaperStatus'
import PaymentStatus from '../components/PaymentStatus'

function AuthorPaper() {

    const {id} = useParams()
    const api = process.env.REACT_APP_API_URL
    const navigate = useNavigate()

    const [data, setData] = useState({})

    const fethPaper = async () => {
        try {
            const res = await axios.get(api + "/get/paper/" + id)
            setData(res.data)
            console.log("paper_data:",res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const regisDetail = () => {
        localStorage.setItem("paper_id", data._id)
        navigate("/regis/" + data.confr_code?._id)
    }

    useEffect(() => {
        fethPaper()
    },[])

    return (
        <div className='container'>
            <div>
                <h4 className='fw-bold mb-3'>รายละเอียดผู้ส่งบทความ</h4>
                <p>ชื่อ: {data?.owner?.fname} {data?.owner?.lname}</p>
                <p>Email: {data?.owner?.email}</p>
            </div>
            <hr/>
            <div>
                <h4 className='fw-bold mb-3'>ประเภทการลงทะเบียน</h4>
                <p>Regular: <PaymentStatus status={data.payment_status} /></p>
                <p>หลักฐานการชำระเงิน: {data.payment_image ? <a href={api + "/image/" + data.payment_image} target='_blank'>ดูรูป</a> : "ไม่พบข้อมูล"}</p>
                {data.status === 2 || data.status === 3 ? (
                    <div>
                        <button type='button' onClick={regisDetail} className='btn btn-primary'>ลงทะเบียน</button>
                    </div>
                ): null}
            </div>
            <hr/>
            <div>
                <h5>รายละเอียดบทความ</h5>
                <p>Paper Code: {data?.paper_code}</p>
                <p>Title: {data?.title}</p>
                <p>Topic: {data?.cate_code?.name}</p>
                <p>Conferences Code: {data?.confr_code?.confr_code}</p>
                <p>Conferences name: {data?.confr_code?.title}</p>
                <p>Publication Option: {data?.publication?.name}</p>
                <p>File: <button type='button' onClick={() => window.open(api + "/pdf/" + data?.paper_file, "blank")} className='btn btn-primary'>{data?.paper_file}</button></p>
                <p>Status: <PaperStatus status={data?.status} /></p>
                <p>Result: <PaperStatus status={data?.result} /></p>
                <button type='button' onClick={() => navigate("/author/result/" + id)} className='btn btn-secondary'>ดูผลตรวจจากกรรมการ</button>
            </div>
            <hr/>
        </div>
    )
}

export default AuthorPaper