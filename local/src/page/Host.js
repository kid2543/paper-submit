import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import PaymentStatus from '../components/PaymentStatus';
import PaperStatus from '../components/PaperStatus';
import PaperResult from '../components/PaperResult';
import checkIcon from '../asset/check.png'
import fileIcon from '../asset/file.png'
import clockIcon from '../asset/wall-clock.png'
import NotificationCard from '../components/NotificationCard';
import LoadingPage from '../components/LoadingPage';

const api = process.env.REACT_APP_API_URL

function Host() {

  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const [confrStart, setConfrStart] = useState(new Date())
  const [confrEnd, setConfrEnd] = useState(new Date())
  const [paperData, setPaperData] = useState([])
  const [statusConfr, setStatusConfr] = useState(false)
  const [paperFilter, setPaperFilter] = useState([])
  const [cateNumber, setCateNumber] = useState(0)
  const [pubNumber, setPubNumber] = useState(0)
  const [id, setId] = useState("")
  const [showNoti, setShowNoti] = useState(false)
  const [notiData, setNotiData] = useState([])
  const [remarkNoti, setRemarkNoti] = useState(false)
  const [loading ,setLoading] = useState(true)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleShowNoti = async () => {
    try {
      await axios.patch(api + "/update/notification/status/" + id)
    } catch (error) {
      console.log(error)
    } finally {
      setShowNoti(true)
    }
  }
  const handleCloseNoti = () => setShowNoti(false)

  const handleDeadLine = async (e) => {
    e.preventDefault()
    const input = e.target
    try {
      await axios.patch(api + "/update/conferences/" + id, {
        confr_start_date: input.confr_start_date.value,
        confr_end_date: input.confr_end_date.value,
      })
      alert("Update Success")
      setConfrStart(input.confr_start_date.value)
      setConfrEnd(input.confr_end_date.value)
    } catch (error) {
      console.log(error)
      alert("Error" + error.response.status)
    } finally {
      handleClose()
    }
  }

  const paperIsNotAssign = (item) => {
    const temp = []
    for (let i in item) {
      if (item[i].status === 0) {
        temp.push(item[i])
      }
    }
    return temp
  }

  const paperIsNotApprove = (item) => {
    const temp = []
    for (let i in item) {
      if (item[i].status === 1) {
        temp.push(item[i])
      }
    }
    return temp
  }

  const notApprove = paperIsNotApprove(paperData)
  const notAssign = paperIsNotAssign(paperData)

  const searchPaper = async (e) => {
    e.preventDefault()
    try {
      if (e.target.paper_list.value) {
        const res = await axios.get(api + "/search/paper/" + e.target.paper_list.value + "/" + id)
        console.log(res.data)
        setPaperFilter(res.data)
      } else {
        setPaperFilter(paperData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  //checkbox publication

  const activeConfrStatus = async () => {
    try {
      await axios.patch(api + "/update/conferences/" + id, {
        status: true
      })
    } catch (error) {
      console.log(error)
    } finally {
      setStatusConfr(true)
    }
  }

  const inActiveConfrStatus = async () => {
    try {
      await axios.patch(api + "/update/conferences/" + id, {
        status: false
      })
    } catch (error) {
      console.log(error)
    } finally {
      setStatusConfr(false)
    }
  }

  const handleDelNoti = (item_id) => {
    setNotiData(notiData.filter((item) => item._id !== item_id))
  }

  const clearNotification = async () => {
    if (window.confirm("ต้องการลบการแจ้งเตือนทั้งหมดหรือไม่?")) {
      try {
        const res = await axios.delete(api + "/clear/notification/" + id)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {

    const confr_id = sessionStorage.getItem("confr")

    const fethConfr = async () => {
      try {
        const res = await axios.get(api + "/get/confr/" + confr_id)
        setId(res.data._id)
        setConfrStart(res.data.confr_start_date)
        setConfrEnd(res.data.confr_end_date)
        setStatusConfr(res.data.status)
        setPubNumber(res.data.publication.length)
      } catch (error) {
        console.log(error)
      }
    }

    const fethCateNumber = async () => {
      try {
        const res = await axios.get(api + "/get/category/" + confr_id)
        setCateNumber(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    const fethPaper = async () => {
      try {
        const res = await axios.get(api + "/list/all/paper/" + confr_id)
        setPaperData(res.data)
        setPaperFilter(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fethNotification = async () => {
      try {
        const res = await axios.get(api + "/get/notification/" + confr_id)
        setNotiData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fethUnreadNoti = async () => {
      try {
        const res = await axios.get(api + "/get/unread/notification/" + confr_id)
        if (res.data.length > 0) {
          setRemarkNoti(true)
        } else {
          setRemarkNoti(false)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fethConfr()
    fethPaper()
    fethNotification()
    fethCateNumber()
    fethUnreadNoti()

    setTimeout(() => setLoading(false), 1000)
  }, [])

  if(loading) {
    return <LoadingPage />
  }


  return (
    <div className='container p-md-4'>
      {cateNumber < 1 &&
        <div className="alert alert-danger" role="alert">
          เพิ่มหัวข้องานประชุมอย่างน้อย 1 หัวข้อ เนื่องจากผู้ส่งบทความจะไม่สามารถส่งบทความได้ <a href="/host/cate">เพิ่มหัวข้องานประชุม</a>
        </div>
      }
      {pubNumber < 1 &&
        <div className="alert alert-danger" role="alert">
          เพิ่มรายชื่อวารสารอย่างน้อย 1 วารสาร เนื่องจากผู้ส่งบทความจะไม่สามารถส่งวบทความได้ <a href="/host/pub">เพิ่มวารสาร</a>
        </div>
      }
      <div>
        <section className='mb-5'>
          <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleDeadLine}>
              <Modal.Header closeButton>
                <Modal.Title>กำหนด Deadline</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className='mb-3'>
                  <label className='form-label text-muted'>ตั้งแต่</label>
                  <input name='confr_start_date' className='form-control' type='date' required />
                </div>
                <div>
                  <label className='form-label text-muted'>ถึง</label>
                  <input name='confr_end_date' className='form-control' type='date' required />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button type='button' className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type='submit' className="btn btn-primary" >
                  Save Changes
                </button>
              </Modal.Footer>
            </form>
          </Modal>
        </section>
        <section className='mb-5'>
          <div className='d-flex justify-content-between mb-5'>
            <button className='btn btn-primary me-3' type='button' onClick={() => navigate("/host/edit")}>
              <span className='me-2'>
                <ion-icon name="brush"></ion-icon>
              </span>
              <span className='d-none d-md-inline-block'>แก้ไขรายละเอียดงานประชุม</span>
            </button>
            <div className='d-flex align-items-center'>
              {statusConfr ? (
                <button className='btn btn-success me-3' type='button' onClick={inActiveConfrStatus}>ACTIVE</button>
              ) : (
                <button className='btn btn-secondary me-3' type='button' onClick={activeConfrStatus}>INACTIVE</button>
              )}
              <div>
                <button className='btn p-0 position-relative' type='button' onClick={handleShowNoti}>
                  <ion-icon name="notifications-outline"></ion-icon>
                  {remarkNoti ? (
                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          </div>

          <Offcanvas placement='end' show={showNoti} onHide={handleCloseNoti}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>แจ้งเตือน</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              {notiData.length > 0 ? (
                <div>
                  <div className='d-flex justify-content-end'>
                    <button type='button' className='btn btn-sm btn-outline-secondary' onClick={clearNotification}>Clear all</button>
                  </div>
                  <div className='row gy-3'>
                    {notiData?.map((item, index) => (
                      <NotificationCard key={index} header={item.header} desc={item.form} date={item.time} id={item._id} status={item.read_status} handleDelNoti={handleDelNoti} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className='text-muted'>
                  No message at this time
                </div>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </section>
        <section className='row gy-3 mb-5'>
          <div className='col-md-6 col-lg-4'>
            <div className='card h-100 border-0 shadow'>
              <div className='card-body row align-items-center'>
                <div className='col-2 text-center'>
                  <img src={checkIcon} height={32} width={32} alt='check' />
                </div>
                <div className='col'>
                  <p className='card-title text-muted'>
                    จำนวนบทความทั้งหมด
                  </p>
                  <p className='card-text fs-1'>{paperData?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-4'>
            <div className='card h-100 border-0 shadow'>
              <div className='card-body row align-items-center'>
                <div className='col-2 text-center'>
                  <img src={clockIcon} height={32} width={32} alt='clock' />
                </div>
                <div className='col'>
                  <p className='card-title text-muted'>
                    จำนวนบทความที่ยังไม่ได้ assign
                  </p>
                  <p className='card-text fs-1'>{notAssign?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-4'>
            <div className='card h-100 border-0 shadow'>
              <div className='card-body row align-items-center'>
                <div className='col-2 text-center'>
                  <img src={fileIcon} height={32} width={32} alt='file' />
                </div>
                <div className='col'>
                  <p className='card-title text-muted'>
                    จำนวนบทความที่ยังไม่ได้อนุมัติ
                  </p>
                  <p className='card-text fs-1'>{notApprove?.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='mb-5'>
          <div className='col-12 card p-3'>
            <div className='d-flex justify-content-between mb-3'>
              <p className='text-secondary'>Deadline</p>
              <div>
                <button className='btn btn-outline-secondary' type='button' onClick={handleShow}>
                  <span className='me-2'>
                    <ion-icon name="calendar"></ion-icon>
                  </span>
                  กำหนดวันที่
                </button>
              </div>
            </div>
            <div>
              <p>{dayjs(confrStart).format("DD MMM YYYY")} - {dayjs(confrEnd).format("DD MMM YYYY")}</p>
            </div>
          </div>
        </section>
        <section className='mb-5'>
          <div className='mb-3'>
            <h4 className='fw-bold mb-3'>รายการบทความ</h4>
            <form onSubmit={searchPaper} className='col-md-4 mb-3'>
              <div className='input-group'>
                <input className='form-control' name='paper_list' type='search' placeholder='ค้นหาจากชื่อบทความ' />
                <button className='btn btn-outline-secondary btn-sm' type='submit'><ion-icon name="search"></ion-icon></button>
              </div>
            </form>
          </div>
          {paperFilter.length > 0 ? (
            <div>
              <div className='table-responsive'>
                <table className='table table-hover text-nowrap'>
                  <thead className='table-secondary'>
                    <tr>
                      <th>รหัสบทความ</th>
                      <th style={{ width: "200px" }}>ชื่อบทความ</th>
                      <th>หัวข้อ</th>
                      <th>สถานะบทความ</th>
                      <th>ผลลัพธ์</th>
                      <th>สถานะการชำระเงิน</th>
                      <th>บทความที่ถูกปิดชื่อ</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paperFilter?.map((paper) => (
                      <tr key={paper._id}>
                        <td>{paper.paper_code}</td>
                        <td>{paper.title}</td>
                        <td>{paper.cate_code?.name}</td>
                        <td className='text-center'><PaperStatus status={paper.status} /></td>
                        <td className='text-center'><PaperResult status={paper.result} /></td>
                        <td className='text-center'><PaymentStatus status={paper.payment_status} /></td>
                        <td className='text-center'>
                          {paper.close_name_file ? (
                            <a target='_blank' rel='noreferrer' href={api + "/pdf/" + paper.close_name_file}>File</a>
                          ):(
                            <div className='badge bg-warning'>
                              ไม่พบข้อมูล
                            </div>
                          )}
                        </td>
                        <td>
                          <div>
                            <a href={"/host/assign/" + paper._id} className='text-secondary text-decoration-none me-2' >
                              <span className='me-2'><ion-icon name="document-text"></ion-icon></span>
                              Assign
                            </a>
                            <a href={"/host/over-all/" + paper._id} className='text-decoration-none text-success' type='button'>
                              <span className='me-2'><ion-icon name="checkmark-done"></ion-icon></span>
                              Approve
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : "ไม่พบรายการบทความ"}

        </section>
      </div>
    </div>
  )
}

export default Host

