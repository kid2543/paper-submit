import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function ConfrVenue() {

    const [venueImage, setVenueImage] = useState("")
    const [venueDetail, setVenueDetail] = useState({
        name: "",
        desc: "",
        remark: "",
        travel: "",
    })
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {

        const fethVenue = async () => {
            setLoading(true)
            try {
                const res = await axios.get(api + "/get/confr/" + id)
                setVenueImage(res.data.venue_image)
                setVenueDetail({
                    name: res.data.venue?.name,
                    desc: res.data.venue?.desc,
                    remark: res.data.venue?.remark,
                    travel: res.data.venue?.travel
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fethVenue()
    }, [id])

    if (loading) {
        return (
            <div className="my-5 p-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className='mb-5'>
                <h4 className='fw-bold'>สถานที่จัดงานประชุม</h4>
            </div>
            <div className='mb-5'>
                <div className="row">
                    <div className='col-md-6 mb-5 mb-md-0'>
                        {venueImage ? (
                            <img src={api + "/image/" + venueImage} alt={venueDetail?.name} className='img-fluid' />
                        ):null}
                    </div>
                    <div className="col-md-6">
                        <h5 className='fw-bold text-primary'>{venueDetail?.name}</h5>
                        <p>{venueDetail?.desc}</p>
                        <div className='mt-5'>
                            <small className='text-muted'>{venueDetail?.remark} <a href={venueDetail?.travel}>{venueDetail?.travel}</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfrVenue