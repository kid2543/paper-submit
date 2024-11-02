import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function HostEditCate() {

    const { id } = useParams()

    const [cateData, setCateData] = useState({})
    const [commitData, setCommitData] = useState([])
    const [commitList, setCommitList] = useState([])
    const [uploadIcon, setUploadIcon] = useState(null)
    const [commitDetail, setCommitDetail] = useState([])
    const [newCommitList, setNewCommitList] = useState([])

    const navigate = useNavigate()

    const handleChangeList = (e) => {
        if (e.target.checked) {
            setNewCommitList([...newCommitList, e.target.value])
        } else {
            setNewCommitList(newCommitList.filter((item) => item !== e.target.value))
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (uploadIcon) {
            const formData = new FormData(e.target)
            formData.append("image", uploadIcon)
            formData.append("reviewer", newCommitList)
            try {
                const uploadCate = await axios.patch(api + `/update/cate/${id}/${cateData?.icon}`, formData)
                console.log(uploadCate)
                alert("แก้ไขข้อมูลสำเร็จ")
                navigate(-1)
            } catch (error) {
                console.log(error)
                alert("เกิดข้อผิดพลาด")
            }
        } else {
            const input = e.target
            try {
                const update = await axios.patch(api + `/update/cate/${id}/${cateData?.icon}`, {
                    name: input.name.value,
                    desc: input.desc.value,
                    reviewer: newCommitList
                })
                console.log(update)
                alert("แก้ไขข้อมูลสำเร็จ")
                navigate(-1)
            } catch (error) {
                console.log(error)
                alert("เกิดข้อผิดพลาด")
            }
        }

    }

    useEffect(() => {

        const fethData = async () => {
            try {
                const res = await axios.get(api + "/get/one/cate/" + id)
                setCateData(res.data)
                setCommitList(res.data.reviewer_list)
                const comit = await axios.get(api + "/all/committee")
                setCommitData(comit.data)
                const list = await axios.get(api + "/get/committee/list/" + id)
                setCommitDetail(list.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethData()

    }, [id])

    return (
        <div className='container py-5'>
            <div>
                <h4 className='mb-3'>แก้ไขข้อมูลหัวข้องานประชุม</h4>
                <form onSubmit={handleUpdate}>
                    <div className='row gy-3'>
                        <div className='col-12 col-md-6'>
                            <label className='form-label text-muted'>ชื่องานประชุม</label>
                            <input name='name' className='form-control' defaultValue={cateData?.name} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
                            <textarea name='desc' className='form-control' defaultValue={cateData?.desc} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label className='form-label text-muted'>รูปงานประชุมเดิม</label>
                            <img className='d-block' alt={cateData?.icon} src={api + "/image/" + cateData?.icon} height={128} width={128} />
                        </div>
                        <div className='col-12 col-md-6'>
                            <label className='form-label text-muted'>แก้ไขรูปงานประชุมใหม่</label>
                            <input onChange={e => setUploadIcon(e.target.files[0])} className='form-control' type='file' accept='image/*' />
                        </div>
                        <div className='col-12'>
                            <label className='form-label text-muted'>รายชื่อกรรมการที่เพิ่มเข้ามาแล้ว</label>
                            {commitDetail?.length > 0 ? (
                                <div className='table-responsive mb-5'>
                                    <table className='table table-hover'>
                                        <thead className='table-primary'>
                                            <tr>
                                                <th>#</th>
                                                <th>ชื่อกรรมการ</th>
                                                <th>สังกัด</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {commitDetail?.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.fname} {item.lname}</td>
                                                    <td>{item.university}</td>
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
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <p className='form-label text-muted'>
                                    แก้ไขรายชื่อกรรมการตรวจบทความ
                                </p>
                                <a href='/host/committee' className='btn btn-primary btn-sm'>เพิ่มกรรมการ</a>
                            </div>

                            <div className='table-responsive'>
                                <table className='table table-hover'>
                                    <thead className='table-secondary'>
                                        <tr>
                                            <th>#</th>
                                            <th>ชื่อกรรมการ</th>
                                            <th>สังกัด/มหาวิทยาลัย</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commitData?.map((item) => (
                                            <tr key={item._id}>
                                                <td>
                                                    <input type='checkbox' onChange={e => handleChangeList(e)} value={item._id} defaultChecked={commitList.includes(item._id)} />
                                                </td>
                                                <td>{item.fname} {item.lname}</td>
                                                <td>{item.university}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='col-12'>
                            {newCommitList.length > 0 ? (
                                <button type='submit' className='btn btn-success'>Save</button>
                            ) : (
                                <button type='submit' className='btn btn-outline-secondary'>Clear</button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HostEditCate