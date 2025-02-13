import React, { useState } from 'react'
import { useAuthContext } from '../hook/useAuthContext'
import { Navigate } from 'react-router-dom';
import useFetch from '../hook/useFetch';
import LoadingPage from '../components/LoadingPage';
import axios from 'axios';

// react tosify
import { toast } from 'react-toastify'

function UserProfile() {

  const { data, status, error } = useFetch('/api/user/profile')
  const { user } = useAuthContext()

  // handle update user profile
  const handleUpdate = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const json = Object.fromEntries(formData.entries())
    try {
      await axios.patch('/api/user/detail/update', json)
      toast.success('อัพเดทข้อมูลสำเร็จ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง')
    }
  }

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [conNewPassword, setConNewPassword] = useState('')
  const [errorChangePassword, setErrorChangePassword] = useState('')

  // handle change password
  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (newPassword === oldPassword) {
      toast.error('ไม่สามารถใช้รหัสผ่านเดิมได้')
      setErrorChangePassword('รหัสผ่านใหม่ไม่สามารถซ้ำกับรหัสผ่านเดิมได้')
      return
    }

    if (conNewPassword === newPassword) {
      try {
        await axios.patch('/api/user/password/change', {
          old_password: oldPassword,
          new_password: newPassword
        })
        toast.success('เปลี่ยนรหัสผ่านแล้ว')
        setNewPassword('')
        setOldPassword('')
      } catch (error) {
        console.log(error)
        toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        setErrorChangePassword(error.response.data?.error)
      }
    } else {
      toast.error('รหัสผ่านไม่ตรงกัน')
      setErrorChangePassword('รหัสผ่านไม่ตรงกัน')
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
    <div>
      <div className='container' style={{padding: '128px 0px'}}>
        <section>
          {data &&
            <div className='my-3'>
              <div className='card text-bg-light'>
                <div className='card-body'>
                  <h4 className='fw-bold mb-3'>แก้ไขโปรไฟล์</h4>
                  <form onSubmit={handleUpdate} className='row g-3'>
                    <div className='col-12 col-md-6'>
                      <label className='form-label'>ชื่อ - นามสกุล</label>
                      <input defaultValue={data.name} name='name' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6'>
                      <label className='form-label'>ชื่อผู้ใช้งาน</label>
                      <input defaultValue={data.username} name='username' readOnly className='form-control-plaintext' />
                    </div>
                    <div className='col-12 col-md-6'>
                      <label className='form-label'>อีเมล</label>
                      <input defaultValue={data.email} name='email' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>เบอร์โทร</label>
                      <input maxLength={10} pattern='[0-9]{10}' defaultValue={data.phone} name='phone' className='form-control' />
                      <div className="form-text">
                        ตัวเลข 10 หลัก
                      </div>
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>มหาวิทยาลัย</label>
                      <input defaultValue={data.university} name='university' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>คณะ</label>
                      <input defaultValue={data.department} name='department' className='form-control' />
                    </div>
                    <div>
                      <h6 className="fw-bold">ข้อมูลที่อยู่</h6>
                      <hr />
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>ที่อยู่</label>
                      <textarea defaultValue={data.address} name='address' className='form-control' rows={3} />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>ตำบล</label>
                      <input defaultValue={data.sub_district} name='sub_district' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>อำเภอ</label>
                      <input defaultValue={data.district} name='district' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>จังหวัด</label>
                      <input defaultValue={data.province} name='province' className='form-control' />
                    </div>
                    <div className='col-12 col-md-6 '>
                      <label className='form-label'>รหัสไปรษณี</label>
                      <input maxLength={5} pattern='[0-9]{5}' defaultValue={data.zip_code} name='zip_code' className='form-control' />
                      <div className="form-text">
                        จำกัด 5 ตัวเลข
                      </div>
                    </div>
                    <div className="text-end">
                      <button className='btn btn-primary text-white'>
                        <i className="me-2 bi bi-floppy"></i>
                        บันทึก
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          }
          <div>
            <div className='card text-bg-light'>
              <div className='card-body'>
                <h4 className='card-tile fw-bold mb-3'>เปลี่ยนรหัสผ่าน</h4>
                <form onSubmit={handleChangePassword} className='row g-3'>
                  <div className='col-12'>
                    <label className='form-label'>รหัสผ่านเดิม</label>
                    <input
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      type='password'
                      className='form-control'
                      required
                      onFocus={() => setErrorChangePassword('')}
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label'>รหัสผ่านใหม่</label>
                    <input
                      type='password'
                      className='form-control'
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      onFocus={() => setErrorChangePassword('')}
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label'>ยืนยันรหัสผ่านใหม่</label>
                    <input
                      type='password'
                      className='form-control'
                      required
                      onFocus={() => setErrorChangePassword('')}
                      value={conNewPassword}
                      onChange={e => setConNewPassword(e.target.value)}
                    />
                  </div>
                  {errorChangePassword &&
                    <div className="text-danger">
                      {errorChangePassword}
                    </div>
                  }
                  <div className="text-end">
                    <button type='submit' className='btn btn-primary text-white'>
                      <i className="me-2 bi bi-floppy"></i>
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserProfile