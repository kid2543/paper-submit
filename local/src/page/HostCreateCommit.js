import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function HostCreateCommit({handleClose, setData, setSData, data, sData}) {

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault()
    const userInput = e.target
    try {
      const res = await axios.post(api + "/signup/committee", {
        fname: userInput.fname.value,
        lname: userInput.lname.value,
        username: userInput.username.value,
        password: "committee1234",
        role: "committee",
        university: userInput.university.value,
        email: userInput.email.value
      })
      setData([...data, res.data])
      setSData([...sData, res.data])
      alert("เพิ่มกรรมการสำเร็จ")
      handleClose()
    } catch (error) {
      if(error.response.status === 400) {
        alert(error.response.data)
      } else {
        alert("เกิดข้อผิดพลาด")
        console.log(error)
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div className='row gy-3'>
          <div className='col-md-6'>
            <label className='form-label text-muted'>ชื่อผู้ใช้</label>
            <input required className='form-control  ' name='username' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>E-mail</label>
            <input required name='email' className='form-control  ' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>ชื่อ</label>
            <input required name='fname' className='form-control  ' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>นามสกุล</label>
            <input required name='lname' className='form-control  ' type='text' />
          </div>
          <div className='col-12'>
            <label className='form-label text-muted'>มหาวิทยาลัย</label>
            <input required name='university' className='form-control  ' type='text' />
          </div>
        </div>
        <hr />
        <div className='text-end mt-3'>
          <button type='submit' className='btn btn-primary me-2'>Create</button>
          <button type='button' className='btn btn-outline-secondary' onClick={() => navigate("/host/committees")}>Dismiss</button>
        </div>
      </form>
    </div>
  )
}

export default HostCreateCommit

