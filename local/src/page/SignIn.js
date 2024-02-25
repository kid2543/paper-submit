import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignIn({state}) {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(process.env.REACT_APP_API_URL + "/login",{
        username:username,
        password:password
      })
      sessionStorage.setItem('token',res.data.token);
      if(state === 1) {
        navigate('/')
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className='w-25 my-5 mx-auto text-center'>
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={Login}>
          <div className='form-floating'>
          <input type='text' placeholder='username' className='form-control' onChange={e => setUsername(e.target.value)} />
          <label className='form-label text-muted'>username</label>
          </div>
          <div className='form-floating'>
          <input type='password' placeholder='password' className='form-control' onChange={e => setPassword(e.target.value)} />
          <label className='form-label text-muted'>password</label>
          </div>
          <button type='submit'  className='btn btn-primary w-100 mb-2'>Sign In</button>
          <small className='form-text'>Back to <a href="/">HOME</a> page</small>
        </form>
      </div>
  )
}

export default SignIn