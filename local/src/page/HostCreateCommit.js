import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'

const api = process.env.REACT_APP_API_URL

function HostCreateCommit({handleClose}) {

  const { id } = useParams()
  const navigate = useNavigate();
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const handleCreate = async (e) => {
    e.preventDefault()
    const userInput = e.target
    try {
      await axios.post(api + "/signup", {
        fname: userInput.fname.value,
        lname: userInput.lname.value,
        username: userInput.username.value,
        password: "committee1234",
        add_by: id,
        role: "Committee",
        university: userInput.university.value,
        email: userInput.email.value
      })
      handleClose()
      handleShow()
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
      <ConfirmModal show={show} noReturn={true} setShow={setShow} />
      <form onSubmit={handleCreate}>
        <div className='row gy-3'>
          <div className='col-md-6'>
            <label className='form-label text-muted'>ชื่อผู้ใช้</label>
            <input required className='form-control form-control-lg' name='username' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>E-mail</label>
            <input required name='email' className='form-control form-control-lg' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>ชื่อ</label>
            <input required name='fname' className='form-control form-control-lg' type='text' />
          </div>
          <div className='col-md-6'>
            <label className='form-label text-muted'>นามสกุล</label>
            <input required name='lname' className='form-control form-control-lg' type='text' />
          </div>
          <div className='col-12'>
            <label className='form-label text-muted'>มหาวิทยาลัย</label>
            <input required name='university' className='form-control form-control-lg' type='text' />
          </div>
        </div>
        <div className='text-end mt-3'>
          <button type='submit' className='btn btn-lg btn-primary me-2'>Create</button>
          <button type='button' className='btn btn-outline-secondary btn-lg' onClick={() => navigate("/host/committees")}>Dismiss</button>
        </div>
      </form>
    </div>
  )
}

export default HostCreateCommit

