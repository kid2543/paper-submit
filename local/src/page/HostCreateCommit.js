import React from 'react'

function HostCreateCommit() {
  return (
    <div className='container my-4'>
        <h2 className='text-center'>เพิ่มกรรมการ</h2>
        <form>
            <input className='form-control' type='text' placeholder='ชื่อกรรมการ' />
            <input className='form-control' type='text' placeholder='email' />
            <input className='form-control' type='text' placeholder='มหาวิทยาลัย' />
            <button className='btn btn-primary w-100'>เพิ่ม</button>
        </form>
    </div>
  )
}

export default HostCreateCommit