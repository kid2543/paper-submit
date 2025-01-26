import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import axios from 'axios'
import Cookies from "js-cookie";

import { toast } from "react-toastify";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const res = await axios.post('/api/user/login', { username, password })
            if (res) {
                Cookies.set('username', username, { expires: 1 })
                dispatch({ type: 'LOGIN', payload: username })
            }
            setIsLoading(false)
        } catch (error) {
            toast.error('เกิดข้อผิดพลาด: ' + error.response?.data.error)
            setIsLoading(false)
            setError(error.response?.data.error)
        }
    }

    return { login, isLoading, error }
} 