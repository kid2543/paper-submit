import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function AuthorResult() {

    const navigate = useNavigate();

    const { id } = useParams()

    const [comment, setComment] = useState([]);

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


        const fethComment = async () => {
            try {
                const res = await axios.get(api + "/get/comment/" + id)
                setComment(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethComment()
    }, [id])

    return (
        <div className='container'>
            <h4 className='fw-bold mb-3'>ข้อแนะนำของกรรมการ</h4>
            {comment ? (
                <>
                    {comment?.map((cm, index) => (
                        <div className='card mb-3' key={cm._id}>
                            <div className='card-body'>
                                <h5 className='fw-bold'>กรรมการท่านที่: {index + 1} {ComentStatus(cm.status)}</h5>
                                <p>ข้อแนะนำ:</p>
                                {cm.suggestion}
                                {cm.suggestion_file ? (
                                    <div className='my-3'>
                                        <a href={api + "/pdf/" + cm.suggestion_file} target='_blank' rel='noreferrer' className='btn btn-outline-primary btn-sm'>Comment File</a>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <h5>ไม่พบรายชื่อกรรมการตรวจสอบอีกครั้งในภายหลัง</h5>
                </div>
            )}

            <div>
                <button type='button' className='btn btn-secondary btn-sm' onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    )
}

export default AuthorResult