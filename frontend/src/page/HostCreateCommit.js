import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// react-bootstrap
import { Modal, Button, Breadcrumb } from 'react-bootstrap'

function HostCreateCommit() {

  const [error, setError] = useState(null)
  const cate_id = sessionStorage.getItem('cate_id')

  // comfrim modal state
  const [show, setShow] = useState(false)
  const [modalData, setModalData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setModalData({ ...modalData, [name]: value })
  }

  const handleShow = (e) => {
    e.preventDefault()
    if (modalData.password !== modalData.confirm_password) {
      toast.error('รหัสผ่านไม่ตรงกัน')
      return
    }
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  // end modal state

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/user/committee', {
        username: modalData.username,
        password: modalData.password,
        name: modalData.name,
        email: modalData.email
      })
      toast.success(
        <div>
          สร้างผู้ใช้งานสำเร็จ
          <div className='text-end'>
            <button type='button' onClick={() => navigate(-1)} className='btn btn-dark btn-sm'>
              ย้อนกลับ
            </button>
          </div>
        </div>
      )
      setModalData({
        name: '',
        email: '',
        password: '',
        username: '',
        confirm_password: '',
      })
      handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด ' + error.response.data?.error)
      setError(error.response.data?.error)
      handleClose()
    }
  }

  return (
    <div>
      <div className='card mb-3' >
        <div className="card-body">
          <Breadcrumb>
            <Breadcrumb.Item href="/host/edit/category">หัวข้องานประชุม</Breadcrumb.Item>
            <Breadcrumb.Item href={`/host/edit/category/${cate_id}`}>
              แก้ไขหัวข้องานประชุม
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              เพิ่มกรรมการ
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4 className='fw-bold card-title'>เพิ่มกรรมการ</h4>
          <p className='text-muted card-text'>กรอกรายละเอียดกรรมการและเพิ่มกรรมการได้ที่นี่</p>
        </div>
      </div>
      <div className='card  shadow-sm'>

        <div className='card-body'>
          <form onSubmit={handleShow}>
            <ConfirmCreateCommittee
              show={show}
              handleClose={handleClose}
              data={modalData}
              handleCreate={handleCreate}
            />
            <div className='row gy-3'>
              <div className='col-12 col-md-12'>
                <label className='form-label'>ชื่อ - นามสกุล</label>
                <input required className='form-control' name='name' value={modalData.name} onChange={e => handleChange(e)} type='text' />
              </div>
              <div className='col-12 col-md-12'>
                <label className='form-label'>อีเมล</label>
                <input required className='form-control' name='email' value={modalData.email} onChange={e => handleChange(e)} type='email' />
              </div>
              <div className='col-12'>
                <label className='form-label'>ชื่อผู้ใช้</label>
                <input required className='form-control' name='username' value={modalData.username} onChange={e => handleChange(e)} type='text' />
                <div className="form-text">
                  ชื่อผู้ใช้งานจะประกอบด้วยตัวอักษรและตัวเลข 8-20 ตัวอักษร และสามารถใช้ . และ _ ได้
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <label className='form-label'>รหัสผ่าน</label>
                <input required className='form-control' name='password' type='password' value={modalData.password} onChange={e => handleChange(e)} />
                <div className='form-text'>
                  รหัสผ่านประกอบด้วย ตัวเลขและตัวอักษรอย่างน้อย 8 ตัวอักษร และต้องมี พิมพ์ใหม่ พิมพ์เล็ก และตัวอักษรพิเศษ อย่างละ 1 ตัวอักษร
                </div>
              </div>
              <div className='col-12 col-md-6'>
                <label className='form-label'>ยืนยันรหัสผ่าน</label>
                <input required className='form-control' name='confirm_password' value={modalData.confirm_password} onChange={e => handleChange(e)} pattern={modalData.password} type='password' />
              </div>
            </div>
            <div className='text-end mt-3'>
              <button type='submit' className='btn btn-primary'>
                <i className='bi bi-plus-lg me-2'></i>
                เพิ่ม
              </button>
            </div>
            {error &&
              <div className='text-danger'>
                {error}
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default HostCreateCommit

function ConfirmCreateCommittee(props) {

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ยืนยันข้อมูลผู้ใช้</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.data &&
          <div className='row row-cols-2 g-3'>
            <div>
              <div>
                ชื่อ - นามสกุล
              </div>
              <small className='text-muted'>{props.data.name}</small>
            </div>
            <div>
              <div>
                อีเมล
              </div>
              <small className='text-muted'>{props.data.email}</small>
            </div>
            <div>
              <div>
                ชื่อผู้ใช้
              </div>
              <small className='text-muted'>{props.data.username}</small>
            </div>
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={props.handleCreate}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
