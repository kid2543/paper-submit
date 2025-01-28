import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    let newUser = null
    const navigate = useNavigate()

    const signup = async (username, password, role, name) => {
        setIsLoading(true)
        setError(null)

        if(!role) {
            role = "AUTHOR"
        }

        try {
            const res = await axios.post('/api/user/signup', {
                name,
                username, 
                password, 
                role
            })
            setIsLoading(false)
            toast.success('ลงทะเบียนสำเร็จ')
            if(role === 'AUTHOR') {
                navigate('/login')
            }
            return res.data
        } catch (error) {
            toast.error("เกิดข้อผิดพลาด: " + error.response?.data.error)
            setIsLoading(false)
            setError(error.response?.data.error)
        }
    }

    return { signup, isLoading, error, newUser }
} 