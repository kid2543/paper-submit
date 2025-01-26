import React, { useEffect, useState } from 'react'
import { replace, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from './LoadingPage'
import { useAuthContext } from '../hook/useAuthContext'

const PrivateRoute = ({children, api}) => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { user } = useAuthContext()


    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get(api)
            } catch (error) {
                navigate('/unauthorized', replace)
            } finally {
                setLoading(false)
            }
        }
        if(user) {
            checkAuth()
        } else {
            alert('กรุณา Login')
            navigate('/')
        }
    },[api])

    if(loading) {
        return <LoadingPage />
    }

    return children
}

export default PrivateRoute
