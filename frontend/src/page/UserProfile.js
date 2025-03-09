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

  const [updateLoading, setUpdateLoading] = useState(false)
  // handle update user profile
  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    const formData = new FormData(e.target)
    const json = Object.fromEntries(formData.entries())
    try {
      await axios.patch('/api/user/detail/update', json)
      toast.success('อัพเดทข้อมูลสำเร็จ')
      setIsChange(false)
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง')
    } finally {
      setUpdateLoading(false)
    }
  }

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [conNewPassword, setConNewPassword] = useState('')
  const [errorChangePassword, setErrorChangePassword] = useState('')
  const [isChange, setIsChange] = useState(false)

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
        setConNewPassword('')
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
    <div className="bg-light">
      <div className='container' style={{ padding: '128px 0px' }}>
        <section>
          {data &&
            <div className='my-3'>
              <div className='card'>
                <div className='card-body'>
                  <div>
                    <h4>แก้ไขโปรไฟล์</h4>
                    <hr />
                  </div>
                  <form onSubmit={handleUpdate}>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>ชื่อ - นามสกุล</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.name}
                          name='name'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>ชื่อผู้ใช้งาน</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.username}
                          name='username'
                          readOnly
                          className='form-control-plaintext'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-form-label col-sm-2'>อีเมล</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.email}
                          name='email'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>เบอร์โทร</label>
                      <div className="col-sm-10">
                        <input
                          maxLength={10}
                          pattern='[0-9]{10}'
                          defaultValue={data.phone}
                          name='phone'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                        <div className="form-text">
                          ตัวเลข 10 หลัก
                        </div>
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>มหาวิทยาลัย</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.university}
                          name='university'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>คณะ</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.department}
                          name='department'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='mt-5'>
                      <h4>ข้อมูลที่อยู่</h4>
                      <hr />
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>ที่อยู่</label>
                      <div className="col-sm-10">
                        <textarea
                          defaultValue={data.address}
                          name='address'
                          className='form-control'
                          rows={3}
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>ตำบล</label>
                      <div className='col-sm-10'>
                        <input
                          defaultValue={data.sub_district}
                          name='sub_district'
                          onChange={() => setIsChange(true)}
                          className='form-control'
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>อำเภอ</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.district}
                          name='district'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>จังหวัด</label>
                      <div className="col-sm-10">
                        <input
                          defaultValue={data.province}
                          name='province'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                      </div>
                    </div>
                    <div className='row mb-3'>
                      <label className='col-sm-2 col-form-label'>รหัสไปรษณี</label>
                      <div className="col-sm-10">
                        <input
                          maxLength={5}
                          pattern='[0-9]{5}'
                          defaultValue={data.zip_code}
                          name='zip_code'
                          className='form-control'
                          onChange={() => setIsChange(true)}
                        />
                        <div className="form-text">
                          จำกัด 5 ตัวเลข
                        </div>
                      </div>
                    </div>
                    {updateLoading ? (
                      <div className='text-end'>
                        <button className="btn btn-primary" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Loading...
                        </button>
                      </div>
                    ) : (
                      <div className="text-end">
                        <button disabled={!isChange} className='btn btn-primary text-white'>
                          <i className="me-2 bi bi-floppy"></i>
                          บันทึก
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          }
          <div>
            <div className='card'>
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
                    <div className='form-text'>
                      รหัสผ่านประกอบด้วยตัวอักษรและตัวเลขอย่างน้อย 8 ตัวอักษร และจะต้องมี พิมพ์ใหญ่ พิมพ์เล็ก และ อักษรพิเศษ อย่างละ 1 ตัว
                    </div>
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