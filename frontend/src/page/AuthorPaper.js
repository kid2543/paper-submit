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

const api = process.env.REACT_APP_API_URL

function AuthorPaper() {

  const { id } = useParams()
  const { data, error, loading } = useFetch('/api/paper/owner/' + id)
  const paperFile = useFetch('/api/paperfile/read/' + id)
  const comment = useFetch(`/api/assign/${id}`)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const json = Object.fromEntries(formData.entries())
      const res = await axios.patch('/api/paper/update/' + id, json)
      toast.success('Success')
      console.log(res.data)
    } catch (error) {
      console.log(error)
      toast.error('Error')
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

  // comment history
  const [showHistoryComment, setShowHistoryComment] = useState(false)
  const [HistoryCommentId, setHistoryCommentId] = useState('')

  const handleCloseHistoryComment = () => {
    setShowHistoryComment(false)
    setHistoryCommentId('')
  }

  const handleShowHistoryComment = (id) => {
    setHistoryCommentId(id)
    setShowHistoryComment(true)
  }


  const hanleEditPaper = async (e, file_id) => {
    e.preventDefault()
    console.log(file_id)
    console.log(e.target.edit.files[0])
    try {
      const formData = new FormData()
      formData.append('file', e.target.edit.files[0])
      const res = await axios.post('/api/paperfile/edit/' + file_id, formData)
      console.log(res.data)
      alert('Updated')
    } catch (error) {
      console.log(error)
      alert('Error')
    }
  }

  // confirm edit status

  const [showConfirmEdit, setShowConfirmEdit] = useState(false)

  const handleEditStatus = async () => {
    try {
      await axios.patch('/api/paper/edit/status/' + id)
      toast.success('แก้ไขบทความสำเร็จ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  // render

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="py-3">
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
              <h6 className="fw-bold mb-3">รายละเอียดบทความ</h6>
              <div className='row gy-3'>
                <div className='col-12'>
                  <label className='form-label'>อาจารย์ประจำวิชา</label>
                  <input className='form-control' value={data.advise} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>คณะ</label>
                  <input className='form-control' value={data.group} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>มหาวิทยาลัย</label>
                  <input className='form-control' value={data.university} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>ประเภทบทความ</label>
                  <input className='form-control' value={data.cate_code?.name} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>ชื่อบทความ</label>
                  <input className='form-control' value={data.title} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>รหัสบทความ</label>
                  <input className='form-control' value={data.paper_code} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>วารสาร</label>
                  <input className='form-control' value={data.publication?.en_name} disabled />
                </div>
                <div className='col-12'>
                  <label className='form-label'>สถานะบทความ</label>
                  <div>
                    <PaperStatus status={data.status} />
                  </div>
                </div>
                <div className='col-12'>
                  <label className='form-label'>ผลลัพธ์บทความ</label>
                  <div>
                    <PaperResult status={data.result} />
                  </div>
                </div>
                <div className='col-12'>
                  <label className='form-label'>สถานะการชำระเงิน</label>
                  <div>
                    <PaymentStatus status={data.payment_status} />
                  </div>
                </div>
                <div className='col-12'>
                  <label className='form-label'>ส่งบทความเมื่อ</label>
                  <p>
                    <span className='badge bg-success'>
                      {dayjs(data.createdAt).format('DD MMM YYYY HH:MM')}
                    </span>
                  </p>
                </div>
                <div className='col-12'>
                  <label className='form-label'>แก้ไขล่าสุดเมื่อ</label>
                  <p>
                    <span className='badge bg-success'>
                      {dayjs(data.updatedAt).format('DD MMM YYYY HH:MM')}
                    </span>
                  </p>
                </div>
                <div>
                  <hr />
                </div>
                <form onSubmit={handleUpdate}>
                  <h6 className='fw-bold mb-3'>แก้ไขรายละเอียดบทความ</h6>
                  <div className='mb-3'>
                    <label className='form-label'>คำสำคัญ</label>
                    <textarea rows={3} name='keyword' className='form-control' defaultValue={data.keyword} />
                    <div className='form-text'>ใช้ ',' ในการแบ่ง keyword</div>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>ชื่อผู้แต่ง</label>
                    <textarea rows={3} name='author' className='form-control' defaultValue={data.author} />
                    <div className="form-text">
                      ระบุชื่อผู้แต่งทุกท่าน
                    </div>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>ที่อยู่ในการติดต่อ</label>
                    <textarea rows={3} name='address' className='form-control' defaultValue={data.address} />
                  </div>
                  <div className='row gy-3'>
                    <div className='col-md-6 mb-3'>
                      <label className='form-label'>เบอร์โทร</label>
                      <input type='tel' pattern='[0-9]{10}' maxLength={10} name='contact' className='form-control' defaultValue={data.contact} />
                    </div>
                    <div className='col-md-6 mb-3'>
                      <label className='form-label'>อีเมล</label>
                      <input type='email' name='email' className='form-control' defaultValue={data.email} />
                    </div>
                  </div>
                  {paperFile.data &&
                    <div>
                      <h6 className='fw-bold mb-3'>ไฟล์เอกสาร</h6>
                      <div className='table-responsive'>
                        <table className='table'>
                          <thead className='table-info'>
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
                                  <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.original_file}`}>เพิ่มเติม</Link>
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
                  <div className='text-end'>
                    <button className='btn btn-primary' type='submit'>ยืนยันการแก้ไข</button>
                  </div>
                </form>
                {data.edit_paper?.map((items, index) => (
                  <div key={index}>
                    {index + 1} : {items}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className='card  shadow-sm'>
            {data.result === 'REVISE' && data.status === 'SUCCESS' &&
              <div className='card-body'>
                <div>
                  <h6 className='fw-bold card-title'>Upload บทความฉบับแก้ไข</h6>
                  <p>
                    แก้ไขให้แล้วเสร็จภายใน:
                  </p>
                  <ol>
                    {data.deadline?.map((date, index) => (
                      <li key={date._id}>{data.deadline.length > index + 1 ? <del>{dayjs(date.date).format('DD MM YYYY')}</del> : <p>{dayjs(date.date).format('DD MM YYYY')}</p>}</li>
                    ))}
                  </ol>
                  {paperFile.data &&
                    <div>
                      {paperFile.data.map((items) => (
                        <form onSubmit={e => hanleEditPaper(e, items._id)} key={items._id} className='mb-3'>
                          <label className='form-label'>Upload {items.name}</label>
                          <div>
                            <input name='edit' className='form-control' type='file' accept='.pdf, .doc' />
                            <div className='mt-3'>
                              <button type='submit' className='btn btn-outline-primary'>Upload</button>
                            </div>
                          </div>
                        </form>
                      ))}
                    </div>
                  }
                  <div className='text-end mt-3'>
                    <button type='button' onClick={() => setShowConfirmEdit(true)} className='btn btn-primary'>ยืนยันการแก้ไข</button>
                  </div>
                </div>
              </div>
            }
          </section>
        </div>
      }

      <section className='card shadow-sm my-3'>
        <div className='card-body'>
          <h6 className="fw-bold mb-3 card-title">ความคิดเห็นกรรมการ</h6>
          {data?.status !== 'SUCCESS' && 
            <p>รอการดำเนินการบทความ</p>
          }
          {comment.data && data?.status === 'SUCCESS' &&
            <div>
              {comment.data.length <= 0 &&
                <p>No Comment</p>
              }
              {comment.data.map((items, index) => (
                <div key={items._id}>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-0'>กรรมการท่านที่ {index + 1}</p>
                    <div>
                      <div>
                        <ReviewStatus status={items.status} />
                      </div>
                      <PaperResult status={items.result} />
                    </div>
                  </div>
                  <div>
                    {items.suggestion &&
                      <div>
                        ข้อแนะนำ: {items.suggestion}
                      </div>
                    }
                    {items.suggestion_file &&
                      <div>
                        ไฟล์ข้อแนะนำ
                        <Link to={`${api}/uploads/${items.suggestion_file}`} target='_blank' rel='noreferrer'>{items.suggestion_file}</Link>
                      </div>
                    }
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          }
        </div>
      </section>
      <section className='card  shadow-sm my-3'>
        <div className='card-body'>
          <h6 className="fw-bold mb-3 card-title">ระวัติความคิดเห็นกรรมการ</h6>
          {comment.data &&
            <div>
              {comment.data.length <= 0 ?
                <p>ไม่พบประวัติการแก้ไข</p> : (
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead className='table-dark'>
                        <tr>
                          <th>#</th>
                          <th>ประวัติ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comment.data.map((items, index) => (
                          <tr key={items._id}>
                            <td>{index + 1}</td>
                            <td>
                              <Link onClick={() => handleShowHistoryComment(items._id)}>View</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            </div>
          }
          <HistoryComment show={showHistoryComment} handleClose={handleCloseHistoryComment} id={HistoryCommentId} />
        </div>
      </section>
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
        {data &&
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
                      {dayjs(items.createdAt).format('DD MM YYYY HH:mm')}
                    </td>
                    <td>
                      <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.original_file}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

function HistoryComment(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    const fethHistory = async () => {
      try {
        const res = await axios.get('/api/history/read/' + props.id)
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (props.id) {
      fethHistory()
    }
  }, [props.id])

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ประวัติความเห็น</Modal.Title>
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
                        <Link target='_blank' rel='noreferrer' className='text-decoration-none' to={`${api}/uploads/${items.suggestion_file}`}>File ข้อแนะนำ</Link>
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