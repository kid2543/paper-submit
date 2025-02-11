import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingPage from './LoadingPage'
import { useAuthContext } from '../hook/useAuthContext'
import UnAuthorized from '../page/UnAuthorized'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children, api}) => {
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
        if(user) {
            checkAuth()
        }

    },[api, user])

    if(!user) {
        return <Navigate to='/login' replace />
    }

    if(loading) {
        return <LoadingPage />
    }

    if(Forbiden) {
        return <UnAuthorized />
    }

    return children
}

export default PrivateRoute
