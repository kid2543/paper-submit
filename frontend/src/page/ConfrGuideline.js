import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function ConfrGuideline() {

    const { id } = useParams()
    const [forPresenter, setForPresenter] = useState([])
    const [forSessionChair, setForSessionChair] = useState([])
    const [forAudience, setForAudience] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fethGuiline = async () => {
            setLoading(true)
            try {
                const res = await axios.get(api + "/get/confr/" + id)
                setForPresenter(res.data.guide_for_presenter)
                setForSessionChair(res.data.guide_for_chair)
                setForAudience(res.data.guide_for_audience)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fethGuiline()
    }, [id])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='mb-5'>
                <h4 className='mb-3 fw-bold'>ข้อแนะนำสำหรับผู้นำเสนอ</h4>
                <div>
                    {forPresenter.length > 0 ? (
                        <ul>
                            {forPresenter?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : "-"}
                </div>
            </div>
            <div className='mb-5'>
                <h4 className='mb-3 fw-bold'>ข้อแนะนำสำหรับกรรมการห้องประชุม</h4>
                <div>
                    {forSessionChair.length > 0 ? (
                        <ul>
                            {forSessionChair?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : "-"
                    }
                </div>

            </div>
            <div className='mb-5'>
                <h4 className='mb-3 fw-bold'>ข้อแนะนำสำหรับผู้ชม</h4>
                <div>
                    {forAudience.length > 0 ? (
                        <ul>
                            {forAudience?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : "-"
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfrGuideline