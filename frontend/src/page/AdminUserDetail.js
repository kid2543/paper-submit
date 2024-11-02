import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function AdminUserDetail() {

    const {id} = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        const fethUser = async () => {
            try {
                const res = await axios.get(api + "/get/user/byid/" + id)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fethUser()
    },[id])

    return (
        <div className='container py-5'>
            <h4 className='fw-bold mb-3'>
                <span className='text-primary me-2'><ion-icon name="person"></ion-icon></span>
                {user?.prefix} {user?.fname} {user?.lname}
            </h4>
            <div className='card'>
                <div className='row p-3 align-items-center'>
                    <div className='col-12 col-md-4 text-center'>
                        <div className='fs-1'>
                            <ion-icon name="person-circle"></ion-icon>
                        </div>
                        <div className='fw-bold'>
                        {user?.prefix} {user?.fname} {user?.lname}
                        </div>
                        <small className='text-muted'>
                            {user?.email}
                        </small>
                    </div>
                    <div className='col-12 col-md-8'>
                        <div className='row gy-3'>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>สถานะ</span>
                                {user?.status}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>เบอร์โทร</span>
                                {user?.phone}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>สังกัด/มหาวิทยาลัย</span>
                                {user?.department}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>ที่อยู่</span>
                                {user?.address}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>จังหวัด</span>
                                {user?.province}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>ตำบล</span>
                                {user?.district}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>อำเภอ</span>
                                {user?.sub_district}
                            </div>
                            <div className='col-12 col-md-4 border-bottom py-2'>
                                <span className='text-muted d-block'>เลขไปรษณีย์</span>
                                {user?.zip_code}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserDetail