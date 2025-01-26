import React, { useState } from 'react'
import { useLogin } from '../hook/useLogin'
import { Link } from 'react-router-dom'
import Logo from '../asset/logo.png'

import { ToastContainer } from 'react-toastify'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row g-5 align-items-center vh-100 py-5'>
                <div className='col d-none d-md-flex d-flex align-items-center h-100 bg-dark rounded'>
                    <div className='w-100'>
                        <div className='text-center'>
                            <img src={Logo} alt='paper submission' />
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <form onSubmit={handleSubmit} className='card border-0 shadow'>
                        <div className='card-body py-4 row gy-4'>
                            <div className='col-12'>
                                <h2>เข้าสู่ระบบ</h2>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>ชื่อผู้ใช้งาน</label>
                                <input
                                    type='text'
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    className='form-control'
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>รหัสผ่าน</label>
                                <input
                                    type='password'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className='form-control'
                                />
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary w-100' disabled={isLoading}>Login</button>
                            </div>
                            {error && <p className='text-danger'>{error}</p>}
                            <div className='text-center'>
                                <small>Back to <Link to='/'>Home</Link> or <Link to='/signup'>Register</Link></small>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login