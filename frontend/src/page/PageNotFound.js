import React from 'react'

// asset
import NotfoundIcon from '../asset/web.png'
import { HomeNavbar } from '../components/Navbar'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div style={{padding: '128px 0px'}}>
            <HomeNavbar />
            <main>
                <h1 className='display-1 fw-bold text-center my-5'>
                    404 ERROR PAGE
                </h1>
                <div className='text-center'>
                    <img src={NotfoundIcon} alt='page not found' />
                </div>
                <div className='text-center'>
                    <div>
                        <Link to='/' className='btn btn-primary'>กลับไปหน้าแรก</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PageNotFound