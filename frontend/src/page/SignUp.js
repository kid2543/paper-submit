import React, { useState } from 'react'
import { useSignup } from '../hook/useSignup'
import { Link } from 'react-router-dom'

// toast

// react-bootstrap
import {
    Modal,
} from 'react-bootstrap'

//asset
import Success from '../asset/checked.png'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const { signup, error, isLoading, newUser } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, password, '', name, email)
    }

    if (newUser) {
        return (
            <div
                className="modal show bg-dark bg-gradient vh-100 align-items-center d-flex"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog className="w-100">
                    <Modal.Body className='p-3'>
                        <div className="text-center">
                            <div className="mb-3">
                                <img src={Success} alt='...' width={128} height={128} />
                                <div className='my-3'>
                                    <small className="text-success">ยืนดีด้วย!</small>
                                </div>
                            </div>
                            <div className="mb-5">
                                <h3>คุณลงทะเบียนสำเร็จแล้ว</h3>
                                <div className="text-muted">เริ่มการใช้งานด้วยการกดปุ่มด้านล่างแล้วลงชื่อเข้าใช้งานเลย</div>
                            </div>
                            <Link
                                to={'/login'}
                                className="btn btn-primary"
                            >
                                <i className='bi bi-box-arrow-in-right me-2'></i>
                                เข้าสู่ระบบ
                            </Link>
                        </div>
                    </Modal.Body>

                </Modal.Dialog>
            </div>
        )
    }

    return (
        <section className='bg-primary bg-gradient' style={{minHeight: '100vh'}}>
            <div className="d-flex h-100 align-items-center py-4">
                <div className="card col-10 col-lg-6 mx-auto p-3">
                    <div className="card-body">
                        <div className="text-center mb-5">
                            <h1 className="card-title fw-bold">ลงทะเบียน</h1>
                            <div className="text-muted">
                                กรอกข้อมูลผู้ใช้งาน และรหัสผ่านเพื่อลงทะเบียนกับ PAPERSS
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
                                        type="email"
                                        className="form-control"
                                        id='floatingEmail'
                                        placeholder='อีเมล'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='floatingEmail'>อีเมล</label>
                                </div>
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='floatingName'
                                        placeholder='ชื่อ - นามสกุล'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='floatingName'>ชื่อ - นามสกุล</label>
                                </div>
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='floatingInput'
                                        placeholder='ชื่อผู้ใช้ (ใช้สำหรับเข้าสู่ระบบ)'
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='floatingInput'>ชื่อผู้ใช้ (ใช้สำหรับเข้าสู่ระบบ)</label>
                                    <div className='form-text mt-2'>
                                        ชื่อผู้ใช้ต้องประกอบด้วย ตัวอักษรและตัวเลขอย่างน้อย 8 ตัวอักษรสามารถใช้ . หรือ _ ได้
                                    </div>
                                </div>
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id='floatingPassword'
                                        placeholder='รหัสผ่าน'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor='floatingPassword'>รหัสผ่าน</label>
                                    <div className='form-text'>
                                        รหัสผ่านประกอบด้วยตัวอักษรและตัวเลขอย่างน้อย 8 ตัวอักษร และจะต้องมี พิมพ์ใหญ่ พิมพ์เล็ก และ อักษรพิเศษ อย่างละ 1 ตัว
                                    </div>
                                </div>
                                <div className="form-floating text-muted mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id='floatingCPassword'
                                        placeholder='ยืนยันรหัสผ่าน'
                                        pattern={password}
                                        required
                                    />
                                    <label htmlFor='floatingCPassword'>ยืนยันรหัสผ่าน</label>
                                </div>
                            </div>
                            {isLoading ? (
                                <button className="btn btn-primary w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            ) : (
                                <button
                                    type='submit'
                                    className="btn btn-primary w-100"
                                >
                                    ลงทะเบียน
                                </button>
                            )}
                        </form>
                        <div className="text-center text-muted">
                            <small>มีบัญชีอยู่แล้ว ? <Link to='/login'>เข้าสู่ระบบ</Link> หรือ <Link to='/'>กลับหน้าแรก</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp