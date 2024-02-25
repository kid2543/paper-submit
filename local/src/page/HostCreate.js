import React from 'react'

function HostCreate() {
  return (
    <div className='container my-4'>
        <h2 className='text-center'>สร้างงานประชุม</h2>
        <form className='mb-3'>
          <div className='form-floating'>
            <input className='form-control' type='text' placeholder='ชื่องานประชุม' id="confr-name" />
            <label className='form-label text-muted' for="confr-name">ชื่องานประชุม</label>
          </div>
          <div className='form-floating'>
            <input className='form-control' type='text' placeholder='หัวข้อรอง' id="sub-title" />
            <label className='form-label text-muted' for="sub-title">หัวข้อรอง</label>
          </div>
          <div className='form-floating'>
            <textarea className='form-control' placeholder='รายละเอียดงานประชุม' style={{height:"200px"}} />
            <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
          </div>
          <div className='form-floating'>
            <input className='form-control' type='text' placeholder='รหัสงานประชุม' id="confr-code" />
            <label className='form-label text-muted' for="confr-code">รหัสงานประชุม</label>
          </div>
            <button className='btn btn-primary w-100'>สร้าง</button>
        </form>
    </div>
  )
}

export default HostCreate