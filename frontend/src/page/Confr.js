import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'

// asset
import Logo from '../asset/logo.png'

// react bootstrap
import {
    Tooltip,
    OverlayTrigger,
    Card,
    Accordion,
} from 'react-bootstrap'
import UnAuthorized from './UnAuthorized'

function Confr() {

    const [data, setData] = useState({})
    const [pub, setPub] = useState([])
    const [topic, setTopic] = useState([])
    const [inv, setInv] = useState([])
    const [partner, setPartner] = useState([])
    const [err, setErr] = useState('')
    const [isOpen, setIsOpen] = useState(true)

    const { id } = useParams()
    const host_confr = sessionStorage.getItem('host_confr')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/conference/single/' + id)
                setData(res.data)
                if (res.data.status === false && host_confr !== id) {
                    setIsOpen(false)
                }
                const Pub = await axios.get('/api/publication/confr/' + id)
                setPub(Pub.data)
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
    }, [id, host_confr])

    const handleSendPaper = (confr_id) => {
        sessionStorage.setItem('send_paper', confr_id)
        navigate('/submit')
    }

    if (!isOpen) {
        return <UnAuthorized />
    }


    return (
        <div>
            {err}
            {data &&
                <div className='bg-light bg-gradient'>
                    <section id='1' className='container' style={{ padding: "180px 0px" }}>
                        <div className='text-center'>
                            {data.logo &&
                                <div className="mb-5">
                                    <img src={'/uploads/' + data.logo} alt={data.title} width={200} />
                                </div>
                            }
                            <h1 className='display-1 fw-bold'>{data.title}</h1>
                            <h5 className='text-muted'>{data.sub_title}</h5>
                            <p className="text-muted fw-bold">
                                รหัสงานประชุม <br/>
                                {data.confr_code}
                            </p>
                            {dayjs(Date.now()).format('DD MMM YYYY') > dayjs(data.confr_end_date).format('DD MMM YYYY') && data.confr_end_date &&
                                <div className='text-warning'>
                                    กรุณาตรวจสอบกำหนดการ
                                </div>
                            }
                            {topic && dayjs(Date.now()).format('DD MMM YYYY') <= dayjs(data.confr_end_date).format('DD MMM YYYY') &&
                                <div>
                                    <button className='btn btn-primary' onClick={() => handleSendPaper(id)}>
                                        <i className="bi bi-send me-2"></i>
                                        ส่งบทความเลย!
                                    </button>

                                    <div className="text-info fw-bold mt-3">
                                        ส่งได้ถึงวันที่ {dayjs(data.confr_end_date).format('DD MMM YYYY')}
                                    </div>
                                </div>
                            }
                        </div>
                    </section>
                    {partner?.length > 0 &&
                        <section className="text-bg-secondary">
                            <div id='2' className='container' style={{ padding: "128px 0px" }}>
                                <div className='text-center'>
                                    <h4 className='fw-bold mb-3'>รายชื่อผู้สนับสนุน</h4>
                                </div>
                                <div className='row g-3'>
                                    {partner?.map((items) => (
                                        <div className='col-auto' key={items._id}>
                                            <TriggerExample name={items.desc}>
                                                <img src={`/uploads/${items.image}`} alt={items.desc} height={128} />
                                            </TriggerExample>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    }
                    <div className='bg-white' style={{ padding: '180px 0px 64px 0px' }}>
                        <section id='3' className='container'>
                            <div className='row gy-5'>
                                <div className='col-12 col-md-4'>
                                    <div className='sticky-top' style={{ top: "180px" }}>
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
                                                    <a className='text-secondary' href='#8'>วิทยากร</a>
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
                                        {data.important_date?.length > 0 ? (
                                            <div className="card" >
                                                <div className="card-body">
                                                    <div className='table-responsive'>
                                                        <table className='table' style={{ width: '800px' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>วันที่</th>
                                                                    <th>รายละเอียด</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.important_date?.map((items) => (
                                                                    <tr key={items._id}>
                                                                        <td>{dayjs(items.start_date).format('DD MMM YYYY')} {items.end_date &&
                                                                            <>
                                                                                - {dayjs(items.end_date).format('DD MMM YYYY')}
                                                                            </>
                                                                        }
                                                                        </td>
                                                                        <td>{items.date_name}</td>
                                                                        {/* <div className='card  shadow'>
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
                                                </div>
                                            </div>
                                        ) : <p>ยังไม่มีกำหนดการส่งบทความ</p>}

                                    </section>

                                    {data.schedule &&
                                        <section id='6' style={{ padding: '64px 0px' }}>
                                            <div className="mb-4">
                                                <h4 className="fw-bold">กำหนดการงานประชุม</h4>
                                            </div>
                                            <div>
                                                <Link
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    to={`/uploads/${data.schedule}`}
                                                    className="btn btn-primary">ดูกำหนดการงานประชุมได้ที่นี่</Link>
                                            </div>
                                        </section>
                                    }

                                    {pub.length > 0 &&
                                        <section id='7' style={{ padding: "64px 0px" }}>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold'>วารสาร</h4>
                                            </div>
                                            <div className='list-group'>
                                                {pub.map((items) => (
                                                    <div className='list-group-item' key={items._id}>
                                                        <div className="mb-3">
                                                            <h6 className="fw-bold">{items.en_name} / {items.th_name}</h6>
                                                        </div>
                                                        <p className="text-dark">
                                                            <span className="ms-4">
                                                                {items.desc}
                                                            </span>
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    }

                                    {inv.length > 0 &&
                                        <section id='8' style={{ padding: "64px 0px" }}>
                                            <div className='mb-4'>
                                                <h4 className='fw-bold mb-3'>วิทยากรประจำงานประชุม</h4>
                                            </div>
                                            <div className='row row-cols-1 row-cols-lg-2 g-3'>
                                                {inv?.map((items) => (
                                                    <div className='col' key={items._id}>
                                                        <Card className="h-100">
                                                            {items.img ? (
                                                                <Card.Img variant="top" src={`/uploads/${items.img}`} alt={items.name} style={{ height: '30rem', objectFit: 'cover' }} />
                                                            ) : (
                                                                <Card.Img variant="top" src={Logo} alt={items.name} />
                                                            )}
                                                            <Card.Body>
                                                                <Card.Title>{items.name}</Card.Title>
                                                                <Card.Subtitle className='mb-3 text-muted'>{items.keynote}</Card.Subtitle>
                                                                <Card.Text>
                                                                    {items.desc}
                                                                </Card.Text>
                                                                {items.cv &&
                                                                    <p>CV:
                                                                        <Link
                                                                            to={`/uploads/${items.cv}`}
                                                                            target='_blank'
                                                                            rel='noreferrer'
                                                                            className='ms-2'
                                                                        >
                                                                            {items.cv}
                                                                        </Link>
                                                                    </p>
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

function TriggerExample({ children, name }) {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {name}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="auto"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {children}
        </OverlayTrigger>
    );
}