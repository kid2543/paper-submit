import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function RegisConfr() {

    const [confr, setConfr] = useState({})
    const [paymentImage, setPaymentImage] = useState(null)


    const { id } = useParams()
    const navigate = useNavigate()

    const paperId = localStorage.getItem("paper_id")


    const paymentUpload = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("image", paymentImage)
            await axios.patch(api + "/upload/payment/" + paperId, formData)
            alert("Upload ข้อมูลสำเร็จ")
            navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            localStorage.clear()
        }
    }

    useEffect(() => {

        
    const fethConfr = async () => {
        try {
            const res = await axios.get(api + "/get/confr/" + id)
            setConfr(res.data)
        } catch (error) {
            console.log(error)
        }
    }

        fethConfr()
    }, [id])

    return (
        <div className='container my-5'>
            <div className='mb-5'>
                <h4 className='fw-bold'>รายละเอียดการลงทะเบียน</h4>
            </div>
            <div className='mb-3'>
                <p className='fw-bold'>โปรดชำระเงินระหว่างวันที่ด้านล่าง</p>
                <div>
                    Early Bird Registration: <strong>{dayjs(confr?.regis_eb_start_date).format("DD MMM YYYY")}</strong> ถึง <strong>{dayjs(confr?.regis_eb_end_date).format("DD MMM YYYY")}</strong>
                </div>
                <div>
                    Regular Registration : <strong>{dayjs(confr?.regis_rl_start_date).format("DD MMM YYYY")}</strong> ถึง <strong>{dayjs(confr?.regis_rl_end_date).format("DD MMM YYYY")}</strong>
                </div>
            </div>
            <div className='mb-3'>
                <p className='fw-bold'>รายละเอียดธนาคาร</p>
                <div>
                    <div>
                        ชื่อธนาคาร: {confr?.bank_name}
                    </div>
                    <div>
                        ชื่อบัญชี: {confr?.acc_name}
                    </div>
                    <div>
                        ประเภทบัญชี: {confr?.bank_type}
                    </div>
                    <div>
                        เลขบัญชี: {confr?.acc_no}
                    </div>
                </div>
            </div>
            <div>
                <p className='fw-bold'>อัตราค่าธรรมเนียม</p>
                <div className='table-responsive'>
                    <table className='table table-hover table-bordered'>
                        <thead className='table-primary'>
                            <tr>
                                <th>#</th>
                                <th>Early Bird</th>
                                <th>Regular</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confr.regis_type?.map((list) => (
                                <tr key={list._id}>
                                    <td>{list.name}</td>
                                    <td>{list.price_1}</td>
                                    <td>{list.price_2}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <form onSubmit={paymentUpload}>
                <p className='fw-bold'>แนบหลักฐานการชำระเงิน</p>
                <div className='input-group'>
                    <input accept='image/*' required onChange={e => setPaymentImage(e.target.files[0])} type='file' className='form-control' />
                    <button type='submit' className="btn btn-outline-primary btn-sm">Upload</button>
                </div>
            </form>
        </div>
    )
}

export default RegisConfr