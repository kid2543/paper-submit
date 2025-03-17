import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    Breadcrumb
} from 'react-bootstrap'

function HostViewRegis() {


    const id = sessionStorage.getItem('host_confr')
    const [confr, setConfr] = useState({})
    const [paper, setPaper] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/conference/host/' + id)
                setConfr(res.data)
                const papers = await axios.get('/api/paper/regis/' + id)
                setPaper(papers.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [id])

    return (
        <div className='container-fluid'>
            <Breadcrumb>
                <Breadcrumb.Item href="/host/confr">แผงควบคุม</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    รายชื่อผู้ลงทะเบียน
                </Breadcrumb.Item>
            </Breadcrumb>
            <section className='row row-cols-1 g-3'>
                <div className='card'>
                    <div className='card-body'>
                        <h4 className='fw-bold'>รายชื่อผู้ลงทะเบียน</h4>
                    </div>
                </div>
                {confr &&
                    <div className='text-center'>
                        รายชื่อผู้ลงทะเบียนเข้าร่วม{confr?.title}
                    </div>
                }
                {paper.length > 0 ? (
                    <div className='card'>
                        <div className='card-body'>
                            <div className='table-responsive'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>อันดับ</th>
                                            <th>ชื่อ - นามสกุล</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paper?.map((items,index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{items.owner?.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='text-center'>
                        ไม่พบข้อมูลการลงทะเบียน
                    </div>
                )
                }
            </section>
        </div>
    )
}

export default HostViewRegis