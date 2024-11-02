import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import SearchItemNotFound from '../components/SearchItemNotFound'

const api = process.env.REACT_APP_API_URL

function ConfrPresentGuideline() {

    const { id } = useParams()
    const [presentData, setPresentData] = useState([])
    const [remark ,setRemark] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)
        const fethData = async () => {
            try {
                const res = await axios.get(api + "/get/confr/" + id)
                setPresentData(res.data.presentation_guideline)
                setRemark(res.data.presentation_remark)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fethData()
    }, [id])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className='container my-5'>
            <div className='mb-5'>
                <h4 className='mb-3 fw-bold'>แนวทางการนำเสนอ</h4>
                <div>
                    {presentData.length > 0 ? (
                        <ul>
                            {presentData?.map((item,index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ): <SearchItemNotFound />}
                </div>
            </div>
            {remark && 
                <div>
                    <p className='text-primary'>*** {remark}</p>
                </div>
            }
        </div>
    )
}

export default ConfrPresentGuideline