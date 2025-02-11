import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import { toast } from 'react-toastify'
import { Breadcrumb } from 'react-bootstrap'

function AdminUserDetail() {

    const { id } = useParams()
    const [user, setUser] = useState({})
    const [confrList, setConfrList] = useState([])
    const [paperList, setPaperList] = useState([])
    const [loading, setLoading] = useState('idle')
    const navigate = useNavigate()

    const handleEdit = (id) => {
        sessionStorage.setItem("host_confr", id)
        navigate("/host/confr/")
    }

    useEffect(() => {
        setLoading('loading')
        const fethUser = async () => {
            try {
                const res = await axios.get('/api/user/admin/user/' + id)
                setUser(res.data)
                const role = res.data.role
                if (role === 'HOST') {
                    const confr = await axios.get('/api/conference/owner/' + res.data._id)
                    setConfrList(confr.data)
                } else if (role === 'AUTHOR') {
                    const paper = await axios.get('/api/paper/admin/owner/' + res.data._id)
                    setPaperList(paper.data)
                } else {
                    console.log('คนหา Comment')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading('success')
            }
        }
        if (id) {
            fethUser()
        }
    }, [id])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const json = Object.fromEntries(formData.entries())
        try {
            await axios.patch('/api/user/update/' + user._id, json)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาดกรุณา ลองใหม่อีกครั้ง')
        }
    }

    if (loading === 'idle' || loading === 'loading') {
        return <LoadingPage />
    }

    return (
        <div className='py-3'>
            <div className="card mb-3 shadow-sm">
                <div className="card-body">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/admin">Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            รายละเอียดผู้ใช้งาน
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            {user &&
                <div className='card shadow-sm mb-3'>
                    <div className='card-body'>
                        <h4 className='card-title fw-bold'>{user.username}</h4>
                        <hr />
                        <div className='card-text'>
                            <form className='row g-3' onSubmit={handleUpdate}>
                                <div className='col-12'>
                                    <div>
                                        <label className='form-label'>ชื่อ - นามสกุล</label>
                                        <input className='form-control' placeholder='ชื่อ - นามสกุล' defaultValue={user.name} name='name' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>อีเมล</label>
                                        <input className='form-control' placeholder='example@mail.com' defaultValue={user.email} name='email' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>เบอร์โทร</label>
                                        <input pattern='[0-9]{10}' maxLength={10} className='form-control' defaultValue={user.phone} name='phone' />
                                        <div className='form-text'>เฉพาะตัวเลขจำนวน 10 หลักเท่านั้น</div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>สาขา</label>
                                        <input className='form-control' defaultValue={user.department} name='department' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>มหาวิทยาลัย</label>
                                        <input className='form-control' defaultValue={user.university} name='university' />
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div>
                                        <label className='form-label'>ที่อยู่</label>
                                        <textarea className='form-control' defaultValue={user.address} name='address' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>จังหวัด</label>
                                        <input className='form-control' defaultValue={user.province} name='province' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>อำเภอ</label>
                                        <input className='form-control' defaultValue={user.district} name='district' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>ตำบล</label>
                                        <input className='form-control' defaultValue={user.sub_district} name='sub_district' />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div>
                                        <label className='form-label'>รหัสไปรษณีย์</label>
                                        <input className='form-control' defaultValue={user.zip_code} name='zip_code' pattern='[0-9]{5}' maxLength={5} />
                                        <div className='form-text'>เฉพาะตัวเลขจำนวน 5 หลักเท่านั้น</div>
                                    </div>
                                </div>
                                <div className='text-end'>
                                    {confrList.length <= 0 &&
                                        <button type='button' className='btn btn-outline-danger me-2'>
                                            ลบผู้ใช้งาน
                                        </button>
                                    }
                                    <button type='submit' className='btn btn-primary'>
                                        ยืนยัน
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {confrList.length > 0 &&
                <div className="card shadow-sm">
                    <div className='card-body'>
                        <div className='table-responsive my-4'>
                            <h4 className="card-title fw-bold">รายการงานประชุม</h4>
                            <div className='table-responsive' style={{ minWidth: "1000px", minHeight: '400px' }}>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>รหัสงานประชุม</th>
                                            <th>ชื่องานประชุม</th>
                                            <th>เครื่องมือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confrList.map((items, index) => (
                                            <tr key={items._id}>
                                                <td>{index + 1}</td>
                                                <td>{items.confr_code}</td>
                                                <td>{items.title}</td>
                                                <td>
                                                    <button onClick={() => handleEdit(items._id)} type='button' className='btn btn-primary'>
                                                        <i className='bi bi-pencil-square'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {paperList.length > 0 &&
                <div className="card shadow-sm">
                    <div className='card-body'>
                        <div className='table-responsive my-4'>
                            <h4 className="card-title fw-bold">รายการบทความ</h4>
                            <div className='table-responsive' style={{ minWidth: "1000px", minHeight: '400px' }}>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>รหัส</th>
                                            <th>ชื่อ</th>
                                            <th>เครื่องมือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paperList.map((items, index) => (
                                            <tr key={items._id}>
                                                <td>{index + 1}</td>
                                                <td>{items.paper_code}</td>
                                                <td>{items.title}</td>
                                                <td>
                                                    <button type='button' className='btn btn-primary'>
                                                        <i className='bi bi-pencil-square'>เพิ่มให้กดแล้ว link ไปหน้าแสดงรายละเอียดบทความ</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminUserDetail