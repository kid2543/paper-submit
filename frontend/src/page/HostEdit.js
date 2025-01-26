import React from 'react'
import Edit from '../components/HostEdit/Edit';

function HostEdit() {

  return (
    <div className='bg-light'>
      <div>
          <div className='py-5'>
            <div className='mb-4'>
              <h4 className='fw-bold'>รายละเอียดทั่วไป</h4>
              <p className='text-muted'>แก้ไขรายละเอียดทั่วไปได้ที่นี่</p>
            </div>
            <Edit />
          </div>
      </div>
    </div>
  )
}

export default HostEdit