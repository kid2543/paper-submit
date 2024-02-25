import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../asset/logo.png'

function Navbar() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className='container-fluid'>
                <a href="/" className='navbar-brand'>
                    <img className='w-25 me-2' src={Logo} alt="logo" />
                    PAPERSS
                </a>
                <button className='navbar-toggler' onClick={() => setOpen(!open)}>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={open ? ('navbar-collapse') : ('collapse navbar-collapse')}>
                    <ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
                        <li className='nav-item'>
                            <a className='nav-link' href="/confr">งานประชุม</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href="/paper">บทความ</a>
                        </li>
                    </ul>
                    <div>
                        <button onClick={() => navigate('/sign-in')} className='btn btn-outline-primary my-3 my-sm-0 me-2'>Sign In</button>
                        <button onClick={() => navigate('/sign-up')} className='btn btn-outline-success my-3 my-sm-0'>Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar