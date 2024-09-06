import React, { useEffect, useState } from 'react'
import { NavbarConfr } from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL

function ConfrGuideline() {

    const { id } = useParams()
    const [forPresenter, setForPresenter] = useState([])
    const [forSessionChair, setForSessionChair] = useState([])
    const [forAudience, setForAudience] = useState([])
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        fethGuiline()
    }, [])

    if (loading) {
        return (
            <div className='my-5 p-5 text-center'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
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
                    ) : <p>ไม่พบข้อเสนอแนะ</p>}
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
                    ) : <p>ไม่พบข้อเสนอแนะ</p>
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
                    ) : <p>ไม่พบข้อเสนอแนะ</p>}
                </div>
            </div>
        </div>
    )
}

export default ConfrGuideline