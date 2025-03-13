import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hook/useAuthContext'
import { Navigate } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import Cookies from 'js-cookie'

function Setting() {

    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState('idle')
    const [error, setError] = useState(null)
    const { user, dispatch } = useAuthContext()

    useEffect(() => {
        setLoading('loading')
        const fetchRole = async () => {
            try {
                const user = await axios.get('/api/user/navigate')
                setRole(user.data.role)
            } catch (error) {
                console.log(error)
                if (error.response.status === 403) {
                    dispatch({ type: 'LOGOUT' })
                    Cookies.remove('authToken')
                    Cookies.remove('username')
                }
                setError(error.response.data.error)
            } finally {
                setLoading('success')
            }
        }
        if (user) {
            fetchRole()
        }
    }, [user, dispatch])

    if (!user) {
        return <Navigate to='/' />
    }

    if (loading === 'idle' || loading === 'loading') {
        return (
            <div className='text-center py-5'>
                <LoadingPage />
            </div>
        )
    }

    if (error) {
        return <div>Error Page</div>
    }

    switch (role) {
        case "ADMIN": return <Navigate to='/admin' />
        case "AUTHOR": return <Navigate to='/author' />
        case "COMMITTEE": return <Navigate to='/committee' />
        case "HOST": return <Navigate to='/host' />
        default: return <div>Error</div>
    }
}

export default Setting