import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PaperStatus, { PaperResult } from '../components/PaperStatus'
import { Link, useNavigate } from 'react-router-dom'
import useSearch from '../hook/useSearch'
import { UserDropdown } from '../components/UserDropdown'
import { toast } from 'react-toastify'
import SearchItemNotFound from '../components/SearchItemNotFound'

// react-bootstrap
import {
  Offcanvas,
  Breadcrumb
} from 'react-bootstrap'

// date and time
import dayjs from 'dayjs'
import ConfirmDialog from '../components/ConfirmDialog'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'

function Host() {

  const [data, setData] = useState({})
  const [Paper, setPaper] = useState([])
  const [NotificationData, setNotificationData] = useState([])
  const [Unread, setUnread] = useState([])
  const [Cate, setCate] = useState([])
  const [loading, setLoading] = useState('idle')
  const id = sessionStorage.getItem('host_confr')
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

  const searchPaper = useSearch('/api/paper/host/search/' + id)

  useEffect(() => {
    setLoading('loading')
    const fetchData = async () => {
      try {
        const confr = await axios.get('/api/conference/host/' + id)
        const paper = await axios.get('/api/paper/confr/' + id)
        const cate = await axios.get('/api/category/' + id)
        setData(confr.data)
        setPaper(paper.data)
        setCate(cate.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading('success')
      }
    }
    const fethNotification = async () => {
      try {
        const res = await axios.get('/api/notification/confr/' + id)
        setNotificationData(res.data)
        let unread = res.data.filter(items => items.status === false)
        setUnread(unread)
      } catch (error) {
        console.log(error)
      }
    }
    const checkRole = async () => {
      try {
        await axios.get('/api/user/protected')
        setIsAdmin(true)
      } catch (error) {
        setIsAdmin(false)
      }
    }
    checkRole()
    fetchData()
    fethNotification()
  }, [id])

  // show notification of conference
  const [showConfrNotification, setShowConfrNotification] = useState(false)

  const handleShowCanvas = async () => {
    if (Unread.length > 0) {
      try {
        await axios.patch('/api/notification/read', {
          user_id: id
        })
        setUnread([])
      } catch (error) {
        console.log(error)
      }
    }
    setShowConfrNotification(true)
  }
  const handleCloseCanvas = () => setShowConfrNotification(false)

  // notification date/time
  const [endDate] = useState(dayjs())
  const timeAgoH = (startDate) => {
    const diffH = endDate.diff(startDate, 'hour')
    return diffH
  }

  // confirm modal
  const [showStats, setShowStatus] = useState(false)
  const [statusId, setStatusId] = useState(null)

  const handleShowStatus = (value) => {
    setStatusId(value)
    setShowStatus(true)
  }

  const handleCloseStatus = () => {
    setStatusId(null)
    setShowStatus(false)
  }

  const openConfr = async (value) => {
    try {
      const update = await axios.patch('/api/conference', {
        _id: id,
        status: value
      })
      if (value === true) {
        toast.success('เปิดงานประชุมแล้ว')
      } else {
        toast.success('ปิดงานประชุมแล้ว')
      }
      setData(update.data)
    } catch (error) {
      console.log(error)
      toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง")
    } finally {
      handleCloseStatus()
    }
  }

  // confirm elete modal
  const [showDelete, setShowDelete] = useState(false)


  const handleDelete = async () => {
    if (data.status === true) {
      setShowDelete(false)
      toast.warning('กรุณาปิดงานประชุมก่อนทำการลบ')
      return
    }
    try {
      await axios.delete('/api/conference/delete/' + data._id)
      toast.success(`ลบงานประชุม ${data._id} แล้ว`)
      navigate('/setting')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
    } finally {
      setShowDelete(false)
    }
  }

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  if (!id) {
    return <SearchItemNotFound />
  }

  return (
    <div className="bg-light">
      <Offcanvas placement='end' show={showConfrNotification} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>แจ้งเตือนสำหรับงานประชุม</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {NotificationData.length > 0 ? (
            <div className="row g-3">
              {NotificationData.map((items) => (
                <div key={items._id} className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{items.title}</h5>
                      <p className="card-text">{items.message}</p>
                      <p className="card-text">
                        <small className="text-muted">อัพเดทล่าสุดเมื่อ {timeAgoH(items.createdAt)} ชั่วโมงที่แล้ว </small>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              ไม่มีการแจ้งเตือนในขณะนี้
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <ConfirmDialog
        show={showStats}
        handleClose={handleCloseStatus}
        header='ยืนยันการเปลี่ยนสถานะงานประชุม ?'
        text='ต้องการเปลี่ยนสถานะงานประชุมหรือไม่'
        handleSubmit={() => openConfr(statusId)}
      />
      <ConfirmDeleteDialog
        header='ยืนยันการลบงานประชุมนี้หรือไม่ ?'
        message='หากมีบทความอยู่ระหว่างการพิจารณาจะไม่สามารถ ลบงานประชุมได้'
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
        show={showDelete}
      />
      <section className='container py-3' style={{ minHeight: '100vh' }}>
        {isAdmin &&
          <Breadcrumb>
            <Breadcrumb.Item href="/admin/conference">Admin dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active href="">
              แก้ไขรายละเอียดงานประชุม
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        <div className='card mb-3'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='fw-bold card-title'>
                รายละเอียดงานประชุม
              </h4>
              <div className="d-flex align-items-center">
                <button
                  type='button'
                  onClick={handleShowCanvas}
                  className="position-relative me-3 btn btn-light">
                  <i className="bi bi-bell fs-3"></i>
                  {Unread.length > 0 &&
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {Unread.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  }
                </button>
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <div className='row g-3'>
              <div className='col-12'>
                <h1>{data?.title}</h1>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={data?.status}
                    onChange={e => handleShowStatus(e.target.checked)}
                    disabled={data.publication.length <= 0 || Cate.length <= 0}
                  />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{data?.status ? 'เปิด' : 'ปิด'}</label>
                </div>
              </div>
              <div className='col-12'>
                <div className='btn-group'>
                  <Link className='btn btn-outline-primary' to='/host/edit'>
                    <i className='bi bi-pencil-square me-2'></i>
                    แก้ไขงานประชุม
                  </Link>
                  <Link className='btn btn-outline-dark' to={`/confr/${id}`}>
                    <i className='bi bi-eye me-2'></i>
                    ดูงานประชุม
                  </Link>
                  {Paper.length <= 0 &&
                    <button type='button' onClick={() => setShowDelete(true)} className='btn btn-danger'>
                      <i className='bi bi-trash me-2'></i>
                      ลบงานประชุม
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='my-3'>
          <div className='row g-3'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <small className='card-title'>มอบหมายแล้ว</small>
                  <h3>{Paper?.filter((items) => items.status === 'REVIEW').length} บทความ</h3>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <small className="card-title">ยังไม่ได้มอบหมาย</small>
                  <h3>{Paper?.filter((items) => items.status === 'PENDING').length} บทความ</h3>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <small className='card-title'>บทความทั้งหมด</small>
                  <h3>{Paper?.length} บทความ</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card my-3'>
          <div className='card-body'>
            <div className='row align-items-center gy-3 mb-4'>
              <h4 className='col-12 col-md-8 mb-0'>รายการบทความ</h4>
              <form onSubmit={searchPaper.handleSearchChange} className='col-12 col-md-4'>
                <div className="input-group">
                  <input name='search' type="text" className="form-control" placeholder="ค้นหา" />
                  <button type='submit' className="input-group-text btn btn-primary text-white" id="basic-addon2">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
            {searchPaper.status === 'idle' || searchPaper.status === 'loading' ? (
              <div>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className='table-responsive' style={{ minHeight: "328px" }}>
                <table className='table table-hover' style={{ minWidth: "1260px" }}>
                  <thead>
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        ชื่อ
                      </th>
                      <th>
                        รหัส
                      </th>
                      <th>
                        สถานะ
                      </th>
                      <th>
                        ผลลัพธ์
                      </th>
                      <th>
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchPaper.data?.map((items, index) => (
                      <tr key={items._id}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          {items.title}
                        </td>
                        <td>
                          {items.paper_code}
                        </td>
                        <td>
                          <PaperStatus status={items.status} />
                        </td>
                        <td>
                          <PaperResult status={items.result} />
                        </td>
                        <td>
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <Link to={`/host/paper/${items._id}`} type="button" className="btn btn-dark">
                              <i className="bi bi-pen"></i>
                            </Link>
                            <Link to={`/host/assign/${items._id}/${items.cate_code}`} type="button" className="btn btn-dark">
                              <i className="bi bi-people"></i>
                            </Link>
                          </div>
                          {/* <Link to={`/host/paper/${items._id}`} type='button' className='btn btn-primary me-2'>
                            <i className='bi bi-pen'></i>
                          </Link>
                          <Link to={`/host/assign/${items._id}/${items.cate_code}`} type='button' className='btn btn-outline-dark'>
                            <i className='bi bi-people'></i>
                          </Link> */}
                          {/* <Dropdown>
                            <Dropdown.Toggle className='' variant="primary" id="dropdown-basic">
                              เพิ่มเติม
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => navigate(`/host/paper/${items._id}`)}>
                                <span className='me-2'><i className='bi bi-eye'></i></span>
                                ดูรายละเอียด
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => navigate(`/host/assign/${items._id}/${items.cate_code}`)}>
                                <span className='me-2'><i className='bi bi-pen'></i></span>
                                มอบหมายบทความ
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className='d-flex justify-content-between align-items-center'>
              <span>{`Page ${searchPaper.page} of ${searchPaper.totalPages}`}</span>
              <div>
                <button onClick={searchPaper.handlePreviousPage} disabled={searchPaper.page === 1} className='btn btn-link'>
                  <i className='bi bi-arrow-left'></i> ก่อนหน้า
                </button>
                <button onClick={searchPaper.handleNextPage} disabled={searchPaper.page + 1 >= searchPaper.totalPages} className='btn btn-link'>
                  ถัดไป <i className='bi bi-arrow-right'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Host