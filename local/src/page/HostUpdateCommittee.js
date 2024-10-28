import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'

const api = process.env.REACT_APP_API_URL

function HostUpdateCommittee() {

    const { id } = useParams()
    const navigate = useNavigate()


    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const [user, setUser] = useState({})

    const handelUpdate = async (e) => {
        e.preventDefault()
        const input = e.target
        try {
            const update = await axios.patch(api + "/update/user/" + id, {
                fname: input.fname.value,
                lname: input.lname.value,
                email: input.email.value,
                university: input.university.value,
            })
            console.log(update)
        } catch (error) {
            console.log(error)
        } finally {
            handleShow()
        }
    }

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
    }, [id])


    return (
        <div className="container my-5">
            <ConfirmModal show={show} />
            <div className='mb-3'>
                <h4 className='fw-bold'>แก้ไขข้อมูลกรรมการ</h4>
            </div>
            <form onSubmit={handelUpdate}>
                <div className='row g-3 mb-3'>
                    <div className='col-12'>
                        <label className='form-label text-muted'>ชื่อผู้ใช้งาน</label>
                        <input className='form-control-plaintext' defaultValue={user?.username} readOnly />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label className='form-label text-muted'>ชื่อ</label>
                        <input required name='fname' className='form-control' type='text' defaultValue={user?.fname} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label className='form-label text-muted'>นามสกุล</label>
                        <input required name='lname' className='form-control' type='text' defaultValue={user?.lname} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label className='form-label text-muted'>E-mail</label>
                        <input required name='email' className='form-control' type='text' defaultValue={user?.email} />
                    </div>
                    <div className='col-12 col-md-6'>
                        <label className='form-label text-muted'>มหาวิทยาลัย</label>
                        <input required name='university' className='form-control' type='text' defaultValue={user?.university} />
                    </div>
                </div>
                <div>
                    <button type='submit' className='btn btn-success me-4'>บันทึก</button>
                    <button type='button' className='btn btn-secondary' onClick={() => navigate("/host/committees")}>ยกเลิก</button>
                </div>
            </form>
        </div>
    )
}

export default HostUpdateCommittee