import React from 'react'
import { useAuthContext } from '../hook/useAuthContext'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogout } from '../hook/useLogout';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import LoadingPage from '../components/LoadingPage';
import axios from 'axios';

// react tosify
import {ToastContainer, toast} from 'react-toastify' 
import { UserDropdown } from '../components/UserDropdown';

function UserProfile() {

  const { data, status, error } = useFetch('/api/user/profile')
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()
  const handleClick = () => {
    logout()
    navigate('/')
  }

  // handle update user profile
  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const json = Object.fromEntries(formData.entries())
    try {
      const res = await axios.patch('/api/user/detail/update', json)
      console.log(res.data)
      toast.success('อัพเดทข้อมูลสำเร็จ')
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) {
    return <Navigate to='/login' />
  }

  if (status === 'idle' || status === 'loading') {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className='container my-4'>
      <ToastContainer />
      <section className='card border-0'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5>Setting</h5>
              <UserDropdown />
          </div>
        </div>
      </section>
      <section>
        {data &&
          <div className='my-5'>
            <div className='card border-0'>
              <div className='card-body'>
                <h5 className='mb-4'>แก้ไขโปรไฟล์</h5>
                <form onSubmit={handleUpdate} className='row gy-4'>
                  <div className='col-12'>
                    <label className='form-label'>ชื่อ - นามสกุล</label>
                    <input defaultValue={data.name} name='name' className='form-control' />
                  </div>
                  <div className='col-12'>
                    <label className='form-label'>อีเมล</label>
                    <input defaultValue={data.email} name='email' className='form-control' />
                  </div>
                  <div>
                    <button className='btn btn-primary text-white' style={{ width: "128px" }}>บันทึก</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
        <div>
          <div className='card border-0'>
            <div className='card-body'>
              <h5 className='mb-4'>เปลี่ยนรหัสผ่าน</h5>
              <form className='row gy-4'>
                <div className='col-12'>
                  <label className='form-label'>รหัสผ่านเดิม</label>
                  <input type='password' className='form-control' />
                </div>
                <div className='col-12'>
                  <label className='form-label'>รหัสผ่านใหม่</label>
                  <input type='password' className='form-control' />
                </div>
                <div className='col-12'>
                  <label className='form-label'>ยืนยันรหัสผ่านใหม่</label>
                  <input type='password' className='form-control' />
                </div>
                <div>
                  <button className='btn btn-primary text-white' style={{ width: "128px" }}>บันทึก</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserProfile