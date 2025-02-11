import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PaperStatus, { PaperResult, ReviewStatus } from '../components/PaperStatus';

// react bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PaymentStatus from '../components/PaymentStatus';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { UserDropdown } from '../components/UserDropdown';

const api = process.env.REACT_APP_API_URL

function HostReview() {

  const { id } = useParams()
  const [paper, setPaper] = useState({})
  const [review, setReview] = useState([])
  const [result, setResult] = useState('')

  // จดหมายเชิญ
  const [sendMailFile, setSendMailFile] = useState(null)

  // ใบประกาศ
  const [CertiFile, setCertiFile] = useState(null)

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get('/api/paper/host/' + id)
        setPaper(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchReview = async () => {
      try {
        const res = await axios.get('/api/assign/' + id)
        setReview(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPaper()
    fetchReview()
  }, [id])

  // handle history

  const [show, setShow] = useState(false);
  const [history, setHistory] = useState({
    id: '',
    reviewer: ''
  })

  const handleClose = () => {
    setHistory({ id: '', reviewer: '' })
    setShow(false)
  }

  const handleShow = (id, reviewer) => {
    setHistory({ id, reviewer })
    setShow(true)

  };

  // end history

  const handleResult = async (e) => {
    e.preventDefault()
    if (result === 'REVISE') {
      try {
        await axios.patch('/api/paper/result', { _id: id, result: result, deadline: { name: e.target.name.value, date: e.target.deadline.value } })
        toast.success('Updated')
      } catch (error) {
        console.log(error)
        toast.error('Error')
      }
    } else {
      try {
        await axios.patch('/api/paper/result', { _id: id, result: result })
        toast.success('Updated')
      } catch (error) {
        console.log(error)
        toast.error('Error')
      }
    }
  }

  const handleStatus = (value) => {
    for (let i in value) {
      if (value[i].status !== 'SUCCESS')
        return false
    }
    return true
  }

  // ส่งจดหมายเชิญ
  const sendMail = async (e, api, file) => {
    e.preventDefault()
    const { recipient, confr_title, owner, paper_id } = e.target
    const formData = new FormData()
    formData.append('file', file)
    formData.append('recipient', recipient.value)
    formData.append('confr_title', confr_title.value)
    formData.append('owner', owner.value)
    formData.append('paper_id', paper_id.value)
    try {
      const res = await axios.post(api, formData)
      toast.success('Success')
      setPaper(res.data)
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <div className='bg-light'>
      <div className='container py-3'>
        <div className='card shadow-sm mb-3'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h5 className='card-title fw-bold'>ดูผลลัพธ์บทความ</h5>
              <UserDropdown />
            </div>
          </div>
        </div>
        <div className='card shadow-sm mb-3'>
          <div className='card-body'>
            <h6 className='fw-bold mb-3 card-title'>รายละเอียดบทความ</h6>
            {paper &&
              <div>
                <div className='row g-3'>
                  <PaperDetailField title='ชื่อบทความ' data={paper.title} />
                  <PaperDetailField title='รหัสบทความ' data={paper.paper_code} />
                  <PaperDetailField title='ผู้แต่ง' data={paper.author} />
                  <PaperDetailField title='ผู้ส่งบทความ' data={`${paper.owner?.name} (${paper.owner?.username})`} />
                  <PaperDetailField title='สถานะบทความ' data={<PaperStatus status={paper.status} />} />
                  <PaperDetailField title='ผลลัพธ์บทความ' data={<PaperResult status={paper.result} />} />
                  <PaperDetailField title='สถานะชำระเงิน' data={<PaymentStatus status={paper.payment_status} />} />
                  {paper.payment_image &&
                    <PaperDetailField title='หลักฐานการชำระเงิน' data={<Link to={`${api}/uploads/${paper.payment_image}`}>{paper.payment_image}</Link>} />
                  }
                  <PaperDetailField title='ที่อยู่ในการติดต่อ' data={paper.address} />
                  <PaperDetailField title='อีเมล' data={paper.email} />
                  <PaperDetailField title='เบอร์โทร' data={paper.contact} />
                </div>
              </div>
            }
          </div>
        </div>
        {paper.result === 'ACCEPT' || paper.result === 'REVISE' ? (
          <div className='row g-3 mb-3'>
            <div className='col-12'>
              <div className='card shadow-sm'>
                {paper.letter ? (
                  <div className='card-body'>
                    <h6 className='fw-bold mb-0'>
                      ส่งจดหมายเชิญเข้าร่วมงานประชุมแล้ว
                      <span className='ms-2 badge bg-success'>
                        <i className='bi bi-check-lg'></i>
                      </span>
                    </h6>
                  </div>
                ) : (
                  <div className='card-body'>
                    <h6 className='fw-bold mb-4'>
                      ส่งจดหมายเข้าร่วมงานประชุม
                    </h6>
                    <form onSubmit={e => sendMail(e, '/api/paper/send/email', sendMailFile)} className='row g-3 mb-3'>
                      <div className='col-auto'>
                        <label className='form-label'>อีเมล</label>
                        <input name='recipient' className='form-control-plaintext fw-bold' readOnly value={paper.email} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ชื่องานประชุม</label>
                        <input name='confr_title' className='form-control-plaintext fw-bold' readOnly value={paper.confr_code?.title} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ชื่อบทความ</label>
                        <input name='paper_id' className='form-control-plaintext d-none' readOnly value={paper._id} />
                        <input className='form-control-plaintext fw-bold' readOnly value={paper.title} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ผู้ส่งบทความ</label>
                        <input name='owner' className='form-control-plaintext d-none' readOnly value={paper.owner?._id} />
                        <input className='form-control-plaintext fw-bold' readOnly value={paper.owner?.username} />
                      </div>
                      <div className='col-12'>
                        <label className='form-label'>เลือกไฟล์จดหมาย</label>
                        <input
                          onChange={e => setSendMailFile(e.target.files[0])}
                          required
                          className='form-control'
                          type='file'
                          accept='.pdf, .doc'
                        />
                      </div>
                      <div className='text-end'>
                        <button className='btn btn-primary' type='submit' disabled={!sendMailFile}>
                          <i className='me-2 bi bi-send'></i>
                          ส่งจดหมายเชิญ
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
            {paper.payment_status === 'ACCEPT' &&
              <div className='col-12'>
                <div className='card shadow-sm'>
                  <div className='card-body'>
                    <h6 className='fw-bold card-title'>มอบใบประกาศนียบัตร</h6>
                    <form onSubmit={e => sendMail(e, '/api/paper/send/certificate', CertiFile)} className='row g-3 mb-3'>
                      <div className='col-auto'>
                        <label className='form-label'>อีเมล</label>
                        <input name='recipient' className='form-control-plaintext fw-bold' readOnly value={paper.email} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ชื่องานประชุม</label>
                        <input name='confr_title' className='form-control-plaintext fw-bold' readOnly value={paper.confr_code?.title} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ชื่อบทความ</label>
                        <input name='paper_id' className='form-control-plaintext d-none' readOnly value={paper._id} />
                        <input className='form-control-plaintext fw-bold' readOnly value={paper.title} />
                      </div>
                      <div className='col-auto'>
                        <label className='form-label'>ผู้ส่งบทความ</label>
                        <input name='owner' className='form-control-plaintext d-none' readOnly value={paper.owner?._id} />
                        <input className='form-control-plaintext fw-bold' readOnly value={paper.owner?.username} />
                      </div>
                      <div className='col-12'>
                        <label className='form-label'>เลือกไฟล์ใบประกาศนียบัตร</label>
                        <input
                          onChange={e => setCertiFile(e.target.files[0])}
                          required
                          className='form-control'
                          type='file'
                          accept='.pdf, .doc'
                        />
                      </div>
                      <div className='text-end'>
                        <button className='btn btn-primary' type='submit' disabled={!CertiFile}>
                          <i className='me-2 bi bi-send'></i>
                          มอบใบประกาศ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            }
          </div>
        ) : null
        }
        <div>
          <div className='card mb-3'>
            <div className="card-body">
              <h6 className='fw-bold card-title'>ความคิดเห็นของกรรมการ</h6>
            </div>
          </div>
          {review.length > 0 ? (
            <div>
              <div className='row g-3 mb-5'>
                {review?.map((item, index) => (
                  <div key={item._id} className='col-12 col-md-6 col-lg-4'>
                    <div className='card shadow-sm h-100'>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between align-items-center'>
                          <h6 className='fw-bold'>กรรมการท่านที่ {index + 1}</h6>
                          <div>
                            <ReviewStatus status={item.status} />
                            <div className='text-end'>
                              <Link onClick={() => handleShow(item._id, item.reviewer?.username)} type='button'>ดูประวัติ</Link>
                            </div>
                          </div>
                        </div>
                        {item.status === 'SUCCESS' &&
                          <div>
                            <p>{item.suggestion}</p>
                            <p>รวมคะแนน: {item.total}</p>
                            <p>ผลลัพธ์ <PaperResult status={item.result} /></p>
                            <div>
                              <small>{item.reviewer?.name} ({item.reviewer?.username})</small> <br />
                              {item.updatedAt &&
                                <small className='text-muted'>{dayjs(item.updatedAt).format('DD MM YYYY HH:mm')}</small>
                              }
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                ))}
                <ReviewHistory show={show} handleClose={handleClose} data={history} />
              </div>
              {handleStatus(review) && paper.status === 'REVIEW' &&
                <div className='card   shadow-sm'>
                  <div className='card-body'>
                    <p>เปลี่ยนผลลัพธ์บทความ</p>
                    <form onSubmit={handleResult}>
                      <div>
                        <label className='form-label'>ผลลัพธ์บทความ</label>
                        <select name='result' className="form-select" required onChange={e => setResult(e.target.value)}>
                          <option defaultValue value="">--</option>
                          <option value="ACCEPT">ผ่าน</option>
                          <option value="REVISE">แก้ไข</option>
                          <option value="REJECT">ไม่ผ่าน</option>
                        </select>
                      </div>
                      {result === "REVISE" &&
                        <div>
                          <div>
                            <label className='form-label mt-3'>ชื่อการแก้ไข</label>
                            <input name='name' type='text' className='form-control' required />
                          </div>
                          <div>
                            <label className='form-label mt-3'>กำหนด Deadline</label>
                            <input name='deadline' type='date' className='form-control' required />
                          </div>
                        </div>
                      }
                      <div className='text-end mt-3'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              }
            </div>
          ) : (
            <div className='card'>
              <div className="card-body text-center">
                <h5 className='fw-bold card-title'>ไม่พบความคิดเห็น</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostReview

function ReviewHistory(props) {

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

    if (props.data.id) {
      fethHistory()
    }
  }, [props.data.id])

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.data.reviewer}</Modal.Title>
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
                        <Link target='_blank' rel='noreferrer' className='text-decoration-none' to={`${api}/uploads/${items.suggestion_file}`}>ดูไฟล์</Link>
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
        <Button variant="" onClick={props.handleClose}>
          ปิด
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function PaperDetailField(props) {
  return (
    <div className='col-12'>
      <div className='row'>
        <div className="col-md-3">
          <small className='fw-bold'>{props.title}</small>
        </div>
        <div className='col-md-8'>
          <small>{props.data}</small>
        </div>
      </div>
    </div>
  )
}