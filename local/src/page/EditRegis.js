import React, { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios';

function EditRegis({ id, api, remark, earlyDate, regularDate, bankName, acName, acType, acNo }) {

  const [values, setValues] = useState({});

  const handleForm = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries())
      let res = await axios.patch(`${api}/update/conferences/${id}/regis`,formJson)
      alert("อัพเดทข้อมูลสำเร็จ: " + res.status)
    } catch (error) {
      console.log(error)
      alert("ไม่สามารถอัพเดทข้อมูลได้: " + error.status)
    }

  }

  return (
    <div className='container my-5'>
      <h4 className='text-center'>รายละเอียดการลงทะเบียน</h4>
      <form onSubmit={handleUpdate}>
        <div className='form-floating'>
          <input onChange={handleForm} name='eb_date' value={dayjs(earlyDate).format("YYYY-MM-DD")} min={dayjs(earlyDate).format("YYYY-MM-DD")} max={dayjs(earlyDate).add(2, 'y').format("YYYY-MM-DD")} type='date' className='form-control' />
          <label className='form-label text-muted'>Early Bird</label>
        </div>
        <div className='form-floating'>
          <input onChange={handleForm} name='r_date' value={dayjs(regularDate).format("YYYY-MM-DD")} min={dayjs(regularDate).format("YYYY-MM-DD")} max={dayjs(regularDate).add(2, 'y').format("YYYY-MM-DD")} type='date' className='form-control' />
          <label className='form-label text-muted'>Regular</label>
        </div>
        <div className='form-floating'>
        <input onChange={handleForm} defaultValue={bankName} name='bank_name' type='text' placeholder='ชื่อธนาคาร' className='form-control' />
        <label className='form-label text-muted'>ชื่อธนาคาร</label>
        </div>
        <div className='form-floating'>
        <input onChange={handleForm} defaultValue={acName} name='ac_name' type='text' placeholder='ชื่อบัญชี' className='form-control' />
        <label className='form-label text-muted'>ชื่อบัญชี</label>
        </div>
        <div className='form-floating'>
          <input onChange={handleForm} defaultValue={acType} name='ac_type' type='text' placeholder='ประเภทบัญชี' className='form-control' />
          <label className='form-label text-muted'>ประเภทบัญชี</label>
        </div>
        <div className='form-floating'>
        <input onChange={handleForm} defaultValue={acNo} name='ac_no' type='text' placeholder='เลขบัญชี' className='form-control' />
          <label className='form-label text-muted'>เลขบัญชี</label>
        </div>
        <div className='form-floating'>
          <textarea style={{height:100}} onChange={handleForm} defaultValue={remark} name='remark' placeholder='รายละเอียดเพิ่มเติม' className='form-control' />
          <label className='form-label text-muted'>รายละเอียดเพิ่มเติม</label>
        </div>
        <button type='submit' className='btn btn-primary my-3'>Save</button>
      </form>
    </div>
  )
}

export default EditRegis