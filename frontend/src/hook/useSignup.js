import { useState } from "react";
import axios from 'axios'

import { toast } from "react-toastify";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [newUser, setNewUser] = useState(false)

    const signup = async (username, password, role, name, email) => {
        setIsLoading(true)
        setError(null)

        if (!role) {
            role = "AUTHOR"
        }

        try {
            const res = await axios.post('/api/user/signup', {
                name,
                username,
                password,
                email,
                role
            })
            setIsLoading(false)
            if (role === 'AUTHOR') {
                toast.success(
                    <div>
                        ลงทะเบียนสำเร็จกลับสู่หน้า <a href="/login">เข้าสู่ระบบ ?</a>
                    </div>
                )
            } else {
                toast.success('ลงทะเบียนสำเร็จ')
            }
            setNewUser(true)
            return res.data
        } catch (error) {
            toast.error("เกิดข้อผิดพลาด: " + error.response?.data.error)
            setIsLoading(false)
            setError(error.response?.data.error)
        }
    }

    return { signup, isLoading, error, newUser }
} 