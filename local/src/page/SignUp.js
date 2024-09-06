import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Logo from '../asset/logo.png'
import Modal from 'react-bootstrap/Modal';

const api = process.env.REACT_APP_API_URL

function SignUp({ hostSignUp }) {

    const [error, setError] = useState("")
    const [valid, setValid] = useState(true)
    const [pwd, setPwd] = useState("")
    const [show, setShow] = useState(false)
    const [uniqueUser, setUniqueUser] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const navigate = useNavigate()


    const pattern = {
        phone: /^[0-9]{10}$/,
        email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        username: /^[A-Za-z_0-9]{8,29}$/i,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,29}$/,
    }

    const checkPattern = (field, fieldValue) => {
        return pattern[field].test(fieldValue)
    }

    const inputInvalidation = {
        color: "red",
        borderColor: "red"
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const value = Object.fromEntries(formData.entries())
        const temp = []
        for (const name in value) {
            if (value[name] !== "") {
                continue
            } else {
                temp.push(value[name])
            }
        }
        if (temp.length > 0) {
            setError("แบบฟอร์มไม่สมบูรณ์")
            setShow(true)
            setValid(false)
        } else {
            const validation = checkPattern("phone", e.target.phone.value) && checkPattern("email", e.target.email.value) && checkPattern("username", e.target.username.value) && checkPattern("password", e.target.password.value) && e.target.con_password.value === e.target.password.value
            if (validation) {
                try {
                    await axios.post(api + "/signup", value)
                    handleShowModal()
                } catch (error) {
                    if (error.response.data) {
                        setError(error.response.data.keyValue.username + " มีผู้ใช้งานแล้ว")
                        setShow(true)
                        setUniqueUser(true)
                        setValid(true)
                        document.getElementById("username").focus()
                        console.log(error)
                    } else {
                        console.log(error)
                        setError("เกิดข้อผิดพลาดที่ระบบ")
                        setShow(true)
                    }
                }
            } else {
                setError("บางรายการไม่ถูกต้อง")
                setShow(true)
            }
        }
    }

    const handleBlur = () => {
        setValid(false)
        setUniqueUser(false)
    }

    const handleFocus = () => {
        setValid(true)
    }

    return (
        <div>
            <div className='container py-5'>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header>
                        <Modal.Title>สร้างผู้ใช้งานสำเร็จ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Success</Modal.Body>
                    <Modal.Footer className='justify-content-start'>
                        <button type='button' className='btn btn-success' onClick={() => navigate("/Sign-in")}>
                            OK!
                        </button>
                    </Modal.Footer>
                </Modal>
                <div className='position-fixed top-0 end-0 p-3' style={{ zIndex: 100 }}>
                    <div className={show ? 'toast fade show' : 'toast fade hide'}>
                        <div className='toast-header text-bg-danger'>
                            <strong className='me-auto'>เกิดข้อผิดพลาด</strong>
                            <button className='btn-close' type='button' onClick={() => setShow(false)}></button>
                        </div>
                        <div className='toast-body'>
                            <strong>{error}</strong>
                        </div>
                    </div>
                </div>
                <div className='mb-3 text-center'>
                    <div className='mb-4'>
                        <a href='/'>
                            <img src={Logo} alt="paper submission" height={64} width={64} />
                        </a>
                    </div>
                    <div className='mb-5'>
                        <h1 className='px-4 px-lg-5 fw-bold'>สมัครสมาชิก</h1>
                        <p>Already have an account? <a href="/sign-in">เข้าสู่ระบบที่นี่!</a></p>
                    </div>
                </div>
                <form className={valid ? "needs-validation col-12 col-lg-6 mx-auto" : "was-validated col-12 col-lg-6 mx-auto"} id='signup-form' noValidate onSubmit={handleSignUp}>
                    <div>
                        <h4 className='mb-3 fw-bold text-secondary text-center'>ข้อมูลส่วนตัว</h4>
                        <div className='row'>
                            <div className='mb-3'>
                                <label className='form-label text-muted'>คำนำหน้าชื่อ <span className='text-danger'>*</span></label>
                                <div className='d-flex'>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='prefix' value="นาย" required />
                                        <label className="form-check-label">
                                            นาย
                                        </label>
                                    </div>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='prefix' value="นาง" required />
                                        <label className="form-check-label">
                                            นาง
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='prefix' value="นางสาว" required />
                                        <label className="form-check-label">
                                            นางสาว
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='mb-3'>
                                <label className='form-label text-muted'>เพศ <span className='text-danger'>*</span></label>
                                <div className='d-flex'>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='gender' value="ชาย" required />
                                        <label className="form-check-label">
                                            ชาย
                                        </label>
                                    </div>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='gender' value="หญิง" required />
                                        <label className="form-check-label">
                                            หญิง
                                        </label>
                                    </div>
                                    <div className="form-check me-3">
                                        <input className="form-check-input" onBlur={handleBlur} onFocus={handleFocus} type="radio" name='gender' value="อื่นๆ / ไม่ระบุ" required />
                                        <label className="form-check-label">
                                            อื่นๆ / ไม่ระบุ
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row gx-3'>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted w-100' htmlFor='fname'>
                                        ชื่อ
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input className='form-control' type='text' id='fname' name='fname' required onBlur={handleBlur} onFocus={handleFocus} />
                                    <div className="invalid-feedback">
                                        กรุณากรอกชื่อ
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='lname'>
                                        นามสกุล
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input className='form-control' type='text' name='lname' id='lname' required onBlur={handleBlur} onFocus={handleFocus} />
                                    <div className="invalid-feedback">
                                        กรุณากรอกนามสกุล
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row gx-3'>
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='status'>
                                        สถานะ
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <select className='form-select' onBlur={handleBlur} onFocus={handleFocus} name='status' id='status' required>
                                        <option value="">เลือก...</option>
                                        <option value="โสด">โสด</option>
                                        <option value="สมรส">สมรส</option>
                                        <option value="หย่าร้าง">หย่าร้าง</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        โปรดเลือก
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row gx-3'>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='phone'>เบอร์โทร<span className='text-danger'> *</span></label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='tel' className='form-control' name='phone' id='phone' pattern='[0-9]{10}' maxLength={10} required />
                                    <div className="invalid-feedback">
                                        ใส่เลขเบอร์โทร 10 หลัก
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='email'>
                                        Email
                                    </label>
                                    <span className='text-danger'> *</span>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='email' className='form-control' name='email' htmlFor='email' required />
                                    <div className="invalid-feedback">
                                        รูปแบบไม่ถูกต้อง
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h4 className='my-3 fw-bold text-secondary text-center'>ข้อมูลผู้ใช้</h4>
                        <div className='row gx-3'>
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='role'>
                                        สิทธิ์การเข้าถึงข้อมูล
                                        <span className='text-danger'> *</span>
                                    </label>
                                    {hostSignUp ? (
                                        <input className='form-control-plaintext' name='role' id='role' readOnly value="Host" />
                                    ) : (
                                        <input className='form-control-plaintext' name='role' id='role' readOnly value="Author" />
                                    )}

                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='username'>
                                        ชื่อผู้ใช้งาน
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} type='text' onFocus={handleFocus} className={uniqueUser ? "form-control is-invalid" : "form-control"} name='username' id='username' pattern='[A-Za-z_0-9]{8,29}' required />
                                    <div className="invalid-feedback">
                                        อย่างน้อย 8 ตัวอักษร
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='password'>
                                        รหัสผ่าน
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='password' className='form-control' name='password' id='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,29}$' onChange={e => setPwd(e.target.value)} required />
                                    <small className='text-muted'>รูปแบบรหัสประกอบด้วย พิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข ขั้นต่ำ 8 ตัวอักษร</small>
                                    <div className="invalid-feedback">
                                        รูปแบบไม่ถูกต้อง
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='con_password'>
                                        ยืนยันรหัสผ่าน
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='password' className='form-control  ' name='con_password' id='con_password' pattern={pwd} required />
                                    <div className="invalid-feedback">
                                        รหัสผ่านไม่ตรงกัน หรือ ไม่ได้กรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div>
                        <h4 className='my-3 fw-bold text-secondary text-center'>ข้อมูลองค์กร</h4>
                        <div className='row gx-3'>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='department'>
                                        แผนก
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control  ' name='department' id='department' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='university'>
                                        มหาวิทยาลัย
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control  ' name='university' id='university' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted' htmlFor='address'>
                                ที่อยู่
                                <span className='text-danger'> *</span>
                            </label>
                            <textarea onBlur={handleBlur} onFocus={handleFocus} className='form-control' rows={3} name='address' id='address' required />
                            <div className="invalid-feedback">
                                กรุณากรอกข้อมูล
                            </div>
                        </div>
                        <div className='row gx-3'>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='province'>
                                        จังหวัด
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control  ' name='province' id='province' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='district'>
                                        อำเภอ
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control  ' name='district' id='district' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='sub_district'>
                                        ตำบล
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control' name='sub_district' id='sub_district' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className='mb-3'>
                                    <label className='form-label text-muted' htmlFor='zip_code'>
                                        รหัสไปรษณีย์
                                        <span className='text-danger'> *</span>
                                    </label>
                                    <input onBlur={handleBlur} onFocus={handleFocus} type='text' className='form-control' name='zip_code' id='zip_code' required />
                                    <div className="invalid-feedback">
                                        กรุณากรอกข้อมูล
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-5 text-end'>
                            <button className='btn btn-primary' type='submit'>สมัครสมาชิก</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SignUp