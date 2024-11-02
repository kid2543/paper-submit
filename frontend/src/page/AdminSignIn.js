import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function AdminSignIn() {

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        if(e.target.username !== "" && input.password !== "") {
            try {
                const res = await axios.post(api + '/signin', input)
                sessionStorage.setItem("fname", res.data.fname)
                sessionStorage.setItem("lname", res.data.lname)
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("role", res.data.role)
                navigate("/admin")
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

  return (
    <div className='container px-3 py-5 d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
        <form onSubmit={handleLogin} className='col-12 col-md-6 col-lg-4 mx-auto'>
        <h4 className='text-center mb-5'>Admin Login Page</h4>
            <div className='mb-3'>
                <input onChange={handleInput} name='username' className='form-control' placeholder='Username' />
            </div>
            <div className='mb-3'>
                <input type='password' onChange={handleInput} name='password' className='form-control' placeholder='Password' />
            </div>
            <div className='text-center'>
                <button className="btn btn-primary w-100">Login</button>
                <small className='text-muted'>Back to <button className='btn btn-link' onClick={() => navigate("/")}>Home</button></small>
            </div>
        </form>
    </div>
  )
}

export default AdminSignIn