import React, { useState } from 'react'
import { useSignup } from '../hook/useSignup'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, password)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>Username:</label>
            <input
                type='text'
                onChange={e => setUsername(e.target.value)}
                value={username}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='text-danger'>{error}</div>}
        </form>
    )
}

export default SignUp