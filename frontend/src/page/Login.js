import React, { useState } from 'react'
import { useLogin } from '../hook/useLogin'
import { Link } from 'react-router-dom'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <section className='vh-100 bg-primary bg-gradient'>
            <div className="d-flex h-100 align-items-center">
                <div className="card col-11 col-md-6 col-lg-4 mx-auto my-3 p-3">
                    <div className="card-body">
                        <div className="text-center mb-5">
                            <h1 className="card-title fw-bold">เข้าสู่ระบบ</h1>
                            <div className="text-muted px-2">
                                กรอกข้อมูลผู้ใช้งาน และรหัสผ่านเพื่อเริ่มการใช้งาน
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="mb-3">
                            <div className="mb-5">
                                {error && 
                                    <div className="alert alert-danger">
                                       <i className="me-2 bi bi-exclamation-triangle-fill"></i> {error}
                                    </div>
                                }
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='floatingInput'
                                        placeholder='Username'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <label htmlFor='floatingInput'>Username</label>
                                </div>
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id='floatingPassword'
                                        placeholder='Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <label htmlFor='floatingPassword'>Password</label>
                                </div>
                            </div>
                            <button type='submit' disabled={isLoading} className="btn btn-primary w-100">เข้าสู่ระบบ</button>
                        </form>
                        <div className="text-center text-muted">
                            <small>ไม่มีบัญชี ? <Link to='/signup'>ลงทะเบียน</Link> หรือ <Link to='/'>ไปหน้าแรก</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login