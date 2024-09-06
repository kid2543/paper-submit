import React from 'react'
import { NavbarConfr } from './Navbar'
import ErrorPage from '../page/ErrorPage'
import { useParams } from 'react-router-dom'
import Footer from './Footer'

function ConfrLayout({ children }) {

    const key = localStorage.getItem("confr_id")
    const {id} = useParams()

    if (id !== key || !key) {
        return <ErrorPage />
    }

    return (
        <div>
            <section className='mb-5'>
                <NavbarConfr id={key} />
            </section>
            <section style={{minHeight: "100vh"}}>
                {children}
            </section>
            <section className='mt-5'>
                <Footer />
            </section>
        </div>
    )
}

export default ConfrLayout