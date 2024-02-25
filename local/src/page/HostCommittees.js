import React from 'react'
import { useNavigate } from 'react-router-dom'

function HostCommittees() {

  const navigate = useNavigate()

  return (
    <div className='container my-4'>
      <h2 className='text-center'>รายชื่อกรรมการทั้งหมด</h2>
      <button className='btn btn-primary' onClick={() => navigate('/host/committees/create')}>เพิ่มกรรมการ</button>
      <ul class="list-group mt-5">
        <li class="list-group-item d-flex justify-content-between align-items-start"><span>An item</span><span>An item</span></li>
        <li class="list-group-item d-flex justify-content-between align-items-start"><span>A second item</span><span>A second item</span></li>
      </ul>
    </div>
  )
}

export default HostCommittees