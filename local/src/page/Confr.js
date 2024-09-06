import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'


const api = process.env.REACT_APP_API_URL

function Confr() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [inv, setInv] = useState([])
    const [cate, setCate] = useState([])
    const [partner, setPartner] = useState([])
    const [pub, setPub] = useState([])
    const [loading, setLoading] = useState(true)

    const today = new Date()

    const fethData = async () => {
        setLoading(true)
        try {
            const confrData = await axios.get(api + "/get/confr/" + id)
            setData(confrData.data)
            const cateData = await axios.get(api + "/get/category/" + id)
            setCate(cateData.data)
            const pubData = await axios.get(api + "/get/pub/" + id)
            setPub(pubData.data)
            const invData = await axios.get(api + "/get/inv-speaker/" + id)
            setInv(invData.data)
            const partnerData = await axios.get(api + "/get/partner/" + id)
            setPartner(partnerData.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fethData()
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
                <h1>{data?.title}</h1>
                <small>{data?.sub_title}</small>
                <div className='card bg-dark shadow my-5 py-3'>
                    <div className='p-5'>
                        <div className='text-center mb-5'>
                            <h2 className='fw-bold text-white'>ส่งบทความได้ที่นี่</h2>
                        </div>
                        <div className='text-center'>
                            <button onClick={() => navigate("/submit/" + id)} type='button' className='btn btn-success'>ส่งบทความ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <h4 className='fw-bold mb-3'>ABOUT THE CONFERENCE</h4>
                <p className='text-muted'>{data?.confr_desc}</p>
            </div>
            <div className='mb-5'>
                {cate.length > 0 ? (
                    <div>
                        <h4 className='fw-bold'>TOPIC</h4>
                        <div className='row'>
                            {cate?.map((item) => (
                                <div className='col-12 col-lg-4' key={item._id}>
                                    <div className='my-3'>
                                        <img src={api + "/image/" + item.icon} alt={item.name} height={48} width={48} />
                                    </div>
                                    <div>
                                        <p className='mb-0'>{item.name}</p>
                                        <small className='text-muted'>{item.desc}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : <h2>ยังไม่มีหัวข้อที่เปิดรับ</h2>}
            </div>
            <div className='row mb-5'>
                <div className='col'>
                    <h4 className='fw-bold mb-3'>
                        Important Date
                    </h4>
                    <div>
                        <ol>
                            {data?.important_date?.map((item) => (
                                <li key={item._id}>
                                    <p>
                                        {item.name}
                                    </p>
                                    <span className='text-success'>Start:</span> {dayjs(item.start_date).format("DD/MM/YYYY")} <br />
                                    {new Date(item.end_date) > today ? (
                                        <span className='text-success'>End: {dayjs(item.end_date).format("DD/MM/YYYY")}</span>
                                    ) : (
                                        <span className='text-danger'>End: {dayjs(item.end_date).format("DD/MM/YYYY")} (เลยกำหนดการแล้ว)</span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className='col'>
                    <h4 className='fw-bold mb-3'>Publication</h4>
                    <div>
                        {pub.length > 0 ? (
                            <ul>
                                {pub?.map((item) => (
                                    <li key={item._id}>
                                        <div>
                                            <h6 className='mb-0'>{item.th_name}</h6>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <h5 className='text-warning'>ไม่มีวารสาร</h5>}
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <h4 className='fw-bold mb-3'>Invited Speaker</h4>
                {inv.length > 0 ? (
                    <div className='row'>
                        {inv?.map((item) => (
                            <div key={item._id} className='col-12 col-md-6 mb-3'>
                                <div className='card shadow p-3 h-100'>
                                    <div className='row align-items-center'>
                                        <div className='col-12 col-md-6 mb-3'>
                                            <img className='border rounded' src={api + "/image/" + item.img} alt={item.name} width={250} />
                                        </div>
                                        <div className='col-12 col-md-6'>
                                            <p className='fw-bold'>{item.name}</p>
                                            <p><small className='text-muted'>{item.desc}</small></p>
                                            <p><i>"{item.keynote}"</i></p>
                                            {item.cv ? (
                                                <div>
                                                    <button type='button' onClick={() => window.open(api + "/pdf/" + item.cv, "blank")} className='btn btn-dark btn-sm'>CV: {item.name}</button>
                                                </div>
                                            ) :
                                                <div>
                                                    <button type='button' disabled className='btn btn-outline-dark btn-sm'>ไม่มี CV</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                    <h5 className="text-warning">ไม่พบรายชื่อพิธีกรรับเชิญ</h5>
                }
            </div>
            <div>
                <h4 className='fw-bold mb-3'>Our Partner</h4>
                <div>
                    {partner.length > 0 ? (
                        <div className='row'>
                            {partner?.map((item) => (
                                <div className='col-6 col-md-2 text-center mb-3' key={item._id}>
                                    <div className='border rounded-pill p-3'>
                                        <img src={api + "/image/" + item.image} alt={item.desc} width={48} height={48} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Confr