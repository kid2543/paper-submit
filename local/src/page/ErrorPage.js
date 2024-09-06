import React from 'react'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {

  const navigate = useNavigate()

  return (
    <div style={{minHeight: "100vh"}} className='d-flex justify-content-center align-items-center'>
      <div className='text-center'>
        <h1 className='fw-bold'>404</h1>
        <p className='text-muted'>Page not found</p>
        <div>
          <button onClick={() => navigate("/")} type='button' className='btn btn-sm btn-outline-success'>กลับหน้าหลัก</button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage