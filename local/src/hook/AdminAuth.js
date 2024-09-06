import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from "../asset/close.png"

function AdminAuth({ children }) {

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
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (role === "Admin") {
    return (
      <main>
        {children}
      </main>
    )
  } else {
    return (
      <div className='d-flex bg-light' style={{ minHeight: "100vh" }}>
        <div className='container p-5 text-center my-5'>
          <div className='mb-3'>
            <div className='mb-3'>
              <img src={CloseIcon} alt='close' className='img-fluid' width={64} height={64} />
            </div>
            <h2>สิทธิ์ผู้ใช้งานไม่ถูกต้อง</h2>
            <small>สำหรับ: <b>Admin</b> เท่านั้น</small>
          </div>
          <div>
            <button type='button' onClick={SignOut} className='btn btn-danger'>Log out</button>
          </div>
          <div className='mt-3 text-muted'>
            หรือกลับไป <a href='/'>หน้าหลัก</a>
          </div>
        </div>
      </div>
    )
  }

}

export default AdminAuth