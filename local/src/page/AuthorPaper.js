import React from 'react'
import { useNavigate } from 'react-router-dom'

function AuthorPaper() {

    const navigate = useNavigate();

    return (
        <div className='container-fluid my-4'>
            <div className='card'>
                <div className='card-header'>
                    <h4>รายละเอียดผู้ส่งบทความ</h4>
                </div>
                <div className='card-body d-flex'>
                    <div className='me-4'>
                        <ion-icon name="person-outline"></ion-icon>
                    </div>
                    <div>
                        <span className='card-title'>อาทิตย์ พิทักษ์ช่วงชู</span><br />
                        <span className='card-subtitle mb-2 text-muted'>arthit@gmail.com</span>
                    </div>
                </div>
                <div className='card-header'>
                    <h4>ประเภทการส่งบทความ</h4>
                </div>
                <div className='card-body'>
                    <span className='card-title'>คอมพิวเตอร์</span>
                </div>
                <div className='card-header'>
                    <h4>รายละเอียดบทความ</h4>
                </div>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>Code: รหัสบทความ</li>
                    <li className='list-group-item'>File: File บทความ</li>
                    <li className='list-group-item'>Status: สถานะบทความ</li>
                    <li className='list-group-item'>Title: ชื่อบทความ</li>
                    <li className='list-group-item'>ค่าธรรมเนียมการลงทะเบียน: early bird 2000:regular 2500</li>
                    <li className='list-group-item'>ผลลัพธ์บทความ: สถานะบทความ</li>
                    <li className='list-group-item'><button onClick={() => navigate('/author/result/1')} className='btn btn-secondary'>ดูข้อแนะนำ</button></li>
                </ul>
            </div>
            <form className='form'>
                <label className='mt-3'>ส่งบทความ</label>
                <input className='form-control' type='file' />
                <span className='form-text'>(กรณีผ่านแล้วมีการแก้ไข)</span>
                <div className='mt-3'>
                    <button type='submit' className='btn btn-primary me-2' onClick={() => alert("Submit")}>Submit</button>
                    <button type='button' className='btn btn-secondary' onClick={() => navigate(-1)}>Back</button>
                </div>
            </form>
        </div>
    )
}

export default AuthorPaper