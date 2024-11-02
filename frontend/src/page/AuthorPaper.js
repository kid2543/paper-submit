import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PaperStatus, { PaperResult } from '../components/PaperStatus'
import PaymentStatus from '../components/PaymentStatus'

const api = process.env.REACT_APP_API_URL

function AuthorPaper() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({})



    const regisDetail = () => {
        localStorage.setItem("paper_id", data._id)
        navigate("/regis/" + data.confr_code?._id)
    }

    useEffect(() => {

        const fethPaper = async () => {
            try {
                const res = await axios.get(api + "/get/paper/" + id)
                setData(res.data)
                console.log("paper_data:", res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethPaper()
    }, [id])

    return (
        <div className='container my-5'>
            <div>
                <h4 className='fw-bold mb-3'>รายละเอียดผู้ส่งบทความ</h4>
                <p>ชื่อ: {data?.owner?.fname} {data?.owner?.lname}</p>
                <p>Email: {data?.owner?.email}</p>
            </div>
            <hr />
            <div>
                <h4 className='fw-bold mb-3'>ประเภทการลงทะเบียน</h4>
                <p>Regular: <PaymentStatus status={data.payment_status} /></p>
                <p>หลักฐานการชำระเงิน: {data.payment_image ? <a href={api + "/image/" + data.payment_image} target='_blank' rel='noreferrer'>ดูรูป</a> : "ไม่พบข้อมูล"}</p>
                {data.status === 2 || data.status === 3 ? (
                    <div>
                        <button type='button' onClick={regisDetail} className='btn btn-primary btn-sm'>ลงทะเบียน</button>
                    </div>
                ) : null}
            </div>
            <hr />
            <div className='card'>
                <div className='card-body'>
                    <h6 className='card-title mb-3 fw-bold'>รายละเอียดบทความ</h6>
                    <p>Paper Code: {data?.paper_code}</p>
                    <p>Title: {data?.title}</p>
                    <p>Topic: {data?.cate_code?.name}</p>
                    <p>Conferences Code: {data?.confr_code?.confr_code}</p>
                    <p>Conferences name: {data?.confr_code?.title}</p>
                    <p>Publication Option: {data?.publication?.en_name}</p>
                    <p>File: <button type='button' onClick={() => window.open(api + "/pdf/" + data?.paper_file, "blank")} className='btn btn-outline-primary btn-sm'>{data?.paper_file}</button></p>
                    <p>Status: <PaperStatus status={data?.status} /></p>
                    <p>Result: <PaperResult status={data?.result} /></p>
                    <button type='button' onClick={() => navigate("/author/result/" + id)} className='btn btn-secondary btn-sm'>ดูผลตรวจจากกรรมการ</button>
                </div>
            </div>
        </div>
    )
}

export default AuthorPaper