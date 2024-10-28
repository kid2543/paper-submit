import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import SearchItemNotFound from '../components/SearchItemNotFound'

const api = process.env.REACT_APP_API_URL

function ConfrPartner() {

    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [partner, setPartner] = useState([])

    useEffect(() => {
        setLoading(true)
        const fethPartner = async () => {
            try {
                const res = await axios.get(api + "/get/partner/" + id)
                setPartner(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fethPartner()
    }, [id])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className='container-md'>
            <div>
                <h4 className='fw-bold'>ผู้สนับสนุน</h4>
            </div>
            <div>
                <p>รายการผู้สนับสนุน</p>
                {partner.length > 0 ? (
                    <div className='row g-3'>
                        {partner?.map((item) => (
                            <div className='col-4 col-md-2 col-lg-1' key={item._id}>
                                <img src={api + "/image/" + item.image} alt={item.desc} className='img-thumbnail' />
                            </div>
                        ))}
                    </div>
                ) :
                    <SearchItemNotFound />
                }
            </div>
        </div>
    )
}

export default ConfrPartner