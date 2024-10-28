import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const api = process.env.REACT_APP_API_URL

function HostCreate() {

  const navigate = useNavigate()
  const token = sessionStorage.getItem("token")
  const notify = () => {
    toast.success("สร้างงานประชุมสำเร็จ", {
      position: "bottom-right"
    })
  }

  const [validate, setValidate] = useState(false)
  const [previewText, setPreviewText] = useState({
    title: "ชื่อหัวข้องานประชุม",
    sub_title: "หัวข้อรองงานประชุม",
    confr_desc: "รายละเอียดงานประชุม",
    confr_code: "โค้ดงานประชุม ใช้สำหรับค้นหางานประชุม",
  })
  const [invConfrCode, setInvConfrCode] = useState(false)


  const checkPattern = (value) => {
    return /^[0-9a-zA-Z_]{4,12}$/.test(value)
  }

  const handleChangePreview = (e) => {
    setInvConfrCode(false)
    setPreviewText({ ...previewText, [e.target.name]: e.target.value })
  }

  const createConfr = async (e) => {
    e.preventDefault()
    const input = e.target
    setValidate(true)
    if (input.title.value !== "" && input.sub_title.value !== "" && input.confr_desc !== "" && input.confr_code.value !== "" && checkPattern(input.confr_code.value) && input.confr_end_date.value !== "") {
      try {
        await axios.post(api + "/create/conferences", {
          title: input.title.value,
          sub_title: input.sub_title.value,
          confr_desc: input.confr_desc.value,
          confr_code: input.confr_code.value.toUpperCase(),
          owner: token,
          confr_end_date: input.confr_end_date.value,
        })
        notify()
        setTimeout(() => {
          navigate("/host")
        }, 1000)
      } catch (error) {
        if (error.response.data?.code === 11000) {
          alert("มีงานประชุมวิชาการที่ใช้รหัสนี้แล้ว")
          const input = document.getElementById("confr_code")
          input.focus()
          setInvConfrCode(true)
          console.log(error)
        } else {
          alert("เกิดข้อผิดพลาด")
          console.log(error)
        }
      }
    } else {
      alert("แบบฟอร์มไม่ถูกต้อง")
    }
  }

  const handleOnFocus = () => setValidate(false)


  return (
    <div className='container py-5'>
      <ToastContainer />
      <h2 className='text-center mb-5'>สร้างงานประชุม</h2>
      <div className='row'>
        <form className={validate ? "col-md-6 mb-3 was-validated" : "mb-3 col-md-6 needs-validation"} noValidate onSubmit={createConfr}>
          <div className='row gy-3'>
            <div>
              <label className='form-label text-muted' htmlFor="confr-name">ชื่องานประชุม</label>
              <textarea className='form-control form-control-lg' type='text' name="title" onFocus={handleOnFocus} required onChange={handleChangePreview} />
            </div>
            <div>
              <label className='form-label text-muted' htmlFor="sub-title">หัวข้อรอง</label>
              <textarea className='form-control form-control-lg' type='text' name="sub_title" required onFocus={handleOnFocus} onChange={handleChangePreview} />
            </div>
            <div>
              <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
              <textarea className='form-control form-control-lg' style={{ height: "200px" }} name="confr_desc" required onFocus={handleOnFocus} onChange={handleChangePreview} />
            </div>
            <div>
              <label className='form-label text-muted' htmlFor="confr-code">รหัสงานประชุม</label>
              <input className='form-control form-control-lg' type='text' name="confr_code" id='confr_code' required onFocus={handleOnFocus} onChange={handleChangePreview} pattern='[0-9a-zA-Z]{4,12}' />
              <div className='mt-2'>
                {invConfrCode ? (
                  <div className="text-danger">
                    <small>มีงานประชุมอื่นใช้รหัสนี้แล้ว</small>
                  </div>
                ) : (
                  <div>
                    <small className='text-muted'>ตัวอักษรและตัวเลขเท่านั้น ตั้งแต่ 4-12 ตัวอักษร</small>
                  </div>
                )}

              </div>

            </div>
            <div>
              <label className='form-label text-muted' htmlFor="confr-code">วันสิ้นสุดงานประชุม</label>
              <input className='form-control form-control-lg' type='date' name="confr_end_date" required onFocus={handleOnFocus} />
            </div>
            <div>
              <button type='submit' className='btn btn-primary'>Create Conference</button>
            </div>
          </div>

        </form>
        <div className='col-md-6 mb-3'>
          <div className='card p-5 h-100'>
            <div className='mb-5'>
              <div>
                <h4>{previewText?.title}</h4>
                <p>"{previewText?.confr_code.toUpperCase()}"</p>
                <p className='text-muted'>{previewText?.sub_title}</p>
              </div>
            </div>
            <div>
              <h4>ABOUT THE CONFERENCE</h4>
              <div>
                {previewText?.confr_desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostCreate