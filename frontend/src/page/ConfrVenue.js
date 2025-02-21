import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch'


function ConfrVenue() {

    const { id } = useParams()
    const { data, loading, error } = useFetch('/api/conference/single/' + id)

    if (error) {
        return <div>Error</div>
    }

    if (loading === 'idle' || loading === 'loading') {
        return (
            <div className="my-5 p-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <section className="bg-light" style={{ padding: "180px 0px" }}>
                <div className='text-center'>
                    <h1 className='display-1 fw-bold px-2'>สถานที่จัดงานประชุม</h1>
                    <p className='text-muted'>อ่านรายละเอียดสถานที่จัดงานได้ที่นี่</p>
                </div>
            </section>
            {data &&
                <section style={{ padding: "64px 0px" }}>
                    <div className='container'>
                        <h1 className='fw-bold mb-4 text-center'>{data.venue.name}</h1>
                        {data.venue_image &&
                            <div className='my-5 text-center rounded p-3 mx-auto' style={{ maxWidth: "600px" }}>
                                <img src={`/uploads/${data.venue_image}`} alt={data.venue_image} className="img-fluid" />
                            </div>
                        }
                        <div>
                            {data.venue.desc?.map((items, index) => (
                                <p key={index}><span className='ms-4'></span>{items}</p>
                            ))}
                        </div>
                        <div>
                            {data.venue.remark &&
                                <Link to={data.venue.remark} target='_blank' rel='noreferrer'>{data.venue.remark}</Link>
                            }
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default ConfrVenue