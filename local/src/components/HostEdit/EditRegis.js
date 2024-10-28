import React from 'react'
import dayjs from 'dayjs'

function EditRegis({ handleChange, data }) {
  return (
    <div className='mb-5'>
      <div className='mb-3'>
        <h4 className='fw-bold'>รายละเอียดการลงทะเบียน</h4>
      </div>
      <div>
        <div className='row g-3'>
          <div className='col-md-6'>
            <div className='mb-5'>
              <p className='text-success'>Early Bird Registration</p>
                <div className='mb-3'>
                  <label className='form-label text-muted'>Start</label>
                  <input defaultValue={dayjs(data?.regis_eb_start_date).format("YYYY-MM-DD")} onChange={e => handleChange(e)} name='regis_eb_start_date' type='date' className='form-control' />
                </div>
                <div className='mb-3'>
                  <label className='form-label text-muted'>End</label>
                  <input defaultValue={dayjs(data?.regis_eb_end_date).format("YYYY-MM-DD")} onChange={e => handleChange(e)} name='regis_eb_end_date' type='date' className='form-control' />
                </div>
            </div>

          </div>
          <div className='col-md-6'>

            <div className='mb-5'>
              <p className='text-success'>Regular Registration</p>
                <div className='mb-3'>
                  <label className='form-label text-muted'>Start</label>
                  <input defaultValue={dayjs(data?.regis_rl_start_date).format("YYYY-MM-DD")} onChange={e => handleChange(e)} name='regis_rl_start_date' type='date' className='form-control' />
                </div>
                <div className='mb-3'>
                  <label className='form-label text-muted'>End</label>
                  <input defaultValue={dayjs(data?.regis_rl_end_date).format("YYYY-MM-DD")} onChange={e => handleChange(e)} name='regis_rl_end_date' type='date' className='form-control' />
                </div>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <p className='text-success'>รายละเอียดธนาคาร</p>
          <div className='row'>
            <div className='col-12 col-md-6 mb-3'>
              <label className='form-label text-muted'>ชื่อธนาคาร</label>
              <input name='bank_name' defaultValue={data?.bank_name} className='form-control' onChange={e => handleChange(e)} />
            </div>
            <div className='col-12 col-md-6 mb-3'>
              <label className='form-label text-muted'>ชื่อบัญชี</label>
              <input name='acc_name' defaultValue={data?.acc_name} onChange={e => handleChange(e)} className='form-control' />
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 mb-3'>
              <label className='form-label text-muted'>ประเภทธนาคาร</label>
              <input name='bank_type' defaultValue={data?.bank_type} onChange={e => handleChange(e)} className='form-control' />
            </div>

            <div className='col-12 col-md-6 mb-3'>
              <label className='form-label text-muted'>เลขบัญชีธนาคาร</label>
              <input name='acc_no' defaultValue={data?.acc_no} onChange={e => handleChange(e)} pattern='\d{10,10}' className='form-control' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRegis