import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hook/useLogout'
import { useAuthContext } from '../hook/useAuthContext'

function Navbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div>
                <Link to="/">
                    PAPERSS
                </Link>
                <nav>
                    {user ? (
                        <div>
                            <span>{user.username}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    ) : (
                        <div>
                            <Link to='/login'>
                                Login
                            </Link>
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar