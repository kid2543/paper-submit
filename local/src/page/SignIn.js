import React, { useEffect, useState } from 'react'
import Logo from '../asset/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function SignIn() {

  const [errorMessage, setErrorMessage] = useState("")
  const token = sessionStorage.getItem("token")
  const role = sessionStorage.getItem("role")

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
      sessionStorage.setItem("confr", res.data.confr_id)
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
    if (token) {
      switch (role) {
        case "Admin": navigate("/admin"); break
        case "Host": navigate("/host"); break
        case "Author": navigate("/author"); break
        case "Committee": navigate("/committee"); break
      }
    }
  }, [])


  return (
    <div className='container' style={{ height: "100vh" }}>
      <div className='row h-100 d-flex align-items-center'>
        <form className='col-lg-3 mx-auto' onSubmit={handleForm}>
          <a href="/" className='d-flex align-items-center justify-content-center text-decoration-none text-dark mb-5'>
            <div>
              <img alt='main-logo' src={Logo} height={48} width={48} className='me-2' />
            </div>
            <div>
              <p className='fw-bold fs-4 text-center mb-0'>PAPERSS</p>
            </div>
          </a>
          <div className="mb-3">
            <label className="form-label d-none">Username</label>
            <input type="text" className="form-control form-control-lg" placeholder='Username' name='username' required onFocus={clearErrorMessage} />
          </div>
          <div className="mb-3">
            <label className="form-label d-none">Password</label>
            <input type="password" className="form-control form-control-lg" placeholder='Password' name='password' id="password_input" required onFocus={clearErrorMessage} />
          </div>
          <div className='d-flex justify-content-between'>
            <div className="mb-3 form-check d-flex">
              <input type="checkbox" className="form-check-input me-2" onClick={showPassword} />
              <label className="form-check-label">Show Password</label>
            </div>
            <div className='text-secondary'>
              Forgot ?
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">LOGIN</button>
          {errorMessage ? (
            <div className="alert alert-danger mt-5" role="alert">
              {errorMessage}
            </div>
          ) : null}
        </form>
        <div className='text-center'>
          <a href="/sign-up" className='btn btn-link link-secondary text-decoration-none'>Create new <ion-icon name="arrow-forward"></ion-icon></a>
        </div>
      </div>
    </div>
  )
}

export default SignIn