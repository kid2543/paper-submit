import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// react bootstrap
import { Breadcrumb } from 'react-bootstrap'


function HostEditCate() {

    const { id } = useParams()

    const [cateData, setCateData] = useState({})
    const [commitData, setCommitData] = useState([])
    const [commitDetail, setCommitDetail] = useState([])
    const [newCommitList, setNewCommitList] = useState([])
    const [query, setQuery] = useState('')

    const handleChangeList = (e) => {
        if (e.target.checked) {
            setNewCommitList([...newCommitList, e.target.value])
        } else {
            setNewCommitList(newCommitList.filter((item) => item !== e.target.value))
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const json = Object.fromEntries(formData.entries())
            const res = await axios.patch('/api/category/update/' + id, json)
            setCateData(res.data)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateList = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/category/review', {
                _id: id,
                list: newCommitList
            })
            setCateData(res.data)
            toast.success("เพิ่มกรรมการสำเร็จ")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    const filterData = commitData?.filter(item =>
        item.username.toLowerCase().includes(query.toLocaleLowerCase())
    )

    useEffect(() => {

        const fethData = async () => {
            try {
                const res = await axios.get('/api/category/one/' + id)
                setCateData(res.data)
                setCommitDetail(res.data.reviewer_list)
                const comit = await axios.get('/api/user/committee')
                setCommitData(comit.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethData()

    }, [id])

    return (
        <div className='px-5 py-4'>
            <ToastContainer />
            <div>
                <div>
                    <h4 className='fw-bold'>แก้ไขข้อมูลหัวข้องานประชุม</h4>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/host/edit/category">หัวข้องานประชุม</Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            แก้ไขหัวข้องานประชุม
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className='card border-0 mb-5'>
                    <div className='card-body'>
                        <form onSubmit={handleUpdate}>
                            <div className='row gy-3'>
                                <p>
                                    รหัสหัวข้อ : <span className='fw-bold'>{cateData?.category_code}</span>
                                </p>
                                <div className='col-12'>
                                    <label className='form-label text-muted'>ชื่องานประชุม</label>
                                    <input name='name' className='form-control' defaultValue={cateData?.name} />
                                </div>
                                <div className='col-12'>
                                    <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
                                    <textarea name='desc' className='form-control' defaultValue={cateData?.desc} />
                                </div>
                                <div className='text-end'>
                                    <button type='submit' className='btn btn-primary'>
                                        <i className='bi bi-floppy me-2'></i>บันทึกข้อมูล
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='card border-0 shadow-sm mb-5'>
                    <div className='card-body'>
                        <h6 className='fw-bold mb-4'>รายชื่อกรรมการประจำหัวข้อ</h6>
                        {commitDetail.length > 0 ? (
                            <div className='table-responsive'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ชื่อผู้ใช้งาน</th>
                                            <th>ชื่อกรรมการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commitDetail?.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>
                                ไม่พบรายชื่อกรรมการ
                            </p>
                        )}
                    </div>
                </div>
                <div className='card border-0 shadow-sm mb-5'>
                    <div className='card-body'>
                        <h6 className='fw-bold mb-4'>
                            รายชื่อกรรมการทั้งหมด
                        </h6>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="ค้นหา" onChange={handleSearch} />
                                    <button className="btn btn-primary" id="basic-addon2"><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                            <div>
                                <a href='/host/committee' className='btn btn-primary'>
                                    <i className='bi bi-person-plus me-2'></i>
                                    เพิ่มกรรมการ
                                </a>
                            </div>
                        </div>
                        <form onSubmit={handleUpdateList}>
                            <div className='col-12'>
                                <div className='table-responsive'>
                                    <table className='table table-hover'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>ชื่อผู้ใช้งาน</th>
                                                <th>ชื่อกรรมการ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterData?.map((item) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        <input type='checkbox' onChange={e => handleChangeList(e)} value={item._id} />
                                                    </td>
                                                    <td>{item.username}</td>
                                                    <td>{item.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <button className='btn btn-success' type='submit' disabled={newCommitList.length <= 0}>
                                    <i className='me-2 bi bi-people'></i>ยืนยัน
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostEditCate