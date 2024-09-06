import React, { useState } from 'react'
import Logo from '../asset/logo.png'
import { NavLink } from 'react-router-dom'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function SideBar() {

    const renderTooltip = (id, value) => (
        <Tooltip id={id}>
            {value}
        </Tooltip>
    );

    const [show, setShow] = useState(false)

    return (
        <div className='d-none d-md-flex flex-column flex-shrink-0 bg-dark text-white p-3 h-100 main position-relative' style={show ? { width: "280px" } : { width: "100px" }}>
            <div className='position-absolute start-100'>
                {show ? (
                    <button type='button' onClick={() => setShow(false)} className='btn btn-outline-secondary ms-2'><ion-icon name="arrow-back"></ion-icon></button>
                ) : (
                    <button type='button' onClick={() => setShow(true)} className='btn btn-outline-secondary ms-2'><ion-icon name="arrow-forward"></ion-icon></button>
                )}
            </div>
            <div className='text-center'>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("button-tooltip-0", "PAPERSS")}
                >
                    <a href="/">
                        <img src={Logo} alt='logo' height={48} width={48} />
                    </a>
                </OverlayTrigger>

            </div>
            <hr />
            <ul className='nav nav-pills nav-fill flex-column mb-auto'>
                <li className='nav-item'>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("button-tooltip-1", "Dashboard")}
                    >
                        <NavLink to="/host" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <ion-icon name="layers"></ion-icon>
                            <span className={show ? "ms-2" : "d-none"}>
                                Dashboard
                            </span>
                        </NavLink>
                    </OverlayTrigger>
                </li>
            </ul>
            <hr />
            <div>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("button-tooltip-top", "back to top")}
                >
                    <a href="#">
                        <button className='btn text-white btn-sm text-center w-100'>
                            <ion-icon name="caret-up-circle"></ion-icon>
                        </button>
                    </a>
                </OverlayTrigger>
            </div>
        </div>
    )
}

export default SideBar