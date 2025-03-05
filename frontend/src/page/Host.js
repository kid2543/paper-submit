import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PaperStatus, { PaperResult } from '../components/PaperStatus'
import { Link, useNavigate } from 'react-router-dom'
import useSearch from '../hook/useSearch'
import { toast } from 'react-toastify'
import SearchItemNotFound from '../components/SearchItemNotFound'

// react-bootstrap
import {
  Offcanvas,
} from 'react-bootstrap'

// date and time
import dayjs from 'dayjs'
import ConfirmDialog from '../components/ConfirmDialog'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog'
import PaginationComponent from '../components/Pagination'

function Host() {

  const [data, setData] = useState({})
  const [Paper, setPaper] = useState([])
  const [NotificationData, setNotificationData] = useState([])
  const [Unread, setUnread] = useState([])
  const [Cate, setCate] = useState([])
  const [loading, setLoading] = useState('idle')
  const id = sessionStorage.getItem('host_confr')
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

    // แจ้งเตือนงานประชุม
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
    if (diffH > 24) {
      const dffD = endDate.diff(startDate, 'day')
      return <span>{dffD} วันที่แล้ว</span>
    }

    return <span>{diffH} ชั่วโมงที่แล้ว</span>
  }

  // delete notification
  const deleteNotification = async () => {
    try {
      await axios.delete('/api/notification', {
        user_id: id
      })
      toast.success('ล้างข้อมูลสำเร็จ', {
        position: 'bottom-left'
      })
      setNotificationData([])
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', {
        position: 'bottom-left'
      })
    }
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
              <div>
                <button type='button' onClick={deleteNotification} className="btn btn-secondary">
                  <i className="bi bi-trash me-2"></i>
                  ลบการแจ้งเตือนทั้งหมด
                </button>
              </div>
              {NotificationData.map((items) => (
                <div key={items._id} className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex">
                        <h5 className="card-title me-2">{items.title}</h5>
                        {items.status === false &&
                          <div>
                            <span className="badge bg-info">ใหม่</span>
                          </div>
                        }
                      </div>
                      <p className="card-text">{items.message}</p>
                      <p className="card-text">
                        <small className="text-muted">อัพเดทล่าสุดเมื่อ {timeAgoH(items.createdAt)}</small>
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
      <section>
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
                    disabled={Cate.length <= 0}
                  />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{data?.status ? 'เปิด' : 'ปิด'}</label>
                </div>

                {Cate.length <= 0 &&
                  <div className='text-warning'>
                    ผู้จัดงานต้องทำการเพิ่มหัวข้องานประชุมอย่างน้อย 1 หัวข้อจึงจะสามารถเปิดงานประชุมได้
                  </div>
                }
              </div>
              <div className='col-12'>
                <div className='d-flex'>
                  <Link className='btn btn-primary me-2' to='/host/edit'>
                    <i className='bi bi-pencil-square me-2'></i>
                    แก้ไขงานประชุม
                  </Link>
                  <Link className='btn btn-outline-primary me-2' to={`/confr/${id}`}>
                    <i className='bi bi-eye me-2'></i>
                    ดูงานประชุม
                  </Link>
                  {Paper.length <= 0 && data?.status === false &&
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
              <div className='col-lg-8'>
                <h4 className=''>รายการบทความ</h4>
                <div className='text-muted'>
                  แสดงรายการบทความเพื่อใช้ในการตรวจสอบความถูกต้อง แก้ไขและ มอบหมายให้กรรมการตรวจบทความ
                </div>
              </div>
              <form onSubmit={searchPaper.handleSearchChange} className='col-md-4'>
                <div className="input-group">
                  <input name='search' type="text" className="form-control" placeholder="ค้นหาจากชื่อบทความ" />
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
              <div className='table-responsive' style={{ minHeight: 400 }}>
                <table className='table table-hover' style={{ minWidth: 1000 }}>
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
                        หัวข้อ
                      </th>
                      <th>
                        สถานะ
                      </th>
                      <th>
                        ผลลัพธ์
                      </th>
                      <th>
                        เครื่องมือ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchPaper.data?.length > 0 ? (
                      <>
                        {searchPaper.data?.map((items, index) => (
                          <tr key={items._id}>
                            <td>
                              {(searchPaper.page - 1) * 10 + (index + 1)}
                            </td>
                            <td>
                              {items.title}
                            </td>
                            <td>
                              {items.paper_code}
                            </td>
                            <td>
                              {items.cate_code?.name}
                            </td>
                            <td>
                              <PaperStatus status={items.status} />
                            </td>
                            <td>
                              <PaperResult status={items.result} />
                            </td>
                            <td>
                              <div className="btn-group">
                                <Link to={`/host/paper/${items._id}`} type="button" className="btn btn-light">
                                  <i className="bi bi-pencil-square"></i>
                                </Link>
                                <Link to={`/host/assign/${items._id}/${items.cate_code?._id}`} type="button" className="btn btn-light">
                                  <i className="bi bi-people"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={7} className='text-center p-3'>ไม่พบข้อมูล</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <PaginationComponent
              currentPage={searchPaper.page}
              onFirstPage={searchPaper.handleFirstPage}
              onLastPage={searchPaper.handleLastPage}
              onPageNext={searchPaper.handleNextPage}
              onPagePrev={searchPaper.handlePreviousPage}
              onSelectPage={searchPaper.handleNumberPage}
              totalPages={searchPaper.totalPages}
            />
          </div>
        </div>
      </section >
      <section>
        <div className='card my-3'>
          <div className='card-body'>
            <h4 className='card-title'>ดูรายชื่อผู้ลงทะเบียน</h4>
            <div className='text-muted mb-3'>
              เมื่อผู้ส่งบทความชำระเงินและมอบหลักฐานการชำระเงินให้ผู้จัดงานตรวจสอบความถูกต้องแล้วจะมีรายชื่อผู้เข้าร่วมงานประชุมปรากฏในหน้าด้านล่างนี้
            </div>
            <Link to={`/host/confr/registrant`} className='btn btn-primary'>
              <i className='bi bi-eye me-2'></i>
              ดูรายชื่อ
            </Link>
          </div>
        </div>
      </section>
    </div >
  )
}

export default Host