import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function ConfrTemplate() {

    const { id } = useParams()

    const [template, setTemplate] = useState([])
    const [submitDetail, setSubmitDetail] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

        fethTemplate()
    }, [id])

    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className='container'>
            <div className='mb-5'>
                <h4 className='fw-bold'>เทมเพลท</h4>
                <p className='text-muted'>กดปุ่มเพื่อดู template</p>
                {template.length > 0 ? (
                    <div className='row'>
                        {template?.map((item) => (
                            <div className='col-12 col-md-3' key={item._id}>
                                <div>
                                    <button type='button' onClick={() => window.open(api + "/pdf/" + item.file)} className='btn btn-outline-dark'>{item.name}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : "ไม่พบเทมเพลท"}
            </div>
            <div className='mb-5'>
                <p className='fw-bold'>ข้อแนะนำการส่งบทความ</p>
                {submitDetail.length > 0 ? (
                    <ol>
                        {submitDetail?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                ) : "-"}
            </div>
        </div>
    )
}

export default ConfrTemplate