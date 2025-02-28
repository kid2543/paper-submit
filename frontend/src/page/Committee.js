import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import Dropdown from 'react-bootstrap/Dropdown'
import { PaperResult } from '../components/PaperStatus'

import dayjs from 'dayjs'


// react-bootstrap
import {
    Modal,
    Button,
    Tab,
    Tabs
} from 'react-bootstrap'
import axios from 'axios'
import CommitteeNavbar from '../components/CommitteeNavbar'
import useFetch from '../hook/useFetch'

function Committee() {
    const { data, status, error } = useFetch('/api/assign/reviewer/paper')
    console.log(data)
    const navigate = useNavigate()

    // view history data
    const [show, setShow] = useState(false)
    const [historyData, setHistoryData] = useState({
        id: "",
        paper_code: ""
    })

    const handleClose = () => {
        setHistoryData({
            id: "",
            paper_code: ""
        })
        setShow(false)
    }
    const handleShow = (id, paper_code) => {
        setHistoryData({
            id,
            paper_code
        })
        setShow(true)
    }

    const reviewStatus = (status) => {
        switch (status) {
            case "PENDING": return <span className="badge rounded-pill bg-primary">รอการพิจารณา</span>
            case "SUCCESS": return <span className="badge rounded-pill bg-success">พิจารณาแล้ว</span>
            case "CANCEL": return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
            default: return <span className="badge rounded-pill bg-secondary">ไม่ระบุ</span>
        }
    }

    const handleReviewStatus = (status, id, confr_id) => {
        sessionStorage.setItem('confr_id', confr_id)
        switch (status) {
            case "PENDING": return <Dropdown.Item onClick={() => navigate("/committee/review/" + id)}><i className="bi bi-pen me-2"></i>ให้คะแนน</Dropdown.Item>
            case "SUCCESS": return <Dropdown.Item onClick={() => navigate("/committee/review/result/" + id)}><i className="bi bi-eye me-2"></i>ดูการให้คะแนน</Dropdown.Item>
            case "CANCEL": return "-"
            default: return "ไม่ระบุ"
        }
    }

    if (status === 'idle' || status === 'loading') {
        return (
            <LoadingPage />
        )
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <CommitteeNavbar />
            <section className='container py-5'>
                <Tabs
                    defaultActiveKey="1"
                    className="mb-3"
                >
                    <Tab eventKey="1" title={<span className='text-warning'>รอการพิจารณา</span>}>
                        <div className='row row-cols-1 g-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className='card-title'>
                                        รายการบทความรอการพิจารณา
                                    </h4>
                                </div>
                            </div>
                            <div className='card  shadow-sm'>
                                <div className='card-body'>
                                    <section>
                                        <div className='mb-5'>
                                            {data ? (
                                                <div>
                                                    <div className='table-responsive' style={{ minHeight: "500px" }}>
                                                        <table className='table table-striped'>
                                                            <thead className='fw-bold'>
                                                                <tr>
                                                                    <th>รหัส</th>
                                                                    <th>ชื่อ</th>
                                                                    <th>สถานะ</th>
                                                                    <th>ผลลัพธ์</th>
                                                                    <th>เครื่องมือ</th>
                                                                </tr>
                                                            </thead>
                                                            {data?.filter(item => item.status === 'PENDING').length > 0 ? (
                                                                <tbody>
                                                                    {data?.filter(item => item.status === 'PENDING').map((paperList) => (
                                                                        <tr key={paperList._id}>
                                                                            <td>{paperList.paper_id.paper_code}</td>
                                                                            <td>{paperList.paper_id.title}</td>
                                                                            <td>
                                                                                {reviewStatus(paperList.status)}
                                                                            </td>
                                                                            <td>
                                                                                <PaperResult status={paperList.result} />
                                                                            </td>
                                                                            <td>
                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu>
                                                                                        {handleReviewStatus(paperList.status, paperList._id, paperList.paper_id.confr_code)}
                                                                                        <Dropdown.Item onClick={() => handleShow(paperList._id, paperList.paper_id.paper_code)} ><i className="bi bi-clock-history me-2"></i>ดูประวัติ</Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>

                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            ) : (
                                                                <tbody>
                                                                    <tr>
                                                                        <td className='p-3 text-center' colSpan={5}>ไม่พบข้อมูลการตรวจบทความ</td>
                                                                    </tr>
                                                                </tbody>
                                                            )}
                                                        </table>
                                                        <ViewHistory
                                                            data={historyData}
                                                            handleClose={handleClose}
                                                            show={show}
                                                        />
                                                    </div>
                                                </div>
                                            ) : "ไม่พบรายการที่ต้องตรวจ"}

                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="2" title={<span className='text-success'>พิจารณาแล้ว</span>}>
                        <div className='row row-cols-1 g-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h4 className='card-title'>
                                        รายการบทความที่พิจารณาแล้ว
                                    </h4>
                                </div>
                            </div>
                            <div className='card'>
                                <div className='card-body'>
                                    <table className='table table-striped'>
                                        <thead>
                                            <tr>
                                                <th>รหัส</th>
                                                <th>ชื่อ</th>
                                                <th>สถานะ</th>
                                                <th>ผลลัพธ์</th>
                                                <th>เครื่องมือ</th>
                                            </tr>
                                        </thead>
                                        {data?.filter(items => items.status !== 'PENDING').length > 0 ? (
                                            <tbody>
                                                {data?.filter(items => items.status !== 'PENDING').map(papers => (
                                                    <tr key={papers._id}>
                                                        <td>{papers.paper_id?.paper_code}</td>
                                                        <td>{papers.paper_id?.title}</td>
                                                        <td>
                                                            {reviewStatus(papers.status)}
                                                        </td>
                                                        <td>
                                                            <PaperResult status={papers.result} />
                                                        </td>
                                                        <td>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    {handleReviewStatus(papers.status, papers._id, papers.paper_id?.confr_code)}
                                                                    <Dropdown.Item onClick={() => handleShow(papers._id, papers.paper_id?.paper_code)} ><i className="bi bi-clock-history me-2"></i>ดูประวัติ</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                <tr>
                                                    <td className='p-3 text-center' colSpan={5}>ไม่พบข้อมูล</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </section>

        </div>
    )
}

export default Committee

function ViewHistory(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fethHistory = async () => {
            try {
                const res = await axios.get('/api/history/read/' + props.data.id)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (props.data.id !== "") {
            fethHistory()
        }
    }, [props.data])

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ประวัติการตรวจ {props.data.paper_code}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data.length > 0 ? (
                    <div>
                        {data.map((items) => (
                            <div key={items._id} className='card mb-3'>
                                <div className='card-body row'>
                                    <div className='col-12 col-md-4'>
                                        <PaperResult status={items.result} />
                                        <div>
                                            <small>
                                                {dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}
                                            </small>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-8'>
                                        <p>{items.suggestion}</p>
                                        {items.suggestion_file &&
                                            <div>
                                                <Link className='text-decoration-none' to={`/uploads/${items.suggestion_file}`}>File ข้อแนะนำ</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className="text-center">ไม่พบข้อมูล</div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    ปิด
                </Button>
            </Modal.Footer>
        </Modal>
    )
}