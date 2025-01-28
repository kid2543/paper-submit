import React, { useState } from 'react'
import { useSignup } from '../hook/useSignup'
import { ToastContainer } from 'react-toastify'

function AdminSignUp() {

    // เพิ่มผู้ดูแลระบบ

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { signup, error, isLoading } = useSignup()  

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, password, 'ADMIN', name)
    }

    return (
        <div className='py-5 container'>
            <ToastContainer />
            <form onSubmit={handleSubmit} className='row'>
                <div className="mb-3">
                    <label className="form-label">ชื่อ - นามสกุล</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">ชื่อผู้ใช้งาน</label>
                    <input type="username" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">รหัสผ่าน</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">ยืนยันรหัสผ่าน</label>
                    <input type="password" name='confirm_password' className="form-control" pattern={password} required />
                </div>
                <div className='col-12 text-end'>
                    <button disabled={isLoading} type="submit" className="btn btn-primary">ลงทะเบียน</button>
                </div>
                {error && 
                    <p className='text-danger'>{error}</p>
                }
            </form>
        </div>
    )
}

export default AdminSignUp