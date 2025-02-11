import React from 'react'
import Edit from '../components/HostEdit/Edit';

function HostEdit() {

  return (
    <div>
      <div>
        <div className='mb-3 card'>
          <div className='card-body'>
            <h4 className='fw-bold card-title'>รายละเอียดทั่วไป</h4>
            <p className='card-text text-muted'>แก้ไขรายละเอียดทั่วไปได้ที่นี่</p>
          </div>
        </div>
        <Edit />
      </div>
    </div>
  )
}

export default HostEdit