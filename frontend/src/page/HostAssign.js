import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PaperStatus, { PaperResult, ReviewStatus } from '../components/PaperStatus';
import PaymentStatus from '../components/PaymentStatus';
import useFetch from '../hook/useFetch';
import dayjs from 'dayjs';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

function HostAssign() {

  const { id, cate } = useParams()
  const [paper, setPaper] = useState({})
  const [reviewer, setReviewer] = useState([])
  const [list, setList] = useState([])
  const [newList, setNewList] = useState([])
  const [oldList, setOldList] = useState([])
  const paperFile = useFetch('/api/paperfile/read/' + id)

  // history modal
  const [showHistory, setShowHistory] = useState(false)
  const [HistoryData, setHistoryData] = useState({ id: "", name: "" })

  const handleShowHistory = (id, name) => {
    setHistoryData({ id, name })
    setShowHistory(true)
  }

  const handleCloseHistory = () => {
    setHistoryData({ id: "", name: "" })
    setShowHistory(false)
  }

  // confirm edit data
  const [showEditConfirm, setShowEditConfirm] = useState(false)
  const [editPaperCode, setEditPaperCode] = useState('')

  const handleShowEdit = (code) => {
    setEditPaperCode(code)
    setShowEditConfirm(true)
  }

  const handleCloseEdit = () => {
    setEditPaperCode('')
    setShowEditConfirm(false)
  }

  const handleEdit = async () => {
    try {
      const res = await axios.post('/api/assign/edit/paper/' + id, {
        paper_code: editPaperCode
      })
      toast.success('ยืนยันการแก้ไขสำเร็จ')
      setPaper(res.data)
      window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      handleCloseEdit()
    }

  }


  // handle delete
  const [showConfirmDelete, setShowConfrimDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleShowDelete = (id) => {
    setDeleteId(id)
    setShowConfrimDelete(true)
  }

  const handleCloseDelete = () => {
    setDeleteId('')
    setShowConfrimDelete(false)
  }

  const handleDelete = async (id) => {

    if (!id) {
      toast.warning('กรุณาเลือกรายการก่อนทำการลบ')
      return
    }

    try {
      await axios.delete('/api/assign/delete/' + id)
      setOldList(oldList.filter(items => items._id !== id))
      toast.success('ลบความเห็นกรรมการสำเร็จ')
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      handleCloseDelete()
    }
  }

  // modal data
  const [showUpload, setShowUpload] = useState(false)
  const [uploadData, setUploadData] = useState({
    _id: "",
    name: ""
  })

  const handleShowUpload = (id, name) => {
    setUploadData({ id, name })
    setShowUpload(true)
  }

  const handleCloseUpload = () => {
    setUploadData({ _id: "", name: "" })
    setShowUpload(false)
  }


  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get('/api/paper/host/' + id)
        setPaper(res.data)
        const category = await axios.get('/api/category/one/' + cate)
        setReviewer(category.data.reviewer_list)
        const oldAssign = await axios.get('/api/assign/' + id)
        setOldList(oldAssign.data)
        let temp = []
        for (let i in oldAssign.data) {
          temp.push(oldAssign.data[i].reviewer._id)
        }
        setList(temp)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPaper()
  }, [id, cate])


  // confirm assign
  const [showAssign, setShowAssign] = useState(false)
  const [loadingAssign, setLoadingAssign] = useState(false)
  const handleAssign = async (e) => {
    e.preventDefault()
    setLoadingAssign(true)
    try {
      for (let i in newList) {
        await axios.post('/api/assign', {
          reviewer: newList[i],
          paper_id: id
        })
      }
      const paper = await axios.patch('/api/paper/status', {
        id,
        status: 'REVIEW',
      })
      await axios.post('/api/notification', {
        user_id: paper.data.owner,
        title: `มอบหมายบทความ ${paper.paper_code}`,
        message: 'บทความของท่านได้ถูกมอบหมายให้กรรมการพิจารณาแล้ว กรุณาติดตามผลการตรวจบทความต่อไป'
      })
      toast.success('มอบหมายบทความสำเร็จ')
      setTimeout(
        window.location.reload(), 1000
      )
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setShowAssign(false)
      setLoadingAssign(false)
    }
  }

  const handleList = (checked, value) => {
    if (checked) {
      setNewList([...newList, value])
    } else {
      setNewList(newList.filter(items => items !== value))
    }
  }

  return (
    <div className='bg-light'>
      <ConfirmDialog
        show={showAssign}
        handleClose={() => setShowAssign(false)}
        header='ยืนยันการมอบหมาย'
        text='ต้องการยืนยันการมอบหมายบทความหรือไม่เนื่องจากจะไม่สามารถแก้ไขรายชื่อกรรมเมื่อมอบหมายไปแล้วได้'
        handleSubmit={handleAssign}
        loading={loadingAssign}
      />
      <ConfirmDialog
        show={showEditConfirm}
        handleClose={handleCloseEdit}
        header='ยืนยันการแก้ไข'
        text='ต้องการยืนยันการแก้ไขหรือไม่ ?'
        handleSubmit={handleEdit}
      />
      <ConfirmDeleteDialog
        header='ยืนยันการลบรายการตรวจบทความ'
        message='ต้องการลบรายการตรวจบทความของกรรมการท่านนี้หรือไม่'
        onCancel={handleCloseDelete}
        onConfirm={() => handleDelete(deleteId)}
        show={showConfirmDelete}
      />
      <div>
        <div className='card shadow-sm mb-3'>
          <div className='card-body'>
            <div>
              <h4 className='fw-bold'>มอบหมายบทความ</h4>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className='card  shadow-sm mb-3'>
          <div className='card-body'>
            <h4>รายละเอียดบทความ</h4>
            {paper &&
              <div>
                <div className='row row-cols-1 row-cols-md-4 g-3'>
                  <div>
                    <div>
                      <small className='fw-bold'>ชื่อบทความ</small>
                    </div>
                    <small>{paper.title}</small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>รหัสบทความ</small>
                    </div>
                    <small>{paper.paper_code}</small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>ผู้แต่ง</small>
                    </div>
                    <small>{paper.author}</small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>ผู้ส่งบทความ</small>
                    </div>
                    <small>{paper.owner?.name} ({paper.owner?.username})</small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>สถานะบทความ</small>
                    </div>
                    <small>
                      <PaperStatus status={paper.status} />
                    </small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>ผลลัพธ์บทความ</small>
                    </div>
                    <small>
                      <PaperResult status={paper.result} />
                    </small>
                  </div>
                  <div>
                    <div>
                      <small className='fw-bold'>สถานะชำระเงิน</small>
                    </div>
                    <small>
                      <PaymentStatus status={paper.payment_status} />
                    </small>
                  </div>
                  {paper.payment_image ? (
                    <div>
                      <div>
                        <small className='fw-bold'>หลักฐานการชำระเงิน</small>
                      </div>
                      <small>
                        <Link to={`/uploads/${paper.payment_image}`}>{paper.payment_image}</Link>
                      </small>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <small className='fw-bold'>หลักฐานการชำระเงิน</small>
                      </div>
                      <small>
                        -
                      </small>
                    </div>
                  )
                  }
                </div>
                <div className='col-12 my-5'>
                  <h4>รายการบทความ</h4>
                  <div className="text-warning mb-3">
                    ** กรุณาอัพโหลดไฟล์ ปิดชื่อ เนื่องจากหากไม่อัพโหลดกรรมการจะไม่สามารถอ่านไฟล์ได้
                  </div>
                  {paperFile.data &&
                    <div className='table-resonsive'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>
                              วันที่ส่ง
                            </th>
                            <th>
                              แก้ไขเมื่อ
                            </th>
                            <th>
                              ชื่อไฟล์
                            </th>
                            <th>
                              ไฟล์ต้นฉบับ
                            </th>
                            <th>
                              ไฟล์ปิดชื่อ
                            </th>
                            <th>
                              ประวัติ
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {paperFile.data.map(items => (
                            <tr key={items._id}>
                              <td>
                                {dayjs(items.createdAt).format('DD MMM YYYY')}
                              </td>
                              <td>
                                {dayjs(items.updatedAt).format('DD MMM YYYY HH:mm')}
                              </td>
                              <td>
                                {items.name}
                              </td>
                              <td>
                                <Link target='_blank' rel='noreferrer' to={`/uploads/${items.original_file}`} className='btn btn-link'>ดูไฟล์</Link>
                              </td>
                              <td>
                                {items.close_name_file ? (
                                  <Link target='_blank' rel='noreferrer' to={`/uploads/${items.close_name_file}`} className='btn btn-link'>ดูไฟล์</Link>
                                ) : (
                                  <button onClick={() => handleShowUpload(items._id, items.name)} type='button' className='btn btn-outline-primary'><i className="bi bi-upload"></i></button>
                                )}
                              </td>
                              <td>
                                <Link type='button' onClick={() => handleShowHistory(items._id, items.name)} className='btn btn-outline-primary btn-sm'>ดูประวัติ</Link>
                              </td>
                            </tr>
                          ))}
                          <UploadCloseNameFile
                            show={showUpload}
                            data={uploadData}
                            handleClose={handleCloseUpload}
                            list={paperFile}
                          />
                          <HistotyDetail
                            id={HistoryData.id}
                            name={HistoryData.name}
                            show={showHistory}
                            handleClose={handleCloseHistory}
                          />
                        </tbody>
                      </table>
                    </div>
                  }
                  {paper.status === 'PENDING' && paper.deadline?.length > 0 &&
                    <div>
                      <div className="form-text mb-3">ในกรณีที่มีการแก้ไขให้อัพโหลดไฟล์บทความปิดชื่อใหม่ และกด "ยืนยันการแก้ไข" เพื่อมอบหมายให้กรรมการตรวจอีกครั้ง</div>
                      <button onClick={() => handleShowEdit(paper.paper_code)} type='button' className='btn btn-primary'>ยืนยันการแก้ไข</button>
                    </div>
                  }
                </div>
                {paper.deadline?.length > 0 &&
                  <div className='col-12 col-md-6 col-lg-4'>
                    <small className='fw-bold'>Deadline</small>
                    <ol>
                      {paper.deadline.map((items) => (
                        <li key={items._id}>{items.name}: {dayjs(items.date).format('DD MMM YYYY')}</li>
                      ))}
                    </ol>
                  </div>
                }
              </div>
            }
          </div>
        </div>
        {paperFile &&
          <section>
            <div className='card  shadow-sm mb-3'>
              <div className='card-body'>
                <h4 className="card-title">ข้อมูลกรรมการที่มอบหมายแล้ว</h4>
                <div className='table-responsive'>
                  <table className='table table-hover'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ชื่อกรรมการ</th>
                        <th>ชื่อผู้ใช้งาน</th>
                        <th>สถานะ</th>
                        <th>ผลลัพธ์</th>
                        <th>ลบ</th>
                      </tr>
                    </thead>
                    {oldList.length > 0 ? (
                      <tbody>
                        {oldList.map((items, index) => (
                          <tr key={items._id}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {items.reviewer.name}
                            </td>
                            <td>
                              {items.reviewer.username}
                            </td>
                            <td>
                              <ReviewStatus status={items.status} />
                            </td>
                            <td>
                              <PaperResult status={items.result} />
                            </td>
                            <td>
                              {items.status === 'PENDING' &&
                                <button
                                  onClick={() => handleShowDelete(items._id)}
                                  type='button'
                                  className="btn btn-light text-danger">
                                  <i className="bi bi-trash"></i>
                                </button>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td className='text-center p-3' colSpan={6}>ไม่พบข้อมูล</td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
            <form>
              <div className='card  shadow-sm'>
                <div className='card-body'>
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h4 className="card-title">รายชื่อกรรมการ</h4>
                    <Link className='btn btn-primary' to={`/host/edit/category/${cate}`}>
                      <i className="bi bi-plus-lg me-2"></i>
                      เพิ่มกรรมการในหัวข้อนี้
                    </Link>
                  </div>
                  {reviewer &&
                    <div className='table-responsive'>
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>ชื่อกรรมการ</th>
                            <th>ชื่อผู้ใช้</th>
                            <th>จำนวนบทความ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewer.map((items) => (
                            <tr key={items._id}>
                              <td>
                                <input
                                  type='checkbox'
                                  value={items._id}
                                  onChange={e => handleList(e.target.checked, items._id)}
                                  defaultChecked={list.some(lists => lists === items._id)}
                                  disabled={list.some(lists => lists === items._id)}
                                />
                              </td>
                              <td>
                                {items.name}
                              </td>
                              <td>
                                {items.username}
                              </td>
                              <td>
                                <NumberPaper id={items._id} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  }
                  <div className="text-end">
                    <button
                      type='button'
                      onClick={() => setShowAssign(true)}
                      className='btn btn-primary'
                      disabled={newList.length < 3 && oldList.length <= 0}>
                      <i className="me-2 bi bi-check"></i>
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        }
      </div>
    </div>
  )
}

export default HostAssign

function NumberPaper(props) {

  const [number, setNumber] = useState(null)

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const res = await axios.get('/api/assign/number/' + props.id)
        setNumber(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchNumber()
  }, [props.id])

  if (!number) {
    return <span>0</span>
  } else {
    return <span>{number}</span>
  }

}

function UploadCloseNameFile(props) {

  const [uploadFile, setUploadFile] = useState(null)

  const [loading, setLoading] = useState(false)
  const handleUpload = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('_id', props.data.id)
      formData.append('file', uploadFile)
      const res = await axios.post('/api/paperfile/close/name', formData)
      let temp = [...props.list.data]
      const newData = temp.map(prev => {
        if (prev._id === props.data.id) {
          return prev = res.data
        } else {
          return prev
        }
      })
      props.list.setData(newData)
      toast.success('อัพโหลดสำเร็จ')
      props.handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>อัพโหลดบทความฉบับปิดชื่อ:  <br /> <span className="text-primary">{props.data.name}</span></Modal.Title>
      </Modal.Header>
      <form onSubmit={handleUpload}>
        <Modal.Body>
          <label className='form-label'>เลือกไฟล์</label>
          <input onChange={e => setUploadFile(e.target.files[0])} className='form-control' type='file' accept='.pdf, .doc' required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={props.handleClose}>
            ปิด
          </Button>
          {loading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <Button variant="primary" type='submit'>
              <i className="me-2 bi bi-upload"></i>
              อัพโหลด
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  )
}

function HistotyDetail(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    const fethHistory = async () => {
      try {
        const res = await axios.get('/api/editpaper/read/' + props.id)
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
        <Modal.Title>ประวัติการแก้ไข: {props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.length > 0 ? (
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>แก้ไขเมื่อ</th>
                  <th>ต้นฉบับ</th>
                  <th>ปิดชื่อ</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((items) => (
                  <tr key={items._id}>
                    <td>{dayjs(items.createdAt).format('DD MMM YYYY HH:mm')}</td>
                    <td>
                      <Link target='_blank' rel='noreferrer' to={`/uploads/${items.original_file}`}>View</Link>
                    </td>
                    <td>
                      <Link target='_blank' rel='noreferrer' to={`/uploads/${items.close_name_file}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="text-center">ไม่พบข้อมูล</div>}
      </Modal.Body>
    </Modal>
  )

}