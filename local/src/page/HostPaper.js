import React from 'react'
import { useNavigate } from 'react-router-dom'

function HostPaper() {

  const navigate = useNavigate();

  return (
    <div className='container my-4'>
        <h2>มอบหมายการตรวจบทความ</h2>
        <div className='card'>
            <div className='card-header'>
              <h4>ชื่อหัวข้องานประชุม</h4>
            </div>
            <div className='card-body'>
              <h6 className='card-title'>รหัสบทความ</h6>
              <p className='card-subtitle mb-2 text-body-secondary'>ชื่อบทความ</p>
              <button className='btn btn-primary me-2'>PDF</button>
              <button onClick={() => navigate('/host/assign/1')} className='btn btn-outline-success'>Assign</button>
            </div>
        </div>
    </div>
  )
}

export default HostPaper