import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// react-bootstrap
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useLogout } from '../hook/useLogout';
import PaperStatus, { PaperResult, ReviewStatus } from '../components/PaperStatus';
import { useAuthContext } from '../hook/useAuthContext';
import PaymentStatus from '../components/PaymentStatus';
import useFetch from '../hook/useFetch';
import dayjs from 'dayjs';

const api = process.env.REACT_APP_API_URL

function HostAssign() {

  const { user } = useAuthContext()
  const { id, cate } = useParams()
  const [paper, setPaper] = useState({})
  const [reviewer, setReviewer] = useState([])
  const [list, setList] = useState([])
  const [oldList, setOldList] = useState([])
  const { logout } = useLogout()
  const naviagate = useNavigate()
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
  const handleEdit = async () => {
    if (window.confirm('ยืนยันการแก้ไขหรือไม่ ?')) {
      try {
        const res = await axios.post('/api/assign/edit/paper/' + id)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // handle read original file
  const handleReadOriginalFile = async (e, id) => {
    const { checked } = e.target
    if (window.confirm('ต้องการให้กรรมการอ่านไฟล์ต้นฉบับหรือไม่')) {
      try {
        const res = await axios.patch('/api/paperfile/original/read/' + id, { read_original: checked })
        let temp = [...paperFile.data]
        const update = temp.map(prev => {
          if (prev._id === id) {
            return res.data
          } else {
            return prev
          }
        })
        paperFile.setData(update)
        alert('Success')
      } catch (error) {
        console.log(error)
        alert('Error')
      }
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
      } catch (error) {
        console.log(error)
      }
    }

    fetchPaper()
  }, [id, cate])

  const handleLogout = () => {
    logout()
    naviagate('/')
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    if (window.confirm('ยืนยันการมอบหมายงานหรือไม่?')) {
      try {
        for (let i in list) {
          await axios.post('/api/assign', {
            reviewer: list[i],
            paper_id: id
          })
        }
        await axios.patch('/api/paper/status', {
          id,
          status: 'REVIEW',
        })
        alert('Success')
        window.location.reload()
      } catch (error) {
        console.log(error)
        alert('Error')
      }
    }
  }

  const handleList = (e) => {
    if (e.target.checked) {
      setList([...list, e.target.value])
    } else {
      setList(list.filter(items => items !== e.target.value))
    }
  }

  return (
    <div className='container my-5'>
      <div className='card border-0 shadow-sm mb-5'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='mb-0 fw-bold'>ดูผลลัพธ์บทความ</h5>
            <Dropdown>
              <Dropdown.Toggle className='border-0 text-primary' variant="" id="dropdown-basic">
                <span className='me-2'><i className="bi bi-person-circle"></i></span>
                {user}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/host">Dashboard</Dropdown.Item>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item type='button' onClick={handleLogout} className='text-danger'>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className='card border-0 shadow-sm mb-5'>
        <div className='card-body'>
          <p>รายละเอียดบทความ</p>
          {paper &&
            <div className='row g-3'>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>ชื่อบทความ</small>
                </div>
                <small>{paper.title}</small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>รหัสบทความ</small>
                </div>
                <small>{paper.paper_code}</small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>ผู้แต่ง</small>
                </div>
                <small>{paper.author}</small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>ผู้ส่งบทความ</small>
                </div>
                <small>{paper.owner?.name} ({paper.owner?.username})</small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>สถานะบทความ</small>
                </div>
                <small>
                  <PaperStatus status={paper.status} />
                </small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>ผลลัพธ์บทความ</small>
                </div>
                <small>
                  <PaperResult status={paper.result} />
                </small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>สถานะชำระเงิน</small>
                </div>
                <small>
                  <PaymentStatus status={paper.payment_status} />
                </small>
              </div>
              {paper.payment_image &&
                <div className='col-12 col-md-6 col-lg-4'>
                  <div>
                    <small className='fw-bold'>หลักฐานการชำระเงิน</small>
                  </div>
                  <small>
                    <Link to={`${api}/uploads/${paper.payment_image}`}>{paper.payment_image}</Link>
                  </small>
                </div>
              }
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>ที่อยู่ในการติดต่อ</small>
                </div>
                <small>
                  {paper.address}
                </small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>Email</small>
                </div>
                <small>{paper.email}</small>
              </div>
              <div className='col-12 col-md-6 col-lg-4'>
                <div>
                  <small className='fw-bold'>เบอร์โทร</small>
                </div>
                <small>{paper.contact}</small>
              </div>
              <div className='col-12'>
                <p className='fw-bold'>รายการบทความ</p>
                {paperFile.data &&
                  <div className='table-resonsive'>
                    <table className='table'>
                      <thead className='table-dark'>
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
                            อ่านไฟล์ต้นฉบับ
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
                              {dayjs(items.createdAt).format('DD/MM/YYYY')}
                            </td>
                            <td>
                              {dayjs(items.updatedAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td>
                              {items.name}
                            </td>
                            <td>
                              <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.original_file}`} className='btn text-primary'>View</Link>
                            </td>
                            <td>
                              <div>
                                <input type='checkbox' checked={items.read_original} onChange={e => handleReadOriginalFile(e, items._id)} />
                              </div>
                            </td>
                            <td>
                              {items.close_name_file ? (
                                <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.close_name_file}`} className='btn text-primary'>View</Link>
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
                {paper.status === 'PENDING' &&
                  <div>
                    <button onClick={handleEdit} type='button' className='btn btn-primary'>ยืนยันการแก้ไข</button>
                  </div>
                }
              </div>
              {paper.deadline &&
                <div className='col-12 col-md-6 col-lg-4'>
                  <small className='fw-bold'>Deadline</small>
                  <ol>
                    {paper.deadline.map((items) => (
                      <li key={items._id}>{items.name}: {dayjs(items.date).format('DD/MM/YYYY')}</li>
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
          <div className='card border-0 shadow-sm mb-5'>
            <div className='card-body'>
              <p>ข้อมูลกรรมการที่มอบหมายแล้ว</p>
              <div className='table-responsive'>
                <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ชื่อกรรมการ</th>
                      <th>ชื่อผู้ใช้งาน</th>
                      <th>สถานะ</th>
                      <th>ผลลัพธ์</th>
                    </tr>
                  </thead>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <form onSubmit={handleAssign}>
            <div className='card border-0 shadow-sm'>
              <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>รายชื่อกรรมการ</p>
                  <Link className='btn btn-primary' to={`/host/edit/category/${cate}`}>เพิ่มกรรมการในหัวข้อนี้</Link>
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
                              <input type='checkbox' value={items._id} onChange={e => handleList(e)} disabled={oldList.some(list => list.reviewer._id === items._id)} />
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
                <button className='btn btn-primary' disabled={list.length <= 0}>Assign</button>
              </div>
            </div>
          </form>
        </section>
      }
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

  const handleUpload = async (e) => {
    e.preventDefault()
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
      alert('Success')
      props.handleClose()
    } catch (error) {
      console.log(error)
      alert('Error')
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Uploadบทความฉบับปิดชื่อ: {props.data.name}</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleUpload}>
        <Modal.Body>
          <label className='form-label'>เลือกไฟล์</label>
          <input onChange={e => setUploadFile(e.target.files[0])} className='form-control' type='file' accept='.pdf, .doc' required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Upload
          </Button>
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
                  <td>{dayjs(items.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                  <td>
                    <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.original_file}`}>View</Link>
                  </td>
                  <td>
                    <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.close_name_file}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" type='submit'>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  )

}