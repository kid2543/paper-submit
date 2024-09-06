import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from "../asset/close.png"

function CommitAuth({ children }) {

  const role = sessionStorage.getItem("role")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const SignOut = () => {
    sessionStorage.clear()
    navigate("/sign-in")
  }

  useEffect(() => {
    if (!role) {
      navigate("/sign-in")
    }
    setLoading(false)
  }, [])

  if (!loading) {
    if (role === "Committee") {
      return (
        <div>
          {children}
        </div>
      )
    } else {
      return (
        <div className='d-flex bg-light' style={{minHeight:"100vh"}}>
          <div className='container p-5 text-center my-5'>
            <div className='mb-3'>
              <div className='mb-3'>
                <img src={CloseIcon} alt='close' className='img-fluid' width={64} height={64} />
              </div>
              <h2>สิทธิ์ผู้ใช้งานไม่ถูกต้อง</h2>
              <small>สำหรับกรรมการเท่านั้น</small>
            </div>
            <div>
              <button type='button' onClick={SignOut} className='btn btn-danger'>Log out</button>
            </div>
            <div className='mt-3 text-muted'>
              หรือกลับไป <a href="/">หน้าหลัก</a>
            </div>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className='container text-center p-5'>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }


}

export default CommitAuth