import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function ConfrRegistration() {

    const [regisDate, setRegisDate] = useState({
        eb_start: null,
        eb_end: null,
        rl_start: null,
        rl_end: null
    })
    const [bankDetail, setBankDetail] = useState({
        bank_name: "",
        bank_type: "",
        ac_no: "",
        ac_name: ""
    })
    const [regisType, setRegisType] = useState([])
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const fethRegis = async () => {
        setLoading(true)
        try {
            const res = await axios.get(api + "/get/confr/" + id)
            setRegisDate({
                eb_start: res.data.regis_eb_start_date,
                eb_end: res.data.regis_eb_end_date,
                rl_start: res.data.regis_rl_start_date,
                rl_end: res.data.regis_rl_end_date
            })
            setBankDetail({
                bank_name: res.data.bank_name,
                bank_type: res.data.bank_type,
                ac_no: res.data.acc_no,
                ac_name: res.data.acc_name
            })
            setRegisType(res.data.regis_type)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fethRegis()
    }, [])

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
        <div className='container'>
            <div className='mb-5'>
                <h4 className='fw-bold'>รายละเอียดการลงทะเบียน</h4>
            </div>
            <div className='row mb-5'>
                <p className='fw-bold'>กำหนดการลงทะเบียน</p>
                <div className='col-md-6'>
                    <div className='mb-3 card p-3'>
                        <div className='row'>
                            <div className='col'>
                                <p className='text-primary'>Early Bird Registration:</p>
                            </div>
                            <div className='col'>
                                <p>Start: {regisDate.eb_start !== null && regisDate.eb_start !== undefined ? (dayjs(regisDate.eb_start).format("DD-MM-YYYY")) : "ยังไม่ระบุ"} </p>
                                <p>End: {regisDate.eb_end !== null && regisDate.eb_end !== undefined ? (dayjs(regisDate.eb_end).format("DD-MM-YYYY")) : "ยังไม่ระบุ"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='mb-3 card p-3'>
                        <div className='row'>
                            <div className='col'>
                                <p className='text-primary'>Regular Registration:</p>
                            </div>
                            <div className='col'>
                                <p>Start: {regisDate.rl_start !== null && regisDate.rl_start !== undefined ? (dayjs(regisDate.rl_start).format("DD-MM-YYYY")) : "ยังไม่ระบุ"}</p>
                                <p>End: {regisDate.rl_end !== null && regisDate.rl_end !== undefined ? (dayjs(regisDate.rl_end).format("DD-MM-YYYY")) : "ยังไม่ระบุ"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <div>
                    <p className='fw-bold'>รายละเอียดธนาคาร</p>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        ชื่อธนาคาร
                    </div>
                    <div className='col-md-9 mb-3'>
                        {bankDetail.bank_name ? (bankDetail.bank_name) : "ไม่ระบุ"}
                    </div>
                    <div className='col-md-3'>
                        ชื่อบัญชี
                    </div>
                    <div className='col-md-9 mb-3'>
                        {bankDetail.ac_name ? (bankDetail.ac_name) : "ไม่ระบุ"}
                    </div>
                    <div className='col-md-3'>
                        ประเภทบัญชี
                    </div>
                    <div className='col-md-9 mb-3'>
                        {bankDetail.bank_type ? (bankDetail.bank_type) : "ไม่ระบุ"}
                    </div>
                    <div className='col-md-3'>
                        เลขบัญชี
                    </div>
                    <div className='col-md-9 mb-3'>
                        {bankDetail.ac_no ? (<span className='fw-bold text-primary'>{bankDetail.ac_no}</span>) : "ไม่ระบุ"}
                    </div>
                </div>
            </div>
            <div className='mb-5'>
                <div className='mb-3'>
                    <p className='fw-bold'>Registration Rate</p>
                </div>
                {regisType.length > 0 ? (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Early Registration</th>
                                    <th>Standard Registration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regisType?.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.name}</td>
                                        <td>{item.price_1} </td>
                                        <td>{item.price_2} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='text-end'>
                            <small className='text-muted'>สกุลเงินบาท</small>
                        </div>
                    </div>
                ) : "ไม่พบข้อมูล"}
            </div>
        </div>
    )
}

export default ConfrRegistration