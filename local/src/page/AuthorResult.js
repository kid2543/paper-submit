import React from 'react'
import { useNavigate } from 'react-router-dom'

function AuthorResult() {

    const navigate = useNavigate();

    return (
        <div className='container-fluid'>
            <h2>ข้อแนะนำ และผลการตรวจบทความ</h2>
            <div className='card'>
                <div className='card-body'>
                    <h4>รายละเอียดบทความ</h4>
                </div>
            </div>
            <p>Paper Code: รหัสบทความ</p>
            <p>ชื่อบทความ: ชื่อบทความ</p>
            <p>ผลลัพธ์บทความ: สถานะบทความ</p>
            <h4>ข้อแนะนำของกรรมการ</h4>
            <p>รายละเอียด comment ของกรรมการแต่ละคน</p>
            <p>File Comment</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default AuthorResult