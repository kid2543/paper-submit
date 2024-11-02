import React, { useEffect, useState } from 'react'
import { NavbarConfr } from './Navbar'
import ErrorPage from '../page/ErrorPage'
import { useParams } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import LoadingPage from './LoadingPage'

const api = process.env.REACT_APP_API_URL

function ConfrLayout({ children }) {

    const { id } = useParams()

    const [errorPage, setErrorPage] = useState({})
    const [loading, setLoading] = useState(true)
    const [confrCode, setConfrCode] = useState("")

    useEffect(() => {
        const fethConfr = async () => {
            try {
                const res = await axios.get(api + "/get/confr/" + id)
                setConfrCode(res.data.confr_code)
            } catch (error) {
                console.log(error)
                setErrorPage(error)
            }
        }
        fethConfr()

        setTimeout(() => setLoading(false), 100)
    }, [id])

    if(loading) {
        return <LoadingPage />
    }

    if (errorPage.status) {
        return <ErrorPage />
    }

    return (
        <div>
            <section className='mb-5'>
                <NavbarConfr id={id} name={confrCode} />
            </section>
            <section style={{ minHeight: "80vh" }}>
                {children}
            </section>
            <section className='mt-5'>
                <Footer />
            </section>
        </div>
    )
}

export default ConfrLayout