import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';

function Home() {

  const navigate = useNavigate();
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md'>
          <Card title="สำหรับผู้จัดงานประชุม" subtitle="เพื่อสร้างบทความงานประชุม" link1="/host" textlink1="สร้างงานประชุม" />
        </div>
        <div className='col-md'>
          <Card title="สำหรับผู้ส่งบทความ" subtitle="เพื่อส่งบทความวิชาการเข้าสู่งานประชุมต่างๆ" link1="/submit" textlink1="ส่งบทความ" />
        </div>
        <div className='col-md'>
          <Card title="สำหรับกรรมการตรวจบทความ" subtitle="เพื่อตรวจบทความวิชาการที่ส่งเข้ามา" link1="/committee" textlink1="ตรวจบทความ" />
        </div>
      </div>
    </div>
  )
}

export default Home