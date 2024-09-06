import React, { useEffect, useState } from 'react'
import { NavbarConfr } from '../components/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL

function ConfrTemplate() {

    const { id } = useParams()

    const [template, setTemplate] = useState([])
    const [submitDetail, setSubmitDetail] = useState([])
    const [loading, setLoading] = useState(true)

    const fethTemplate = async () => {
        setLoading(true)
        try {
            const res = await axios.get(api + "/get/template/" + id)
            setTemplate(res.data)
            console.log("template data: ", res.data)
            const confrData = await axios.get(api + "/get/confr/" + id)
            setSubmitDetail(confrData.data.submit_detail)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    console.log("Submit Detail", submitDetail)

    useEffect(() => {
        fethTemplate()
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
                <h4 className='mb-3'>เทมเพลท</h4>
                {template.length > 0 ? (
                    <div className='row'>
                        {template?.map((item) => (
                            <div className='col-12 col-md-3'>
                                <div>
                                    <button className='btn btn-outline-dark'>{item.name}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : "ไม่พบเทมเพลท"}
            </div>
            <div className='mb-5'>
                <h4 className='mb-3'>ข้อแนะนำการส่งบทความ</h4>
                {submitDetail.length > 0 ? (
                    <ol>
                        {submitDetail?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                ) : "ไม่พบข้อมูล"}
            </div>
        </div>
    )
}

export default ConfrTemplate