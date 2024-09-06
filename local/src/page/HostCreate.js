import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import CheckIcon from '../asset/checked.png'
import { useNavigate } from 'react-router-dom';

function HostCreate() {

  const api = process.env.REACT_APP_API_URL

  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")


  const [validate, setValidate] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  const checkPattern = (value) => {
    return /^[0-9a-zA-Z_]{4,12}$/.test(value)
  }

  const createConfr = async (e) => {
    e.preventDefault()
    const input = e.target
    console.log(checkPattern(input.confr_code.value))
    setValidate(true)
    if (input.title.value !== "" && input.sub_title.value !== "" && input.confr_desc !== "" && input.confr_code.value !== "" && checkPattern(input.confr_code.value)) {
      try {
        const create = await axios.post(api + "/create/conferences/" + token, {
          title: input.title.value,
          sub_title: input.sub_title.value,
          confr_desc: input.confr_desc.value,
          confr_code: input.confr_code.value.toUpperCase(),
        })
        sessionStorage.setItem("confr", create.data._id)
        handleShow()
      } catch (error) {
        alert("เกิดข้อผิดพลาด")
        console.log(error)
      }
    } else {
      alert("แบบฟอร์มไม่ถูกต้อง")
    }
  }

  const handleOnFocus = () => setValidate(false)
  const handleShow = () => setModalShow(true)
  const handleClose = () => setModalShow(false)

  useEffect(() => {

    const confr_id = sessionStorage.getItem("confr")
    if (confr_id && confr_id !== "undefined" && confr_id !== undefined && confr_id !== null) {
      alert("ท่านได้ทำการสร้างงานประชุมแล้ว")
      window.location.href("/host")
    }
  }, [])

  return (
    <div className='container py-5'>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Body>
          <div className='p-5 text-center'>
            <div className='mb-3'>
              <img src={CheckIcon} alt='check-icon' className='img-fluid' width={64} height={64} />
            </div>
            <div className='text-success'>
              <h2>สร้างงานประชุมสำเร็จ</h2>
            </div>
            <div className='mt-5'>
              <button type='button' onClick={() => navigate("/host")} className='btn btn-success'>Next</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <h2 className='text-center mb-3'>สร้างงานประชุม</h2>
      <form className={validate ? "mb-3 was-validated" : "mb-3 needs-validation"} noValidate onSubmit={createConfr}>
        <div className='form-floating'>
          <input className='form-control' type='text' placeholder='ชื่องานประชุม' name="title" onFocus={handleOnFocus} required />
          <label className='form-label text-muted' htmlFor="confr-name">ชื่องานประชุม</label>
        </div>
        <div className='form-floating'>
          <input className='form-control' type='text' placeholder='หัวข้อรอง' name="sub_title" required onFocus={handleOnFocus} />
          <label className='form-label text-muted' htmlFor="sub-title">หัวข้อรอง</label>
        </div>
        <div className='form-floating'>
          <textarea className='form-control' placeholder='รายละเอียดงานประชุม' style={{ height: "200px" }} name="confr_desc" required onFocus={handleOnFocus} />
          <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
        </div>
        <div className='form-floating'>
          <input className='form-control' type='text' placeholder='รหัสงานประชุม' name="confr_code" required onFocus={handleOnFocus} pattern='[0-9a-zA-Z]{4,12}' />
          <label className='form-label text-muted' htmlFor="confr-code">รหัสงานประชุม</label>
          <div className='mt-2'>
            <small className='text-muted'>ตัวอักษรและตัวเลขเท่านั้น ตั้งแต่ 4-12 ตัวอักษร</small>
          </div>
        </div>
        <div className='row'>
          <div className='col col-md-4 d-none d-md-block'>
          </div>
          <div className='col col-md-4'>
            <button type='submit' className='btn btn-primary mt-4 w-100'>Create</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HostCreate