import React, { useRef, useState, useEffect, useContext } from 'react'
import useAuth from '../hook/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL

function Login() {

    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(api + "/signin",
                JSON.stringify({ user, pwd }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(res?.data))
            const accessToken = res?.data.accessToken
            const roles = res?.data?.roles
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (error) {

        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "d-block text-danger" : "d-none"}>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign in</button>
            </form>
            <p>
                Need an Account <br />
                <a href='#'>
                    Sign Up
                </a>
            </p>
        </section>
    )
}

export default Login