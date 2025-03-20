import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PaperStatus, { PaperResult } from '../components/PaperStatus';


import PaymentStatus from '../components/PaymentStatus';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { UserDropdown } from '../components/UserDropdown';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';
import ConfirmDialog from '../components/ConfirmDialog';

function HostReview() {

  const { id } = useParams()
  const [paper, setPaper] = useState({})
  const [review, setReview] = useState([])
  const [result, setResult] = useState('')

  const navigate = useNavigate()

  // จดหมายเชิญ
  const [sendMailFile, setSendMailFile] = useState(null)

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


  // end history

  const handleResult = async (e) => {
    e.preventDefault()
    if (result === 'MAJOR' || result === 'MINOR') {
      try {
        const res = await axios.patch('/api/paper/result', { _id: id, result: result, deadline: { name: e.target.name.value, date: e.target.deadline.value } })
        toast.success('เปลี่ยนผลลัพธ์บทความสำเร็จ')
        setPaper(res.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
        toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      } finally {
        setResult('')
      }
    } else {
      try {
        const res = await axios.patch('/api/paper/result', { _id: id, result: result })
        toast.success('เปลี่ยนผลลัพธ์บทความสำเร็จ')
        setPaper(res.data)
        window.location.reload()
      } catch (error) {
        console.log(error)
        toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      } finally {
        setResult('')
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
  const [sendLoading, setSendLoading] = useState(false)
  const sendMail = async (e, api, file) => {
    e.preventDefault()
    setSendLoading(true)
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
    } finally {
      setSendLoading(false)
    }
  }

  // handle REJECT
  const [showReject, setShowReject] = useState(false)

  const handleReject = async () => {
    try {
      await axios.patch('/api/paper/reject/' + id)
      toast.success('ส่งคืนบทความสำเร็จ')
      navigate(-1)
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      console.log(error)
    }
  }

  // handleSubmit payment
  const [paymentStatus, setPaymentStatus] = useState('')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleShowPayment = () => {
    if (!paymentStatus) {
      toast.warning('กรุณาเลือกสถานะก่อนทำการกดยืนยัน')
    } else {
      setPaymentStatus(paymentStatus)
      setShowPayment(true)
    }
  }

  const handleClosePayment = () => {
    setPaymentStatus('')
    setShowPayment(false)
  }

  const handleSubmitPayment = async (e) => {
    setPaymentLoading(true)
    e.preventDefault()
    if (!paymentStatus) {
      toast.warning('กรุณาเลือกสถานะ ก่อนทำการกดยืนยัน')
      return
    }
    try {
      const res = await axios.patch('/api/paper/check/payment/' + id, {
        payment_status: paymentStatus
      })
      setPaper(res.data)
      toast.success('ยืนยันสถานะ การชำระเงินเสร็จสิ้น')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุราลองใหม่อีกครั้ง')
    } finally {
      setPaymentLoading(false)
      setShowPayment(false)
      setPaymentStatus('')
    }
  }

  // handlepublic
  const [showPublic, setShowPublic] = useState(false)

  const handlePublic = async () => {
    try {
      const res = await axios.patch('/api/paper/public/' + id)
      setPaper(res.data)
      toast.success('เผยแพร่บทความแล้ว')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setShowPublic(false)
    }
  }

  // handle un public
  const [showUnPub, setShowUnPub] = useState(false)

  const handleUnPublic = async () => {
    try {
      const res = await axios.patch('/api/paper/unpublic/' + id)
      setPaper(res.data)
      toast.success('ยกเลิกการเผยแพร่สำเร็จ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setShowUnPub(false)
    }
  }

  // handleUpdate
  const [updateLoading, setUpdateLoading] = useState(false)
  const UpdateDetail = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    try {
      const formData = new FormData(e.target)
      const json = Object.fromEntries(formData.entries())
      await axios.patch('/api/paper/update/' + id, json)
      toast.success('แก้ไขสำเร็จ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setUpdateLoading(false)
    }
  }

  return (
    <div className='bg-light'>
      <ConfirmDeleteDialog
        header='ยืนยันการส่งคืนบทความ'
        message='หากส่งคืนบทความแล้วจะไม่สามารถแก้ไขได้ ยืนยันการส่งคืนบทความหรือไม่ ?'
        onCancel={() => setShowReject(false)}
        onConfirm={handleReject}
        show={showReject}
      />
      <ConfirmDialog
        show={showPublic}
        handleClose={() => setShowPublic(false)}
        header='ยืนยันการเผยแพร่บทความ'
        text='ต้องการเผยแพร่บทความหรือไม่ ?'
        handleSubmit={handlePublic}
      />
      <ConfirmDialog
        show={showUnPub}
        handleClose={() => setShowUnPub(false)}
        header='ยกเลิกการเผยแพร่บทความ'
        text='ต้องการยกเลิกการเผยแพร่บทความหรือไม่ ?'
        handleSubmit={handleUnPublic}
      />
      <div>
        <div className='card shadow-sm mb-3'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='card-title fw-bold'>ดูผลลัพธ์บทความ</h4>
              <UserDropdown />
            </div>
          </div>
        </div>
        <div className='card shadow-sm mb-3'>
          <div className='card-body'>
            <div className='mb-3'>
              <h4 className='card-title'>รายละเอียดบทความ</h4>
              <div className='text-muted'>
                ผู้จัดงานสามารถแก้ไขรายละเอียดบทความได้หากข้อมูลไม่ถูกต้อง
              </div>
            </div>
            {paper &&
              <div>

                <div className="mb-3">
                  <label className="form-label fw-bold">รหัสบทความ</label>
                  <div>
                    {paper.paper_code}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">หัวข้อ</label>
                  <div>
                    {paper.cate_code?.name}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">ประเภทการลงทะเบียน</label>
                  <div>
                    {paper.regis_type ? 'Early Bird' : 'Regular'}
                  </div>
                </div>

                <form onSubmit={UpdateDetail}>
                  <div className="row row-cols-1 g-3">
                    <div>
                      <label className="form-label fw-bold">ชื่อบทความ (ภาษาไทย)</label>
                      <input
                        type='text'
                        defaultValue={paper.title}
                        className="form-control"
                        name='title'
                      />
                    </div>
                    <div>
                      <label className="form-label fw-bold">ชื่อบทความ (ภาษาอังกฤษ)</label>
                      <input
                        type='text'
                        defaultValue={paper.title_en}
                        className="form-control"
                        name='title_en'
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold">ชื่อผู้แต่ง</label>
                      <textarea
                        defaultValue={paper.author}
                        className="form-control"
                        name='author'
                        rows={5}
                      />
                      <div className='form-text'>
                        เพิ่มชื่อผู้แต่งด้วยการคั่นเครื่องหมาย , ระหว่างชื่อที่ต้องการเพิ่มเช่น ผู้แต่ง 1, ผู้แต่ง 2
                      </div>
                    </div>

                    <div>
                      <label className="form-label fw-bold">Abstract</label>
                      <textarea
                        defaultValue={paper.abstract}
                        className="form-control"
                        rows={10}
                        name='abstract'
                      />
                    </div>
                    <div>
                      <label className="form-label fw-bold">คำสำคัญ</label>
                      <textarea
                        type='text'
                        defaultValue={paper.keyword}
                        className="form-control"
                        name='keyword'
                        rows={5}
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold">คณะ</label>
                      <input
                        type='text'
                        defaultValue={paper.group}
                        className="form-control"
                        name='group'
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold">มหาวิทยาลัย</label>
                      <input
                        type='text'
                        defaultValue={paper.university}
                        className="form-control"
                        name='university'
                      />
                    </div>
                    {paper.publication !== undefined &&
                      <div>
                        <label className="form-label">วารสาร</label>
                        <input
                          type='text'
                          placeholder={`${paper.publication?.th_name}/${paper.publication?.en_name}`}
                          className="form-control"
                          readOnly
                        />
                      </div>
                    }

                    <div>
                      <label className="form-label fw-bold">ที่อยู่ในการติดต่อ</label>
                      <textarea
                        type='text'
                        defaultValue={paper.address}
                        className="form-control"
                        name='address'
                        rows={5}
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold">เบอร์โทรศัพท์</label>
                      <input
                        type='text'
                        defaultValue={paper.contact}
                        className="form-control"
                        pattern='[0-9]{10}'
                        maxLength={10}
                        name='contact'
                      />
                      <div className="form-text">
                        เฉพาะตัวเลข 10 หลักเท่านั้น
                      </div>
                    </div>

                  </div>
                  <div className="text-end my-3">
                    {updateLoading ? (
                      <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <span>Loading...</span>
                      </button>
                    ) : (
                      <button type='submit' className="btn btn-success">ยืนยันการแก้ไข</button>
                    )}
                  </div>
                </form>
                {paper.status === 'PENDING' && paper.result === 'PENDING' &&
                  <div className="my-3">
                    <div className="text-muted">
                      หากบทความไม่ผ่านเกณฑ์
                    </div>
                    <button type='button' onClick={() => setShowReject(true)} className="btn btn-danger btn-sm">
                      <i className="bi bi-backspace-fill me-2"></i>
                      ส่งคืนบทความ
                    </button>
                  </div>
                }
                <div>
                  <h4 className="mb-4">สถานะบทความ / สถานะการชำระเงิน</h4>
                  <div className="row row-cols-1 row-cols-md-4 g-3 mb-3">
                    <div>
                      <label className="form-label fw-bold">สถานะบทความ</label>
                      <div>
                        <PaperStatus status={paper.status} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label fw-bold">ผลลัพธ์บทความ</label>
                      <div>
                        <PaperResult status={paper.result} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label fw-bold">สถานะการชำระเงิน</label>
                      <div>
                        <PaymentStatus status={paper.payment_status} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label fw-bold">หลักฐานการชำระเงิน</label>
                      <div>
                        {paper.payment_image ? (
                          <Link
                            target='_blank'
                            rel='noreferrer'
                            to={`/uploads/${paper.payment_image}`}
                          >
                            {paper.payment_image}
                          </Link>
                        ) : '-'}
                      </div>
                    </div>
                  </div>
                  {paper.payment_status !== 'ACCEPT' && paper.payment_status !== 'NEW' &&
                    <div>
                      <ConfirmDialog
                        show={showPayment}
                        handleClose={handleClosePayment}
                        header='ยืนยันสถานะการชำระเงิน'
                        text='ต้องการยืนยันสถานะการชำระเงินนี้หรือไม่ ?'
                        handleSubmit={handleSubmitPayment}
                        loading={paymentLoading}
                      />
                      <label className="form-label">ตรวจสอบหลักฐานการชำระเงิน</label>
                      <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="form-select">
                        <option value=''>-- โปรดระบุ</option>
                        <option value='ACCEPT'>
                          ข้อมูลถูกต้อง
                        </option>
                        <option value='REJECT' className="text-danger">
                          ข้อมูลไม่ถูกต้อง
                        </option>
                      </select>
                      <div className="mt-3 text-end">
                        <button
                          className="btn btn-primary"
                          type='button'
                          disabled={!paymentStatus}
                          onClick={handleShowPayment}
                        >
                          ยืนยันหลักฐานการชำระเงิน
                        </button>
                      </div>
                    </div>
                  }
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
                    <h4 className='card-title'>
                      ส่งจดหมายเชิญเข้าร่วมงานประชุมแล้ว
                      <span className='ms-2 badge bg-success'>
                        <i className='bi bi-check-lg'></i>
                      </span>
                    </h4>
                  </div>
                ) : (
                  <div className='card-body'>
                    <div className='mb-5'>
                      <h4 className='card-title'>
                        ส่งจดหมายเข้าร่วมงานประชุม
                      </h4>
                      <div className='text-muted'>
                        ส่งจดหมายเชิญเพื่อให้ผู้ส่งบทความ เตรียมพร้อมสำหรับการลงทะเบียนเพื่อเข้าร่วมงานประชุม
                      </div>
                    </div>
                    <form onSubmit={e => sendMail(e, '/api/paper/send/email', sendMailFile)} className='row row-cols-1 g-3 mb-3'>
                      <div className='row'>
                        <label className='col-sm-3 fw-bold col-form-label'>อีเมล</label>
                        <div className='col-sm-9'>
                          <input
                            name='recipient'
                            className='form-control-plaintext'
                            readOnly
                            value={paper.email}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label className='col-sm-3 fw-bold col-form-label'>ชื่องานประชุม</label>
                        <div className='col-sm-9'>
                        <input
                            className='form-control-plaintext'
                            readOnly
                            value={paper.confr_code?.title}
                            name='confr_title'
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label className='col-sm-3 fw-bold col-form-label'>ชื่อบทความ</label>
                        <div className='col-sm-9'>
                          <input name='paper_id' className='form-control-plaintext d-none' readOnly value={paper._id} />
                          <input
                            className='form-control-plaintext'
                            readOnly
                            value={paper.title}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <label className='col-sm-3 fw-bold col-form-label'>ผู้ส่งบทความ</label>
                        <div className='col-sm-9'>
                          <input name='owner' className='form-control-plaintext d-none' readOnly value={paper.owner?._id} />
                          <input className='form-control-plaintext' readOnly value={paper.owner?.username} />
                        </div>
                      </div>
                      <div className='col-12'>
                        <label className='form-label fw-bold'>เลือกไฟล์จดหมาย</label>
                        <input
                          onChange={e => setSendMailFile(e.target.files[0])}
                          required
                          className='form-control'
                          type='file'
                          accept='.pdf, .doc'
                        />
                      </div>
                      {sendLoading ? (
                        <div className='text-end'>
                          <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                          </button>
                        </div>
                      ) : (
                        <div className='text-end'>
                          <button className='btn btn-primary' type='submit' disabled={!sendMailFile}>
                            <i className='me-2 bi bi-send'></i>
                            ส่งจดหมายเชิญ
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null
        }
        <div>
          <div className='card mb-3'>
            <div className="card-body">
              <h4 className='card-title'>ความคิดเห็นของกรรมการ</h4>
            </div>
          </div>
          {review.length > 0 ? (
            <div>
              <div className='row row-cols-1 g-3 mb-3'>
                {review.map((item) => (
                  <div key={item._id}>
                    <div className='card'>
                      <div className="card-body">
                        <h6 className="card-title text-muted">{item.reviewer?.name} ({item.reviewer?.username})</h6>
                        <div className="table-responsive">
                          <table className="table" style={{ minWidth: 1000 }}>
                            <thead>
                              <tr>
                                <th>วันที่ตรวจ</th>
                                <th>ข้อแนะนำ</th>
                                <th>คะแนน</th>
                                <th>สถานะ</th>
                                <th>ผลลัพธ์</th>
                                <th>ไฟล์</th>
                              </tr>
                            </thead>
                            <tbody>
                              <GetCommitteeHistory
                                id={item._id}
                              />
                              <tr>
                                <td style={{ width: 200 }}>{dayjs(item.updatedAt).format('DD MMM YYYY HH:mm')}</td>
                                <td style={{ width: 600 }}>
                                  <textarea
                                    value={item.suggestion}
                                    readOnly
                                    className='form-control'
                                    rows={5}
                                  />
                                </td>
                                <td>{item.total}</td>
                                <td>
                                  <PaperStatus status={item.status} />
                                </td>
                                <td>
                                  <PaperResult status={item.result} />
                                </td>
                                <td>
                                  {item.suggestion_file ? (
                                    <Link
                                      to={`/uploads/${item.suggestion_file}`}
                                      target='_blank'
                                      rel='noreferrer'
                                    >
                                      {item.suggestion_file}
                                    </Link>
                                  ) : '-'}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {((paper.status === 'REVIEW' && paper.result === 'PENDING' && handleStatus(review)) || paper.result === 'MINOR' || paper.result === 'MAJOR') &&
                <div className='card shadow-sm'>
                  <div className='card-body'>
                    <h4 className="card-title">เปลี่ยนผลลัพธ์บทความ</h4>
                    <form onSubmit={handleResult}>
                      <div>
                        <label className='form-label'>ผลลัพธ์บทความ</label>
                        <select name='result' className="form-select" required onChange={e => setResult(e.target.value)}>
                          <option defaultValue value="">--</option>
                          <option value="ACCEPT">Accept submission</option>
                          <option value="MINOR">Minor Revision</option>
                          <option value="MAJOR">Major Revision</option>
                          <option value="REJECT">Decline submission</option>
                        </select>
                      </div>
                      {(result === "MINOR" || result === 'MAJOR') &&
                        <div>
                          <div>
                            <label className='form-label mt-3'>เรื่องที่แก้ไข</label>
                            <input name='name' type='text' className='form-control' required />
                          </div>
                          <div>
                            <label className='form-label mt-3'>กำหนด Deadline</label>
                            <input name='deadline' type='date' className='form-control' required />
                          </div>
                        </div>
                      }
                      <div className='text-end mt-3'>
                        <button type='submit' className='btn btn-primary' disabled={!result}>ยืนยันสถานะ</button>
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


function GetCommitteeHistory({ id }) {

  const [data, setData] = useState([])

  useEffect(() => {
    const fethHistory = async () => {
      try {
        const res = await axios.get('/api/history/read/' + id)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (id) {
      fethHistory()
    }

  }, [id])

  return (
    <>
      {data?.map((items) => (
        <tr key={items._id}>
          <td style={{ width: 200 }}>{dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}</td>
          <td style={{ width: 600 }}>
            <textarea
              value={items.suggestion}
              readOnly
              className='form-control'
              rows={5}
            />
          </td>
          <td>{items.total}</td>
          <td>
            <PaperStatus status={items.status} />
          </td>
          <td>
            <PaperResult status={items.result} />
          </td>
          <td>
            {items.suggestion_file ? (
              <Link
                to={`/uploads/${items.suggestion_file}`}
                target='_blank'
                rel='noreferrer'
              >
                {items.suggestion_file}
              </Link>
            ) : (
              '-'
            )
            }
          </td>
        </tr>
      ))}
    </>
  )
}