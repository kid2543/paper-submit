import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hook/useAuthContext'
import UnAuthorized from '../page/UnAuthorized'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, api }) => {
    const [loading, setLoading] = useState(true)
    const { user } = useAuthContext()
    const [Forbiden, setForbiden] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(api)
            } catch (error) {
                setForbiden(true)
            } finally {
                setLoading(false)
            }
        }
        if (user) {
            checkAuth()
        }

    }, [api, user])

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (loading) {
        return (
            <div className='text-center py-5'>
                กำลังตรวจสอบสิทธิ์การใช้งาน...
            </div>
        )
    }

    if (Forbiden) {
        return <UnAuthorized replace />
    }

    return children
}

export default PrivateRoute
