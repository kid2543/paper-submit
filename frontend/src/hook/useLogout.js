import Cookies from "js-cookie"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"


export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = async () => {
        //remove user from storage
        try {            
            await axios.post('/api/user/logout')
            Cookies.remove('username')
            localStorage.clear()
            sessionStorage.clear()
            // dispatch logout action
            dispatch({type: 'LOGOUT'})
        } catch (error) {
            console.log(error)
        }
    }

    return { logout }

}