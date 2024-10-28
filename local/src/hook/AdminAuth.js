import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from "../asset/close.png"
import LoadingPage from '../components/LoadingPage'

function AdminAuth({ children }) {

  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const SignOut = () => {
    sessionStorage.clear()
    navigate("/sign-in")
  }

  useEffect(() => {
    const Role = sessionStorage.getItem("role")
    setRole(Role)
    if (!Role) {
      window.location.href = "/sign-in"
    }
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <>
      {role === "admin" ? (
        <main>
          {children}
        </main>
      ) : (
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
      )}
    </>
  )

}

export default AdminAuth