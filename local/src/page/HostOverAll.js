import React from 'react'
import { useNavigate } from 'react-router-dom'

function HostOverAll() {

  const navigate = useNavigate()

  return (
    <div className='container my-4'>
      <h2 className='text-center'>บทความที่ผ่านการตรวจจากกรรมการแล้ว</h2>
      <h4 className='mt-4'>ชื่อหัวข้อที่เปิดรับบทความ</h4>
      <div className='card'>
        <div className='card-header'>
          รหัสบทความ
        </div>
        <div className='card-body'>
          <p>Title: ชื่อบทความ</p>
          <p>Publication Option: ชื่อวารสารที่เลือก</p>
          <p>ผลลัพธ์จากกรรมการ:</p>
          <p>รายชื่อกรรมการที่ตรวจ</p>
          <button className='btn btn-primary' onClick={() => navigate('/host/review/1')}>ดูผลลัพธ์</button>
          <form>
            <label className='form-label mb-0 mt-2'>จดหมายเชิญลงทะเบียน: </label>
            <input className='form-control' type='file' />
            <button className='btn btn-outline-primary'>ส่งจดหมายเชิญ</button>
          </form>
          <form>
            <label className='form-label mt-2 mb-0'>ใบรับรองการส่งบทความ: </label>
            <input className='form-control' type='file' />
            <button type='submit' className='btn btn-outline-primary'>ส่งใบรับรอง</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HostOverAll