import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function ConfrPub() {

    const { id } = useParams()

    const [pub, setPub] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)
        const fethPub = async () => {
            try {
                const res = await axios.get(api + "/get/pub/" + id)
                setPub(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fethPub()
    }, [id])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className='container-md'>
            <div>
                <h4 className='fw-bold'>วารสาร</h4>
            </div>
            <div>
                <p>รายการวารสาร</p>
                {pub.length > 0 ? (
                    <div className='row g-3'>
                        {pub?.map((item,index) => (
                            <div className='col-md-6' key={index}>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6 className='fw-bold'>{item.en_name}</h6>
                                        <p>{item.th_name}</p>
                                        <p className='fw-bold'>{item.branch}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                    "-"
                }
            </div>
        </div>
    )
}

export default ConfrPub