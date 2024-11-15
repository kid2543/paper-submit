import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const res = await axios.post('/api/user/signup', {username, password})
            const json = await res.data

            //save the user to local
            localStorage.setItem('user', JSON.stringify(json))

            //update authcontext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.response?.data.error)
        }
    }

    return { signup, isLoading, error }
} 