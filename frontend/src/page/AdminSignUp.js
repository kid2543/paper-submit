import React from 'react'

function AdminSignUp() {
    return (
        <div className='py-5'>
            <form className='container h-100 my-auto'>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">ชื่อ - นามสกุล</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">ชื่อผู้ใช้งาน</label>
                    <input type="username" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">รหัสผ่าน</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">ยืนยันรหัสผ่าน</label>
                    <input type="confrim_password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AdminSignUp