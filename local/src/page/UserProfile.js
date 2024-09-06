import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function UserProfile() {

  const token = sessionStorage.getItem("token")
  const navigate = useNavigate()
  const role = sessionStorage.getItem("role")

  const [user, setUser] = useState({})
  const [editStatus, setEditStatus] = useState(false)
  const [userPrefix, setUserPrefix] = useState("")
  const [userStatus, setUserStatus] = useState("")
  const [userGender, setUserGender] = useState("")

  const fethUser = async () => {
    try {
      const res = await axios.get(api + "/get/user/byid/" + token)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()
    if (window.confirm("ยืนยันข้อมูลหรือไม่?")) {
      try {
        const formData = new FormData(e.target)
        formData.append("prefix", userPrefix)
        formData.append("gender", userGender)
        formData.append("status", userStatus)
        const value = Object.fromEntries(formData.entries())
        const res = await axios.patch(api + "/update/user/" + token, value)
        console.log(res)
        alert(res.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    } else {
      return false
    }
  }

  const handleEdit = () => {
    setEditStatus(true)
    setUserPrefix(user?.prefix)
    setUserGender(user?.gender)
    setUserStatus(user?.status)
  }

  const handleRoleDash = (role) => {
    switch (role) {
      case "Admin" : return <button className='btn btn-primary' type='button' onClick={() => navigate("/admin")}>Dashboard</button>
      case "Host" : return <button className='btn btn-primary' type='button' onClick={() => navigate("/host")}>Dashboard</button>
      case "Author" : return <button className='btn btn-primary' type='button' onClick={() => navigate("/author")}>Dashboard</button>
      case "Committee" : return <button className='btn btn-primary' type='button' onClick={() => navigate("/committee")}>Dashboard</button>
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/sign-in")
    } else {
      fethUser()
    }
  }, [])


  if (editStatus) {
    return (
      <div className='container my-5'>
        <div>
          <h4 className='fw-bold'>Edit User Profile</h4>
        </div>
        <hr />
        <form onSubmit={handleForm}>
          <div className='row gy-3 mb-5'>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>คำนำหน้าชื่อ</label>
              <select className="form-select" aria-label="คำนำหน้า" onChange={e => setUserPrefix(e.target.value)}>
                <option value="">--</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นาวงสาว">นางสาว</option>
              </select>
              <small>ข้อมูลปัจจุบัน: <span className='fw-bold'>{user?.prefix}</span></small>
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>เพศ</label>
              <select className="form-select" aria-label="เพศ" onChange={e => setUserGender(e.target.value)}>
                <option value="">--</option>
                <option value="ชาย">ชาย</option>
                <option value="หญิง">หญิง</option>
                <option value="อื่นๆ / ไม่ระบุ">อื่นๆ / ไม่ระบุ</option>
              </select>
              <small>ข้อมูลปัจจุบัน: <span className='fw-bold'>{user?.gender}</span></small>
            </div>
            <div className='col-12'>
              <label className='text-muted form-label'>สถานะ</label>
              <select className="form-select" aria-label="สถานะ" onChange={e => setUserStatus(e.target.value)}>
                <option value="">--</option>
                <option value="โสด">โสด</option>
                <option value="สมรส">สมรส</option>
                <option value="หย่าร้าง">หย่าร้าง</option>
              </select>
              <small>ข้อมูลปัจจุบัน: <span className='fw-bold'>{user?.status}</span></small>
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>ชื่อ</label>
              <input required name='fname' className='form-control' defaultValue={user?.fname} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>นามสกุล</label>
              <input required name='lname' className='form-control' defaultValue={user?.lname} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>Email</label>
              <input required name='email' className='form-control' defaultValue={user?.email} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>Phone</label>
              <input required name='phone' className='form-control' defaultValue={user?.phone} pattern='[0-9]{10}' />
            </div>
          </div>
          <p className='fw-bold mb-0'>ที่อยู่</p>
          <hr />
          <div className='row gy-3 mb-3'>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>สังกัด</label>
              <input required name='department' className='form-control' defaultValue={user?.department} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>มหาวิทยาลัย</label>
              <input required name='university' className='form-control' defaultValue={user?.university} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>ที่อยู่</label>
              <input required name='address' className='form-control' defaultValue={user?.address} />
            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>จังหวัด</label>
              <input required name='province' className='form-control' defaultValue={user?.province} />

            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>อำเภอ</label>
              <input required name='district' className='form-control' defaultValue={user?.district} />

            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>ตำบท</label>
              <input required name='sub_district' className='form-control' defaultValue={user?.sub_district} />

            </div>
            <div className='col-12 col-md-6'>
              <label className='text-muted form-label'>รหัสไปรษณี</label>
              <input required name='zip_code' className='form-control' defaultValue={user?.zip_code} />
            </div>
          </div>
          <div>
            <button className='btn btn-success me-2' type='submit'>Save</button>
            <button className='btn btn-outline-secondary' type='button' onClick={() => setEditStatus(false)}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className='container my-5'>
      <div className='d-flex align-items-center'>
        <h4 className='fw-bold mb-0 me-2'>User Profile</h4>
        <div>
          <button className='btn btn-primary' type='button' onClick={handleEdit}><ion-icon name="color-wand"></ion-icon></button>
        </div>
      </div>
      <hr />
      <div className='row gy-3'>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>หน้าที่: <span className='fw-bold'>{user?.role}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>คำนำหน้าชื่อ: <span className='fw-bold'>{user?.prefix}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>สถานะ: <span className='fw-bold'>{user?.status}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>เพศ: <span className='fw-bold'>{user?.gender}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>ชื่อ: <span className='fw-bold'>{user?.fname}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>นามสกุล: <span className='fw-bold'>{user?.lname}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>Email: <span className='fw-bold'>{user?.email}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>Phone: <span className='fw-bold'>{user?.phone}</span></p>
        </div>
      </div>
      <hr />
      <p className='fw-bold'>ที่อยู่</p>
      <div className='row gy-3'>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>สังกัด: <span className='fw-bold'>{user?.department}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>มหาวิทยาลัย: <span className='fw-bold'>{user?.university}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>ที่อยู่: <span className='fw-bold'>{user?.address}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>จังหวัด: <span className='fw-bold'>{user?.province}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>อำเภอ: <span className='fw-bold'>{user?.district}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>ตำบท: <span className='fw-bold'>{user?.sub_district}</span></p>
        </div>
        <div className='col-6 col-md-4'>
          <p className='text-muted'>รหัสไปรษณี: <span className='fw-bold'>{user?.zip_code}</span></p>
        </div>
      </div>
      <hr/>
      <div>
        {handleRoleDash(role)}
      </div>
    </div>
  )
}

export default UserProfile