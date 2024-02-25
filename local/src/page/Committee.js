import React from 'react'
import { useNavigate } from 'react-router-dom'

function Committee() {

    const navigate = useNavigate();

    return (
        <div className='container-fluid my-4'>
            <h2>รายการบทความ</h2>
            <table className='table'>
                <thead className='table-dark'>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อบทความ</th>
                        <th>ประเภทบทความ</th>
                        <th>วันที่ แก้ไข/ส่ง ล่าสุด</th>
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ชื่อบทความ...</td>
                        <td>วิทยาศาสตร์</td>
                        <td>12/12/2023</td>
                        <td>
                            <button className='btn btn-outline-primary' onClick={() => navigate('/committee/review/1')}>ตรวจ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Committee