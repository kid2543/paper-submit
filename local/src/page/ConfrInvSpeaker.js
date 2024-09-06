import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function ConfrInvSpeaker() {

    const [invList, setInvList] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()
    const imagePath = api + "/image/"
    const cvPath = api + "/pdf/"

    const fethInv = async () => {
        setLoading(true)
        try {
            const res = await axios.get(api + "/get/inv-speaker/" + id)
            setInvList(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fethInv()
    }, [])

    if (loading) {
        return (
            <div className="p-5 my-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='mb-5'>
                <h4 className='fw-bold text-center'>รายชื่อพิธีกร</h4>
            </div>
            {invList.length > 0 ? (
                <div className='row'>
                    {invList?.map((item) => (
                        <div className='col-12 mb-3' key={item._id}>
                            <div className="card mb-3">
                                <div className="row g-0 align-items-center p-5">
                                    <div className="col-md-4 text-center mb-3">
                                        <img src={imagePath + item.img} className="img-fluid" alt={item.name} width={250} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.desc}</p>
                                            <p className="card-text"><small className="text-muted">{item.keynote}</small></p>
                                            {item.cv &&
                                                <div>
                                                    <button className='btn btn-dark' type='button' onClick={() => window.open(cvPath + item.cv)}>CV: {item.name}</button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : "ไม่พบรายชื่อกรรมการ"}
        </div>
    )
}

export default ConfrInvSpeaker