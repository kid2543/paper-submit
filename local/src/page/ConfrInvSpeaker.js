import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import SearchItemNotFound from '../components/SearchItemNotFound'

const api = process.env.REACT_APP_API_URL

function ConfrInvSpeaker() {

    const [invList, setInvList] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()
    const imagePath = api + "/image/"
    const cvPath = api + "/pdf/"

    useEffect(() => {

        setLoading(true)
        const fethInv = async () => {
            try {
                const res = await axios.get(api + "/get/inv-speaker/" + id)
                setInvList(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fethInv()
    }, [id])

    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className='container'>
            <div className='mb-5'>
                <h4 className='fw-bold'>รายชื่อพิธีกร</h4>
            </div>
            {invList.length > 0 ? (
                <div className='row g-3'>
                    {invList?.map((item) => (
                        <div className='col-12' key={item._id}>
                            <div className="card">
                                <div className='card-body'>
                                    <div className="row g-5 align-items-center p-5">
                                        <div className="col-md-3 text-center mb-3">
                                            <img src={imagePath + item.img} className="img-thumbnail border-0" alt={item.name} />
                                        </div>
                                        <div className="col-md-9">
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
                        </div>
                    ))}
                </div>
            ) :
                <SearchItemNotFound />
            }
        </div>
    )
}

export default ConfrInvSpeaker