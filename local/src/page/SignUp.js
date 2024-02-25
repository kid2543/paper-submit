import React from 'react'

function SignUp() {
    return (
        <div className='w-25 my-5 mx-auto text-center'>
            <h2 className='text-center'>สมัครสมาชิก</h2>
            <form>
                <input type='text' placeholder='Username' className='form-control' />
                <input type='text' placeholder='Email' className='form-control' />
                <input type='password' placeholder='Password' className='form-control' />
                <input type='password' placeholder='Confirm Password' className='form-control' />
                <button className='btn btn-primary w-100 mb-2'>Sign Up</button>
                <small className='form-text'>Back to <a href="/">HOME</a> page</small>
            </form>
        </div>
    )
}

export default SignUp