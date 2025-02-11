import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AwardCateList() {

    const id = sessionStorage.getItem('host_confr')
    const [cate, setCate] = useState([])

    useEffect(() => {
        const fethCate = async () => {
            try {
                const res = await axios.get('/api/category/' + id)
                setCate(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fethCate()
    }, [id])

    return (
        <div>
            <div className='mb-3 card'>
                <div className="card-body">
                    <h4 className='fw-bold card-title'>รางวัลดีเด่น</h4>
                    <p className='text-muted card-text'>เลือกหัวข้อเพื่อจัดอันดับรางวัลดีเด่น</p>
                </div>
            </div>
            {cate &&
                <div>
                    <div className='card shadow-sm'>
                        <div className='card-body'>
                            <h6 className='fw-bold card-title'>รายชื่อหัวข้องานประชุม</h6>
                            <div className='table-responsive'>
                                <table className='table' style={{ minWidth: "1000px" }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ชื่อ</th>
                                            <th>เครื่องมือ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cate.map((cates, index) => (
                                            <tr key={cates._id} className='col-12 col-md-4'>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>{cates.name}</td>
                                                <td>
                                                    <Link to={`/host/edit/award/${cates._id}`} className='btn btn-primary'>
                                                        <i className='bi bi-pencil-square'></i>
                                                    </Link>
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

export default AwardCateList