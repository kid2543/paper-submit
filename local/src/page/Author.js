import React from 'react'
import { useNavigate } from 'react-router-dom'

function Author() {

  const navigate = useNavigate();

  return (
    <div className='container-fluid my-4'>
      <h2>รายการบทความที่ส่งเพื่อตีพิมพ์</h2>
      <table className='table'>
        <thead>
        <tr>
            <th scope='col'>ลำดับ</th>
            <th scope='col'>ชื่อบทความ</th>
            <th scope='col'>ประเภทบทความ</th>
            <th scope='col'>สถานะล่าสุด</th>
            <th scope='col'>งานประชุม</th>
            <th scope='col'>วันที่ส่งบทความ</th>
            <th scope='col'>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope='row'>1</td>
            <td scope='row'>ชื่อบทความ</td>
            <td scope='row'>วิทยาศาสตร์</td>
            <td scope='row'> รอดำเนินการ</td>
            <td scope='row'>งานประชุมประจำปี 2023</td>
            <td scope='row'>12/12/2023</td>
            <td scope='row'>
              <button className='btn btn-primary me-2' onClick={() => navigate('/author/edit/1')}>แก้ไข</button>
              <button className='btn btn-secondary' onClick={() => navigate('/author/paper/1')}>ผลลัพธ์</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className='btn btn-primary' onClick={() => navigate('/submit')}>New Submit</button>
    </div>
  )
}

export default Author