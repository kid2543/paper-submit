import React, { useState } from 'react'
import useFetch from '../hook/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';

function HostEditGuideline() {

  const id = sessionStorage.getItem('host_confr')
  const { data, setData, loading, error } = useFetch('/api/conference/host/' + id)

  // modal data
  const [showPresenter, setShowPresenter] = useState(false)
  const [showChair, setShowChair] = useState(false)
  const [showAudience, setShowAudience] = useState(false)

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div>
      <div className='mb-3 card'>
        <div className='card-body'>
          <h4 className='fw-bold card-title'>ข้อแนะนำ</h4>
          <p className='text-muted card-text'>เพิ่มและแก้ไขข้อแนะนำสำหรับการส่งบทความได้ที่นี่</p>
        </div>
      </div>
      {data &&
        <div>
          <div className='card  shadow-sm mb-3'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 className='card-title'>ผู้ส่งบทความ</h4>
                <div>
                  <button className='btn' type='button' onClick={() => setShowPresenter(true)}>
                    <i className='bi bi-pencil-square'></i>
                  </button>
                </div>
              </div>
              <PresenterModal show={showPresenter} handleClose={() => setShowPresenter(false)} id={id} setData={setData} data={data.guide_for_presenter} />
              <ol>
                {data.guide_for_presenter.map((items, index) => (
                  <li key={index}>{items}</li>
                ))}
              </ol>

            </div>
          </div>
          <div className='card  shadow-sm mb-3'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 className='card-title'>กรรมการ</h4>
                <button className='btn' type='button' onClick={() => setShowChair(true)}>
                  <i className='bi bi-pencil-square'></i>
                </button>
              </div>
              <ChairModal show={showChair} handleClose={() => setShowChair(false)} id={id} setData={setData} data={data.guide_for_chair} />
              <ol>
                {data.guide_for_chair.map((items, index) => (
                  <li key={index}>{items}</li>
                ))}
              </ol>
            </div>
          </div>
          <div className='card  shadow-sm mb-3'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <h4 className='card-title'>ผู้เข้าชม</h4>
                <button className='btn' type='button' onClick={() => setShowAudience(true)}>
                  <i className='bi bi-pencil-square'></i>
                </button>
              </div>
              <AudienceModal show={showAudience} handleClose={() => setShowAudience(false)} id={id} setData={setData} data={data.guide_for_audience} />
              <ol>
                {data.guide_for_audience.map((items, index) => (
                  <li key={index}>{items}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default HostEditGuideline

function PresenterModal(props) {

  const [list, setList] = useState(props.data || [])

  const handleAdd = () => {
    setList([...list, ""])
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    let temp = [...list]
    temp[index] = value
    setList(temp)
  }

  const handleDelete = (index) => {
    let temp = [...list]
    temp = temp.filter((lists, idx) => idx !== index)
    setList(temp)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const deleteEmpty = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_presenter: deleteEmpty
      })
      props.setData(res.data)
      toast.success('แก้ไขสำเร็จ')
      props.handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ข้อแนะนำสำหรับผู้ส่งบทความ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3 mb-3">
          {list.map((items, index) => (
            <div key={index}>
              <div className="form-text">
                ข้อที่: {index + 1}
              </div>
              <hr />
              <div className="text-end mb-3">
                <button
                  type='button'
                  onClick={() => handleDelete(index)}
                  className="btn btn-outline-danger"
                >
                  <i className="bi bi-trash me-2"></i>
                  ลบรายละเอียด
                </button>
              </div>
              <label className='form-label'>รายละเอียดข้อแนะนำ</label>
              <textarea
                rows={5}
                className='form-control'
                value={items}
                onChange={e => handleChange(e, index)} />
            </div>
          ))}
        </div>
        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
          <i className="me-2 bi bi-plus-lg"></i>
          เพิ่มหัวข้อ
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          ปิด
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
function ChairModal(props) {
  const [list, setList] = useState(props.data || [])

  const handleAdd = () => {
    setList([...list, ""])
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    let temp = [...list]
    temp[index] = value
    setList(temp)
  }

  const handleDelete = (index) => {
    let temp = [...list]
    temp = temp.filter((lists, idx) => idx !== index)
    setList(temp)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const filterList = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_chair: filterList
      })
      props.setData(res.data)
      toast.success('แก้ไขสำเร็จ')
      props.handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ข้อแนะนำสำหรับกรรมการ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3 mb-3">
          {list.map((items, index) => (
            <div key={index}>
              <div className="form-text">
                ข้อที่: {index + 1}
              </div>
              <hr />
              <div className="mb-3 text-end">
                <button type='button' onClick={() => handleDelete(index)} className="btn btn-outline-danger">
                  <i className="bi bi-trash me-2"></i>
                  ลบรายละเอียด
                </button>
              </div>
              <label className='form-label'>รายละเอียดข้อแนะนำ</label>
              <textarea
                className='form-control'
                value={items}
                rows={5}
                onChange={e => handleChange(e, index)}
              />
            </div>
          ))}
        </div>
        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
          <i className="me-2 bi bi-plus-lg"></i>
          เพิ่มหัวข้อ
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          ปิด
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
function AudienceModal(props) {
  const [list, setList] = useState(props.data || [])

  const handleAdd = () => {
    setList([...list, ""])
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    let temp = [...list]
    temp[index] = value
    setList(temp)
  }

  const handleDelete = (index) => {
    let temp = [...list]
    temp = temp.filter((lists, idx) => idx !== index)
    setList(temp)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const filterList = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_audience: filterList
      })
      props.setData(res.data)
      toast.success('แก้ไขสำเร็จ')
      props.handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ข้อแนะนำสำหรับผู้เข้าชม</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3 mb-3">
          {list.map((items, index) => (
            <div key={index}>
              <div className="form-text">
                ข้อที่: {index + 1}
              </div>
              <hr />
              <div className='text-end mb-3'>
                <button
                  className="btn btn-outline-danger"
                  type='button'
                  onClick={() => handleDelete(index)}
                >
                  <i className="bi bi-trash me-2"></i>
                  ลบรายละเอียด
                </button>
              </div>
              <label className='form-label'>รายละเอียดข้อแนะนำ</label>
              <textarea
                className='form-control'
                value={items}
                onChange={e => handleChange(e, index)}
                rows={5}
              />
            </div>
          ))}
        </div>
        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>
          <i className="me-2 bi bi-plus-lg"></i>
          เพิ่มหัวข้อ
        </button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          ปิด
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}