import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Bin from '../asset/bin.png'
import { toast } from 'react-toastify'


function HostPartner() {

  const id = sessionStorage.getItem('host_confr')
  const [partnerUpload, setPartnerUpload] = useState(null)
  const [partnerData, setPartnerData] = useState([])
  const [partnerId, setPartnerId] = useState("")
  const [show, setShow] = useState(false)
  const [showCreate, setShowCreate] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = (value) => {
    setShow(true)
    setPartnerId(value)
  }

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", partnerUpload)
    formData.append("confr_id", id)
    formData.append("desc", e.target.desc.value)
    try {
      const res = await axios.post('/api/partner', formData)
      toast.success("อัพโหลดข้อมูลสำเร็จ")
      setPartnerData([...partnerData, res.data])
      handleCloseCreate()
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด")
      console.log(error)
    } finally {
      e.target.partner.value = ""
      e.target.desc.value = null
    }
  }

  const clearPartner = (partnerId) => {
    setPartnerData(partnerData.filter((item) => item._id !== partnerId))
  }

  useEffect(() => {

    const fethPartner = async () => {
      try {
        const res = await axios.get(`/api/partner/${id}`)
        setPartnerData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fethPartner()
  }, [id])

  return (
    <div>
      <div className='mb-3 card'>
        <div className='card-body'>
          <h4 className='fw-bold card-title'>รูปผู้สนับสนุน</h4>
          <p className='text-muted card-text'>เพิ่มและแก้ไขรูปภาพผู้สนับสนุนได้ที่นี่</p>
        </div>
      </div>
      <CreatePartnerModal
        show={showCreate}
        handleClose={handleCloseCreate}
        handleSubmit={handleSubmit}
        setPartnerUpload={setPartnerUpload}
        partnerUpload={partnerUpload}
      />
      <ConfirmDel
        show={show}
        handleClose={handleClose}
        partnerId={partnerId}
        clearPartner={clearPartner}
      />
      <div className='card shadow-sm'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h4 className='card-title'>รายการผู้สนับสนุน</h4>
            <button className='btn btn-primary' type='button' onClick={handleShowCreate}>
              <i className='bi bi-plus-lg me-2'></i>เพิ่มรูปผู้สนับสนุน
            </button>
          </div>
          {partnerData.length > 0 && (
            <div className='row g-3 mt-3'>
              {partnerData?.map((item) => (
                <div key={item._id} className='col-auto'>
                  <div className="btn-group">
                    <div className="border">
                      <img src={`/uploads/${item.image}`} alt={item.desc} height={128} />
                    </div>
                    <button className='btn btn-outline-danger' onClick={() => handleShow(item._id)} type='button' >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostPartner

function ConfirmDel({ show, handleClose, partnerId, clearPartner }) {

  const delPartner = async () => {
    try {
      const del = await axios.delete(`/api/partner/${partnerId}`)
      console.log(del)
      toast.success("ลบสำเร็จ")
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด")
      console.log(error)
    } finally {
      handleClose()
      clearPartner(partnerId)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className='text-center my-5'>
          <img src={Bin} alt="del" width={48} height={48} className="mb-3" />
          <h4>ต้องการจะลบจริงหรือไม่</h4>
        </div>
        <div className='text-center'>
          <button onClick={handleClose} className='btn btn-dark me-3'>ยกเลิก</button>
          <button onClick={delPartner} className='btn btn-outline-danger'>ยืนยันการลบ</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

function CreatePartnerModal({ show, handleClose, setPartnerUpload, partnerUpload, handleSubmit }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มรูปผู้สนับสนุน</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className='mb-3'>
            <label className='form-label text-muted'>เลือกรูป</label>
            <input required name='partner' onChange={e => setPartnerUpload(e.target.files[0])} accept='image/*' className='form-control' type='file' />
          </div>
          <div className='mb-3'>
            <label className='form-label text-muted'>คำอธิบายรูป</label>
            <input required name='desc' className='form-control' type='text' placeholder='ไม่มีให้ใส่ -' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" disabled={!partnerUpload}>
            <i className="bi bi-upload me-2"></i>
            อัพโหลด
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}