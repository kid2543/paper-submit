import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import LoadingPage from '../components/LoadingPage'


const api = process.env.REACT_APP_API_URL

function Confr() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [inv, setInv] = useState([])
    const [cate, setCate] = useState([])
    const [partner, setPartner] = useState([])
    const [pub, setPub] = useState([])
    const [impDate, setImpDate] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fethData = async () => {
            try {
                const confrData = await axios.get(api + "/get/confr/" + id)
                setData(confrData.data)
                setImpDate(confrData.data.important_date)
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
            }
        }

        setTimeout(() => setLoading(false), 500)

        fethData()
    }, [id])

    if (loading) {
        return <LoadingPage />
    }


    return (
        <div className='container-md'>
            <section className='mb-5'>
                <h2 className='fw-bold'>{data?.title}
                    <button type='button' className='btn btn-light btn-sm ms-2'>
                        <ion-icon name="pencil-outline"></ion-icon>
                    </button>
                </h2>
                <p>{data?.sub_title}</p>
                {pub.length > 0 && cate.length > 0 ? (
                    <button type='button' onClick={() => navigate("/submit/" + id)} className='btn btn-primary'>ส่งบทความ</button>
                ) : (
                    <button type='button' onClick={() => navigate("/submit/" + id)} className='btn btn-info' disabled>จะเปิดให้ส่งบทความเร็วๆ นี้</button>
                )}
            </section>
            <section className='mb-5'>
                <h4 className='fw-bold'>ABOUT THE CONFERENCE</h4>
                <p>{data?.confr_desc}</p>
            </section>
            {cate.length > 0 ? (
                <section className='mb-5'>
                    <h4 className='fw-bold'>TOPIC</h4>
                    <div className='row g-3'>
                        {cate?.map((item) => (
                            <div className='col-md-3' key={item._id}>
                                <div className='card h-100'>
                                    <div className='card-body text-center'>
                                        <div className='mb-3'>
                                            <img src={api + "/image/" + item.icon} alt={item.icon} height={32} width={32} />
                                        </div>
                                        <p className='mb-0'>{item.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
            {impDate.length > 0 ? (
                <section className='mb-5'>
                    <h4 className='fw-bold'>IMPORTANT DATE</h4>
                    <ul className='list-group'>
                        {impDate?.map((item, index) => (
                            <li className='list-group-item p-3' key={index}>
                                <h6 className='fw-bold'>{item.name}</h6>
                                <p className='mb-0'>{dayjs(item.start_date).format("DD/MM/YYYY")} - {dayjs(item.end_date).format("DD/MM/YYYY")}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
            {pub.length > 0 ? (
                <section className='mb-5'>
                    <h4 className='fw-bold'>PUBLICATION OPTION</h4>
                    <div className='row g-3'>
                        <div className='col-md-4'>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    Pub
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    Publication name
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    Name 1
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card h-100'>
                                <div className='card-body'>
                                    Pub 2
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}
            {inv.length > 0 ? (
                <section className='mb-5'>
                    <h4 className='fw-bold'>INVITED SPEAKER</h4>
                    <div className='row gy-3'>
                        {inv?.map((item) => (
                            <div className='col-12' key={item._id}>
                                <div className='card h-100'>
                                    <div className='card-body'>
                                        <div className='row align-items-center g-5'>
                                            <div className='col-md-3 text-center'>
                                                <img src={api + "/image/" + item.img} alt={item.img} className='img-thumbnail border-0' />
                                            </div>
                                            <div className='col-md-9'>
                                                <h6 className='fw-bold'>{item.name}</h6>
                                                <p className='text-muted'>{item.desc}</p>
                                                <p className='fw-bold'>{item.keynote}</p>
                                                {item.cv &&
                                                    <div>
                                                        <button type='button' onClick={() => navigate(api + "/pdf/" + item.cv)} className='btn btn-outline-dark'>CV: {item.name}</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
            {partner.length > 0 ? (
                <section>
                    <h4 className='fw-bold'>OUR PARTNERS</h4>
                    <div className='row g-3'>
                        {partner?.map((item) => (
                            <div className='col-4 col-md-3 col-lg-1' key={item._id}>
                                <img src={api + "/image/" + item.image} alt={item.desc} className='img-thumbnail border-0' />
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
        </div>
    )
}

export default Confr