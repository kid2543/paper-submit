import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import Dropdown from 'react-bootstrap/Dropdown'
import useSearch from '../hook/useSearch'
import { PaperResult } from '../components/PaperStatus'

import dayjs from 'dayjs'


// react-bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { UserDropdown } from '../components/UserDropdown'

const api = process.env.REACT_APP_API_URL

function Committee() {

    const { data, status, error } = useSearch('/api/assign/reviewer/paper')
    const navigate = useNavigate()

    // view history data
    const [show, setShow] = useState(false)
    const [historyData, setHistoryData] = useState({
        id: "",
        paper_name: ""
    })

    const handleClose = () => {
        setHistoryData({
            id: "",
            paper_name: ""
        })
        setShow(false)
    }
    const handleShow = (id, paper_name) => {
        setHistoryData({
            id: id,
            paper_name: paper_name
        })
        setShow(true)
    }

    const reviewStatus = (status) => {
        switch (status) {
            case "PENDING": return <span className="badge rounded-pill bg-primary">รอดำเนินการ</span>
            case "SUCCESS": return <span className="badge rounded-pill bg-success">ตรวจแล้ว</span>
            case "CANCEL": return <span className="badge rounded-pill bg-danger">ยกเลิก</span>
            default: return <span className="badge rounded-pill bg-secondary">ไม่ระบุ</span>
        }
    }

    const handleReviewStatus = (status, id, confr_id) => {
        sessionStorage.setItem('confr_id', confr_id)
        switch (status) {
            case "PENDING": return <Dropdown.Item onClick={() => navigate("/committee/review/" + id)}><span className='me-2'><ion-icon name="shield-checkmark-outline"></ion-icon></span>ให้คะแนน</Dropdown.Item>
            case "SUCCESS": return <Dropdown.Item onClick={() => navigate("/committee/review/result/" + id)}><span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>ดูการให้คะแนน</Dropdown.Item>
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
        <div className='container py-5'>
            <div className='card  shadow-sm mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className='fw-bold mb-0'>
                            รายการบทความ
                        </h4>
                        <UserDropdown />
                    </div>
                </div>
            </div>
            <div className='card  shadow-sm'>
                <div className='card-body'>
                    <section>
                        <div className='mb-5'>
                            {data ? (
                                <div>
                                    <div className='table-responsive' style={{ minHeight: "500px" }}>
                                        <table className='table table-hover'>
                                            <thead className='fw-bold'>
                                                <tr>
                                                    <th>รหัสบทความ</th>
                                                    <th>ชื่อบทความ</th>
                                                    <th>สถานะ</th>
                                                    <th>ผลลัพธ์</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((paperList) => (
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
                                                                <Dropdown.Toggle variant="btn" id="dropdown-basic">
                                                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    {handleReviewStatus(paperList.status, paperList._id, paperList.paper_id.confr_code)}
                                                                    <Dropdown.Item onClick={() => handleShow(paperList._id, paperList.paper_id.title)} ><span className='me-2'><i className="bi bi-clock-history"></i></span>ดูประวัติ</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>

                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <ViewHistory data={historyData} handleClose={handleClose} show={show} />
                                    </div>
                                </div>
                            ) : "ไม่พบรายการที่ต้องตรวจ"}

                        </div>
                    </section>
                </div>
            </div>
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
                <Modal.Title>บทความ: {props.data.paper_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data &&
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
                                                <Link className='text-decoration-none' to={`${api}/uploads/${items.suggestion_file}`}>File ข้อแนะนำ</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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