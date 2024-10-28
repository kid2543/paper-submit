import React, { useEffect, useState } from 'react'
import Logo from '../asset/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function SignIn() {

  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault()
    const input = e.target
    try {
      const res = await axios.post(api + "/signin", {
        username: input.username.value,
        password: input.password.value,
      })
      sessionStorage.setItem("fname", res.data.fname)
      sessionStorage.setItem("lname", res.data.lname)
      sessionStorage.setItem("token", res.data.token)
      sessionStorage.setItem("role", res.data.role)
      navigate("/")
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage('User not found')
      } else if (error.response.status === 400) {
        setErrorMessage("Password is wrong")
      } else {
        setErrorMessage('Server error')
        console.log(error)
      }
    }
  }

  const clearErrorMessage = () => {
    setErrorMessage("")
  }

  const showPassword = () => {
    let show = document.getElementById("password_input")
    if (show.type === "password") {
      show.type = "text"
    } else {
      show.type = "password"
    }
  }

  useEffect(() => {

    const token = sessionStorage.getItem("token")
    const role = sessionStorage.getItem("role")

    if (token) {
      switch (role) {
        case "admin": window.location.href = "/admin"; break
        case "host": window.location.href = "/host"; break
        case "author": window.location.href = "/author"; break
        case "committee": window.location.href = "/committee"; break
        default: window.location.href = "/sign-in"
      }
    }
  }, [])


  return (
    <div className='text-center signin-body'>
      <div className='form-signin'>
        <form onSubmit={handleForm} className='card p-3 shadow-sm'>
          <a href='/' type='button' className='mb-3'>
            <img src={Logo} alt='paper' className='img-fluid' height={64} width={64}  />
          </a>
          <h3 className='h3 mb-3 fw-normal'>เข้าสู่ระบบ</h3>
          <div className="form-floating">
            <input type="text" className="form-control" placeholder='Username' name='username' required onFocus={clearErrorMessage} autoFocus />
            <label className="form-label">Username</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" placeholder='Password' name='password' id="password_input" required onFocus={clearErrorMessage} />
            <label className="form-label">Password</label>
          </div>
          <div className='checkbox mb-3'>
            <label>
              <input className='me-2' type='checkbox' onClick={showPassword} />
              Show password
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold mb-5">LOGIN</button>
          {errorMessage ? (
            <div className="alert alert-danger mt-5" role="alert">
              {errorMessage}
            </div>
          ) : null}
          <div className='text-center'>
            <a href="/sign-up" className='btn btn-link link-secondary text-decoration-none'>Create new <ion-icon name="arrow-forward"></ion-icon></a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn