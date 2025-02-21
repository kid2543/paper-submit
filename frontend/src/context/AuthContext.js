import { createContext, useReducer, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user = Cookies.get('username')

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch, loading}}>
            { children }
        </AuthContext.Provider>
    )
}