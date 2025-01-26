import React, { useState } from 'react'
import { useSignup } from '../hook/useSignup'
import { Link } from 'react-router-dom'
import Logo from '../asset/logo.png'

// toast
import { ToastContainer } from 'react-toastify'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, password)
    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row align-items-center vh-100 py-5 g-5'>
                <div className='col-12 col-lg-6'>
                    <form onSubmit={handleSubmit} className='card border-0 shadow text-bg-light'>
                        <div className='card-body row gy-3'>
                            <div className='col-12'>
                                <h2>ลงทะเบียน</h2>
                                <p className='text-muted'>กรอกรายละเอียดแล้วกดยืนยันเพื่อลงทะเบียน</p>
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>ชื่อ - นามสกุล</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>ชื่อผู้ใช้งาน</label>
                                <input
                                    type='text'
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    className='form-control'
                                    required
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>รหัสผ่าน</label>
                                <input
                                    type='password'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className='form-control'
                                    required
                                />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>ยืนยันรหัสผ่าน</label>
                                <input
                                    type='password'
                                    pattern={password}
                                    className='form-control'
                                    required
                                />
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary w-100' disabled={isLoading}>Submit</button>
                            </div>
                            {error && <p className='text-danger'>{error}</p>}
                            <div className='text-center'>
                                <small>Back to <Link to='/'>Home</Link> or <Link to='/login'>Login</Link></small>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-6 d-none d-lg-flex bg-primary h-100 d-flex align-items-center rounded'>
                    <div className='w-100'>
                        <div className='text-center'>
                            <img src={Logo} alt='paper submission' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp