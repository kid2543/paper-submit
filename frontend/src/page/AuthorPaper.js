import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import PaperStatus, { PaperResult, ReviewStatus } from '../components/PaperStatus'
import PaymentStatus from '../components/PaymentStatus'
import useFetch from '../hook/useFetch'

// react bootstrap
import {
  Modal,
  Button,
  Breadcrumb
} from 'react-bootstrap'

import axios from 'axios'
import { toast } from 'react-toastify'
import ConfirmDialog from '../components/ConfirmDialog'

function AuthorPaper() {

  const { id } = useParams()
  const { data, error, loading, setData } = useFetch('/api/paper/owner/' + id)
  const paperFile = useFetch('/api/paperfile/read/' + id)
  const comment = useFetch(`/api/assign/${id}`)

  const [uploaded, setUploaded] = useState([''])

  // hadnle payment
  const [paymentFile, setPaymentFile] = useState(null)

  const handleUploadPayment = async () => {
    if (!paymentFile) {
      toast.warning('กรุณาเลือกไฟล์ก่อนทำการกดอัพโหลด')
      return
    }

    try {
      const formData = new FormData()
      formData.append('image', paymentFile)
      const res = await axios.patch('/api/paper/upload/payment/' + id, formData)
      setData(res.data)
      toast.success('อัพโหลดหลักฐานการชำระเงินสำเร็จ รอติดตามผลการตรวจสอบ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  // edit paper file
  const [showHistory, setShowHistory] = useState(false)
  const [HistoryId, setHistoryId] = useState('')
  const [HistoryName, setHistoryName] = useState('')

  const handleShowHistory = (file_id, name) => {
    setHistoryId(file_id)
    setShowHistory(true)
    setHistoryName(name)
  }

  const handleCloseHistory = () => {
    setShowHistory(false)
    setHistoryId('')
    setHistoryName('')
  }

  const hanleEditPaper = async (e, file_id) => {
    e.preventDefault()
    if (!e.target.edit_file.files[0]) {
      toast.warning('กรุณาเลือกไฟล์ก่อนทำการอัพโหลด')
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', e.target.edit_file.files[0])
      const res = await axios.post('/api/paperfile/edit/' + file_id, formData)
      setUploaded([...uploaded, res.data._id])
      toast.success('อัพโหลดฉบับแก้ไขสำเร็จ กรุณาตรวจสอบให้แน่ใจว่าได้ทำการอัพโหลดครบแล้วก่อนทำการกดยืนยัน')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  // confirm edit status

  const [showConfirmEdit, setShowConfirmEdit] = useState(false)

  const handleEditStatus = async () => {
    try {
      const res = await axios.patch('/api/paper/edit/status/' + id)
      toast.success('แก้ไขบทความสำเร็จ')
      setData(res.data)
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setShowConfirmEdit(false)
    }
  }

  // render

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className="py-2">
      <ConfirmDialog
        show={showConfirmEdit}
        handleClose={() => setShowConfirmEdit(false)}
        handleSubmit={handleEditStatus}
        header='ยืนยันการแก้ไข'
        text='ต้องการยืนยันการแก้ไขบทความหรือไม่ ?'
      />
      {data &&
        <div>
          <section className='card  shadow-sm'>
            <div className='card-body'>
              <Breadcrumb>
                <Breadcrumb.Item href="/author">รายการบทความ</Breadcrumb.Item>
                <Breadcrumb.Item active>
                  แก้ไขรายละเอียดบทความ
                </Breadcrumb.Item>
              </Breadcrumb>
              <h4 className='fw-bold card-title'>{data.paper_code}</h4>
            </div>
          </section>
          <section className='card  shadow-sm my-3'>
            <div className='card-body'>
              <h4>รายละเอียดบทความ</h4>
              <hr />
              <div className='row g-3 row-cols-1'>
                <div>
                  <label className='form-label'>ชื่อบทความ (ภาษาไทย)</label>
                  <input className='form-control' value={data.title} readOnly />
                </div>
                <div>
                  <label className='form-label'>ชื่อบทความ (ภาษาอังกฤษ)</label>
                  <input className='form-control' value={data.title_en} readOnly />
                </div>
                <div>
                  <label className="form-label">Abstract</label>
                  <textarea
                    rows={10}
                    name='abstract'
                    className="form-control"
                    defaultValue={data.abstract}
                    readOnly
                  />
                </div>
                <div>
                  <label className='form-label'>คำสำคัญ</label>
                  <textarea
                    rows={5}
                    readOnly
                    name='keyword'
                    className='form-control'
                    defaultValue={data.keyword}
                  />
                  <div className='form-text'>ใช้ ',' ในการแบ่ง keyword</div>
                </div>
                <div>
                  <label className='form-label'>ชื่อผู้แต่ง</label>
                  <textarea
                    rows={5}
                    name='author'
                    className='form-control'
                    defaultValue={data.author}
                    readOnly
                  />
                  <div className="form-text">
                    ระบุชื่อผู้แต่งทุกท่าน
                  </div>
                </div>
                <div>
                  <label className='form-label'>ที่อยู่ในการติดต่อ</label>
                  <textarea
                    rows={5}
                    name='address'
                    className='form-control'
                    defaultValue={data.address}
                    readOnly
                  />
                </div>
                <div>
                  <label className='form-label'>เบอร์โทร</label>
                  <input
                    type='tel'
                    pattern='[0-9]{10}'
                    maxLength={10}
                    name='contact'
                    className='form-control'
                    defaultValue={data.contact}
                    readOnly
                  />
                </div>
                <div>
                  <label className='form-label'>อีเมล</label>
                  <input
                    type='email'
                    name='email'
                    className='form-control'
                    defaultValue={data.email}
                    readOnly
                  />
                </div>
                <div>
                  <h4>สถานะบทความ</h4>
                  <div className="row row-cols-1 row-cols-md-4 g-3">
                    <div>
                      <label className="form-label">สถานะบทความ</label>
                      <div>
                        <PaperStatus status={data.status} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">ผลลัพธ์บทความ</label>
                      <div>
                        <PaperResult status={data.result} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">สถานะการชำระเงิน</label>
                      <div>
                        <PaymentStatus status={data.payment_status} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">หลักฐานการชำระเงิน</label>
                      <div>
                        {data.payment_image ? (
                          <Link to={`/uploads/${data.payment_image}`} target='_blank' rel='noreferrer'>
                            {data.payment_image}
                          </Link>
                        ) : '-'}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {paperFile.data &&
                    <div>
                      <h4 className="mt-3">ไฟล์บทความ</h4>
                      <hr />
                      <div className='table-responsive'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>แก้ไขล่าสุด</th>
                              <th>ชื่อ</th>
                              <th>บทความ</th>
                              <th>ประวัติ</th>
                            </tr>
                          </thead>
                          <tbody>

                            {paperFile.data.map(items => (
                              <tr key={items._id}>
                                <td>
                                  {dayjs(items.updatedAt).format('DD MMM YYYY HH:mm')}
                                </td>
                                <td>
                                  {items.name}
                                </td>
                                <td>
                                  <Link target='_blank' rel='noreferrer' to={`/uploads/${items.original_file}`}>เพิ่มเติม</Link>
                                </td>
                                <td>
                                  <Link onClick={() => handleShowHistory(items._id, items.name)} type='button'>ดูประวัติ</Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <HistoryPaper file_id={HistoryId} show={showHistory} handleClose={handleCloseHistory} name={HistoryName} />
                      </div>
                    </div>
                  }
                </div>
                {data.edit_paper?.map((items, index) => (
                  <div key={index}>
                    {index + 1} : {items}
                  </div>
                ))}
              </div>
            </div>
          </section>
          {(data.result === 'MAJOR' || data.result === 'MINOR') && data.status === 'SUCCESS' &&
            <section className='card  shadow-sm mb-3'>
              <div className='card-body'>
                <div>
                  <h4>อัพโหลดบทความฉบับแก้ไข</h4>
                  <hr />
                  <p>
                    แก้ไขให้แล้วเสร็จภายใน:
                  </p>
                  <ul>
                    {data.deadline?.map((date, index) => (
                      <li key={date._id}>
                        {
                          data.deadline?.length > index + 1 ?
                            <del>{dayjs(date.date).format('DD MMM YYYY')}</del> :
                            <p>{date.name} <br /> {dayjs(date.date).format('DD MMM YYYY')}</p>
                        }
                      </li>
                    ))}
                  </ul>
                  {paperFile.data &&
                    <div>
                      {paperFile.data.map((items) => (
                        <form onSubmit={e => hanleEditPaper(e, items._id)} key={items._id} className='mb-3'>
                          <label className='form-label'>ไฟล์ <span className="fw-bold">{items.name}</span> (ฉบับแก้ไข)</label>
                          <div className="input-group">
                            <input
                              name='edit_file'
                              className='form-control'
                              type='file'
                              accept='.pdf, .doc'
                              required
                            />
                            {uploaded.includes(items._id) &&
                              <button className="btn btn-success">
                                <i className="bi bi-check-lg"></i>
                              </button>
                            }
                          </div>
                          <div className='mt-3'>
                            <button disabled={uploaded.includes(items._id)} type='submit' className='btn btn-outline-primary'>
                              <i className="bi bi-upload me-2"></i>
                              อัพโหลด
                            </button>
                          </div>
                        </form>
                      ))}
                    </div>
                  }
                  <div className="text-muted">
                    กรุณาอัพโหลดฉบับแก้ไขให้ครบ หรืออัพโหลดเฉพาะที่แก้ไขก่อนทำการกดยืนยัน
                  </div>
                  <div className='text-end mt-3'>
                    <button
                      type='button'
                      onClick={() => setShowConfirmEdit(true)}
                      className='btn btn-primary'
                    >
                      ยืนยันการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>
          }
          {(data.payment_status === 'PENDING' || data.payment_status === 'REJECT') &&
            <section className="mb-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">ชำระเงินและแนบหลักฐานการชำระเงิน</h4>
                  <div className="card-text">
                    อัตราค่าลงทะเบียน
                  </div>
                  บทความนี้ลงทะเบียนแบบ: {data.regis_type ? 'Early bird' : 'Regular'}
                  <div className="table-responsive">
                    <table className="table" style={{ minWidth: 1000 }}>
                      <thead>
                        <tr>
                          <th>ประเภทการลงทะเบียน</th>
                          <th>
                            Early Bird <br />
                            {
                              data.confr_code?.regis_eb_start_date &&
                              <span className="badge text-bg-primary">{dayjs(data.confr_code.regis_eb_start_date).format('DD MMM YYYY')}</span>
                            }
                            {data.confr_code?.regis_eb_end_date &&
                              <>
                                <span className="mx-2">-</span>
                                <span className="badge text-bg-primary">{dayjs(data.confr_code.regis_eb_end_date).format('DD MMM YYYY')}</span>
                              </>
                            }
                          </th>
                          <th>
                            Regular <br />
                            {
                              data.confr_code?.regis_rl_start_date &&
                              <span className="badge text-bg-primary">{dayjs(data.confr_code.regis_rl_start_date).format('DD MMM YYYY')}</span>
                            }
                            {data.confr_code?.regis_rl_end_date &&
                              <>
                                <span className="mx-2">-</span>
                                <span className="badge text-bg-primary">{dayjs(data.confr_code.regis_rl_end_date).format('DD MMM YYYY')}</span>
                              </>
                            }
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.confr_code.regis_type?.map((types) => (
                          <tr key={types._id}>
                            <td>{types.name}</td>
                            <td>{new Intl.NumberFormat('en-US').format(types.price_1)}</td>
                            <td>{new Intl.NumberFormat('en-US').format(types.price_1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className='card-text'>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">แนบหลักฐาน</label>
                        <input
                          className="form-control"
                          type='file' accept='image/*'
                          onChange={e => setPaymentFile(e.target.files[0])}
                        />
                      </div>
                      <div className="text-end">
                        <button type='button' disabled={!paymentFile} onClick={handleUploadPayment} className="btn btn-primary">
                          <i className="bi bi-upload me-2"></i>
                          อัพโหลด
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          }
        </div>
      }
      {comment.data?.length > 0 &&
        <section className='card'>
          <div className="card-body">
            <h4 className="card-title">ข้อแนะนำของกรรมการ</h4>
            {comment.data?.map((coments, index) => (
              <div key={coments._id} className="table-responsive">
                <p>กรรมการท่านที่: {index + 1}</p>
                <table className="table" style={{ minWidth: 1000 }}>
                  <thead>
                    <tr>
                      <th>วันที่</th>
                      <th>ข้อแนะนำ</th>
                      <th>สถานะ</th>
                      <th>ผลลัพธ์</th>
                      <th>ไฟล์</th>
                    </tr>
                  </thead>
                  <tbody>
                    <HistoryComent id={coments._id} />
                    <tr>
                      <td>{dayjs(coments.updatedAt).format('DD MMM YYYY HH:mm')}</td>
                      <td>{coments.suggestion}</td>
                      <td>
                        <PaperStatus status={coments.status} />
                      </td>
                      <td>
                        <PaperResult status={coments.result} />
                      </td>
                      <td>
                        {coments.suggestion_file ? (
                          <Link
                            to={`/uploads/${coments.suggestion_file}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {coments.suggestion_file}
                          </Link>
                        ) : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      }
    </div>
  )
}

export default AuthorPaper

function HistoryPaper(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    const fethHistory = async () => {
      try {
        const res = await axios.get('/api/editpaper/read/' + props.file_id)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (props.file_id) {
      fethHistory()
    }
  }, [props.file_id])

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ประวัติการแก้ไข: {props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data?.length > 0 ? (
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>แก้ไขเมื่อ</th>
                  <th>ไฟล์</th>
                </tr>
              </thead>
              <tbody>
                {data.map((items) => (
                  <tr key={items._id}>
                    <td>
                      {dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}
                    </td>
                    <td>
                      <Link target='_blank' rel='noreferrer' to={`/uploads/${items.original_file}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="text-center">ไม่พบข้อมูล</div>
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

function HistoryComent({ id }) {
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
      {data.map((items) => (
        <tr key={items._id}>
          <td>{dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}</td>
          <td>{items.suggestion}</td>
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
            ) : '-'
            }
          </td>
        </tr>
      ))}
    </>
  )
}