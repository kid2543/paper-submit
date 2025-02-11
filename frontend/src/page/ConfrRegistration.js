import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import useFetch from '../hook/useFetch'


function ConfrRegistration() {

    const { id } = useParams()
    const { data, loading, error } = useFetch('/api/conference/single/' + id)

    if (loading === 'idle' || loading === 'loading') {
        return (
            <LoadingPage />
        )
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div className='bg-light'>
            <section style={{ padding: "180px 0px" }}>
                <div className='text-center'>
                    <h1 className='fw-bold display-1'>
                        การลงทะเบียน
                    </h1>
                    <p className='text-muted'>อ่านรายละเอียดการลงทะเบียนได้ที่นี่!</p>
                </div>
            </section>
            {data &&
                <div>
                    <section className='bg-white' style={{ padding: "64px 0px" }}>
                        <div className='container'>
                            <h4 className='fw-bold mb-4'>ข้อมูลบัญชี</h4>
                            <div className='card  bg-gradient text-bg-dark p-2'>
                                <div className='card-body'>
                                    <div className='row g-3'>
                                        <div className='col-12 col-md-6'>
                                            <div className='card bg-white'>
                                                <div className='card-body'>
                                                    <p className='fw-bold'>เลขบัญชี</p>
                                                    <small>{data.acc_no}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6'>
                                            <div className='card bg-white'>
                                                <div className='card-body'>
                                                    <p className='fw-bold'>ชื่อบัญชี</p>
                                                    <small>{data.acc_name}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6'>
                                            <div className='card bg-white'>
                                                <div className='card-body'>
                                                    <p className='fw-bold'>ประเภทบัญชี</p>
                                                    <small>{data.bank_type}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 col-md-6'>
                                            <div className='card bg-white'>
                                                <div className='card-body'>
                                                    <p className='fw-bold'>ชื่อธนาคาร</p>
                                                    <small>{data.bank_name}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section style={{ padding: "64px 0px" }}>
                        <div className='container'>
                            <h4 className='fw-bold mb-4'>ข้อมูลการลงทะเบียน</h4>
                            <div className='card  shadow'>
                                <div className='card-body'>
                                    {data.regis_eb_start_date &&
                                        <div>
                                            <p>Early Bird:
                                                <span className='mx-2 badge text-bg-light'>
                                                    {data.regis_eb_start_date && dayjs(data.regis_eb_start_date).format('DD MMM YYYY')}
                                                </span>
                                                -
                                                <span className='mx-2 badge text-bg-light'>
                                                    {data.regis_eb_end_date && dayjs(data.regis_eb_end_date).format('DD MMM YYYY')}
                                                </span>
                                            </p>
                                        </div>
                                    }
                                    {data.regis_rl_start_date &&
                                        <div>
                                            <p>Regular:
                                                <span className='badge text-bg-light mx-2'>
                                                    {data.regis_rl_start_date &&
                                                        dayjs(data.regis_rl_start_date).format('DD MMM YYYY')
                                                    }
                                                </span>
                                                -
                                                <span className='badge text-bg-light mx-2'>
                                                    {data.regis_rl_end_date &&
                                                        dayjs(data.regis_rl_end_date).format('DD MMM YYYY')
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    }
                                    <div className='table-responsive'>
                                        <table className='table table-hover' style={{width: "800px"}}>
                                            <thead>
                                                <tr>
                                                    <th>-</th>
                                                    <th>Early</th>
                                                    <th>Regular</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.regis_type?.map((items) => (
                                                    <tr key={items._id}>
                                                        <td>
                                                            {items.name}
                                                        </td>
                                                        <td>
                                                            {items.price_1}
                                                        </td>
                                                        <td>
                                                            {items.price_2}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </div>
    )
}

export default ConfrRegistration