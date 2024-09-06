import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function AuthorResult() {

    const navigate = useNavigate();

    const { id } = useParams()
    const api = process.env.REACT_APP_API_URL

    const [comment, setComment] = useState([]);

    const fethComment = async () => {
        try {
            const res = await axios.get(api + "/get/comment/" + id)
            setComment(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const ComentStatus = (status) => {
        switch (status) {
            case 0:
                return <span className='badge bg-secondary'>รอดำเนินการ</span>
            case 1:
                return <span className='badge bg-success'>ตรวจแล้ว</span>
            default:
                return <span className='badeg bg-secondary'>ไม่พบข้อมูล</span>
        }
    }

    useEffect(() => {
        fethComment()
    }, [])

    return (
        <div className='container'>
            <h4 className='fw-bold mb-3'>ข้อแนะนำของกรรมการ</h4>
            {comment ? (
                <>
                    {comment?.map((cm, index) => (
                        <div key={cm._id}>
                            <h5 className='fw-bold'>กรรมการท่านที่: {index + 1} {ComentStatus(cm.status)}</h5>
                            <div className='my-3'>
                                <button type='button' className='btn btn-primary'>Comment File</button>
                            </div>
                            {/* <ol>
                                <li className='mb-3'>เป็นผลงานที่มีการกำหนดประเด็นที่ต้องการอธิบายหรือวิเคราะห์อย่างชัดเจน<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีเนื้อหาสาระถูกต้องสมบูรณ์ มีแนวคิดและการนำเสนอที่ ชัดเจนเป็นประโยชน์ต่อวงวิชาการ/ วิชาชีพ<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีแหล่งอ้างอิงที่ถูกต้อง การใช้ภาษาที่ชัดเจน เหมาะสม และ ถูกต้องตามหลักภาษา<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีการนำเสนอที่ชัดเจน มีเอกภาพ ไม่สับสน สามารถทำให้ ผู้อ่านติดตามเนื้อหาของผลงานได้โดยสะดวก<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีการวิเคราะห์และเสนอความรู้หรือวิธีการที่ทันสมัยต่อ ความก้าวหน้าทางวิชาการ/ วิชาชีพ และเป็นประโยชน์ต่อวงวิชาการ/ วิชาชีพ สามารถนำไปใช้อ้างอิงหรือนำไปปฏิบัติได้<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีเนื้อหาสาระทางวิชาการ/ วิชาชีพที่ทันสมัย<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่สามารถนำไปใช้เป็นแหล่งอ้างอิงหรือนำไปปฏิบัติได้<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีลักษณะเป็นงานบุกเบิกความรู้ใหม่ในเรื่องใดเรื่องหนึ่ง<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีการกระตุ้นให้เกิดความคิดและค้นคว้าอย่างต่อเนื่อง เป็นที่เชื่อถือและยอมรับในวงวิชาชีพ<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                                <li className='mb-3'>เป็นผลงานที่มีการวิเคราะห์อย่างเป็นระบบ และสรุปประเด็นการ วิเคราะห์จนสามารถให้ข้อเสนอแนะที่เป็นประโยชน์อย่างเหมาะสม<span className='d-block text-muted'>คะแนนที่ได้: {cm.rate?.rate_1}</span></li>
                            </ol> */}
                            <hr />
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <h5>ไม่มี</h5>
                </div>
            )}


            <button type='button' className='btn btn-secondary' onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default AuthorResult