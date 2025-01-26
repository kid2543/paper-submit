import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

// asset
import Logo from '../asset/logo.png'

// react bootstrap
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const api = process.env.REACT_APP_API_URL

function Confr() {

    const [data, setData] = useState({})
    const [topic, setTopic] = useState([])
    const [inv, setInv] = useState([])
    const [partner, setPartner] = useState([])
    const [err, setErr] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/conference/single/' + id)
                setData(res.data)
                const cate = await axios.get('/api/category/' + id)
                setTopic(cate.data)
                const Inv = await axios.get('/api/inv/' + id)
                setInv(Inv.data)
                const Partner = await axios.get('/api/partner/' + id)
                setPartner(Partner.data)
            } catch (error) {
                console.log(error)
                if (error.response.data) {
                    setErr(error.response.data.error)
                }
            }
        }
        fetchData()
    }, [id])

    console.log(data)

    return (
        <div>
            {err}
            {data &&
                <div className='bg-light'>
                    <section id='1' className='container' style={{ padding: "180px 0px" }}>
                        <div className='text-center'>
                            <h1 className='display-1 fw-bold'>{data.title}</h1>
                            <p className='text-muted'>{data.sub_title}</p>
                            <div>
                                <button className='btn btn-primary' disabled={!topic && !data.publication} onClick={() => navigate('/submit/' + id)}>ส่งบทความ</button>
                            </div>
                        </div>
                    </section>
                    <section id='2' className='container' style={{ padding: "64px 0px" }}>
                        <div className='text-center'>
                            <h4 className='fw-bold mb-3'>รายชื่อผู้สนับสนุน</h4>
                        </div>
                        <div className='row g-3'>
                            {partner?.map((items) => (
                                <div className='col-12 col-md-3' key={items._id}>
                                    <img src={items.img} alt={items.desc} className='img-fluid' />
                                </div>
                            ))}
                        </div>
                    </section>
                    <div className='bg-white' style={{ padding: '180px 0px 64px 0px' }}>
                        <section id='3' className='container'>
                            <div className='row gy-5'>
                                <div className='col-12 col-md-4'>
                                    <div className='sticky-top' style={{ top: "32px" }}>
                                        <div>
                                            <p className='fw-bold text-muted'>ข้อมูลในหน้านี้</p>
                                            <ul className="d-flex flex-column list-unstyled">
                                                <li>
                                                    <a className='text-secondary' href='#1'>หน้าหลัก</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#2'>รายชื่อผู้สนับสนุน</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#3'>รายละเอียดงานประชุม</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#4'>หัวข้องานประชุม</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#5'>กำหนดการส่งบทความ</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#6'>กำหนดการงานประชุม</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#7'>วารสาร</a>
                                                </li>
                                                <li>
                                                    <a className='text-secondary' href='#8'>พิธีกร</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className=' col-12 col-md-8'>

                                    <section>
                                        <div>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold'>รายละเอียดงานประชุม</h4>
                                            </div>
                                            <div>
                                                {data.confr_desc?.map((items, index) => (
                                                    <p key={index}>&nbsp;&nbsp;&nbsp;&nbsp;{items}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </section>



                                    <section id='4' style={{ padding: "64px 0px" }}>
                                        <div className='mb-4'>
                                            <h4 className='fw-bold'>หัวข้องานประชุม</h4>
                                            <p className='text-muted'>หัวข้องานประชุมที่ใช้สำหรับการแยกประเภทบทความ</p>
                                        </div>
                                        <Accordion>
                                            {topic?.map((items, index) => (
                                                <Accordion.Item key={items._id} eventKey={index}>
                                                    <Accordion.Header>{items.name}</Accordion.Header>
                                                    <Accordion.Body>
                                                        {items.desc}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    </section>



                                    <section id='5' style={{ padding: "64px 0px" }}>
                                        <div className='mb-4'>
                                            <h4 className='fw-bold'>กำหนดการส่งบทความ</h4>
                                        </div>
                                        <div className='table-responsive'>
                                            <table className='table' style={{ width: '800px' }}>
                                                <thead className='table-secondary'>
                                                    <tr>
                                                        <th>วันที่</th>
                                                        <th>รายละเอียด</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.important_date?.map((items) => (
                                                        <tr key={items._id}>
                                                            <td>{dayjs(items.start_date).format('DD MMM, YYYY')} - {dayjs(items.end_date).format('DD MMM, YYYY')}</td>
                                                            <td>{items.date_name}</td>
                                                            {/* <div className='card border-0 shadow'>
                                                                <div className='card-body'>
                                                                    <div className='row g-3'>
                                                                        <div className='col-12 col-md-4 border-end border-3 border-primary'>
                                                                            <h6 className='fw-bold'>{items.date_name}</h6>
                                                                        </div>

                                                                        <div className='col-12 col-md-8'>
                                                                            {dayjs(items.start_date).format('DD MMM YYYY')} ถึง {dayjs(items.end_date).format('DD MMM YYYY')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> */}

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>


                                    {data.schedule &&
                                        <section id='6' style={{ padding: '64px 0px' }}>

                                            <div className='mb-4'>
                                                <h4 className='fw-bold'>กำหนดการงานประชุม</h4>
                                            </div>
                                            <div className='table-responsive'>
                                                <table className='table' style={{ width: "800px" }}>
                                                    <thead className='table-secondary'>
                                                        <tr>
                                                            <th style={{ width: '128px' }}>เวลา <small className=' d-block text-muted'>(24-hour clock)</small></th>
                                                            <th>รายละเอียด</th>
                                                            <th style={{ width: '260px' }}>กรรมการ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.schedule.map(items => (
                                                            <tr key={items._id}>
                                                                <td>{items.start} - {items.end}</td>
                                                                <td>
                                                                    {items.items?.map((p, index) => (
                                                                        <p key={index}>{p}</p>
                                                                    ))}
                                                                </td>
                                                                <th>
                                                                    <ol>
                                                                        {items.session?.map((s, index) => (
                                                                            <li key={index} className='mb-0'>{s}</li>
                                                                        ))}
                                                                    </ol>
                                                                </th>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                    }


                                    {data.publication &&
                                        <section id='7' style={{ padding: "64px 0px" }}>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold'>วารสาร</h4>
                                            </div>
                                            <div className='list-group'>
                                                {data.publication?.map((items) => (
                                                    <div className='list-group-item list-group-item-secondary' key={items._id}>
                                                        <div>
                                                            <h5>{items.en_name}</h5>
                                                            <small>{items.th_name}</small>
                                                        </div>
                                                        <p className='text-muted'>{items.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    }

                                    {inv &&
                                        <section id='8' style={{ padding: "64px 0px" }}>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold mb-3'>พิธีกรประจำงานประชุม</h4>
                                            </div>
                                            <div className='row g-3'>
                                                {inv?.map((items) => (
                                                    <div className='col-12 col-lg-4' key={items._id}>
                                                        <Card>
                                                            <Card.Img variant="top" src={Logo} />
                                                            <Card.Body>
                                                                <Card.Title>{items.name}</Card.Title>
                                                                <Card.Subtitle className='mb-3 text-muted'>{items.keynote}</Card.Subtitle>
                                                                <Card.Text>
                                                                    {items.desc}
                                                                </Card.Text>
                                                                {items.cv &&
                                                                    <Link to={`${api}/uploads/${items.cv}`} target='_blank' rel='noreferrer'>{items.cv}</Link>
                                                                }
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    }

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            }
        </div>
    )
}

export default Confr