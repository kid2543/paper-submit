import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Bin from '../../asset/bin.png'

const api = process.env.REACT_APP_API_URL

function EditPartner({id}) {

  const [partnerUpload, setPartnerUpload] = useState(null)
  const [partnerData, setPartnerData] = useState([])
  const [partnerId, setPartnerId] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = (value, name) => {
    setShow(true)
    setPartnerId(value)
    setImagePath(name)
  }

  const fethPartner = async () => {
    try {
      const res = await axios.get(api + "/get/partner/" + id)
      console.log(res.data)
      setPartnerData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", partnerUpload)
    formData.append("confr_id", id)
    formData.append("desc", e.target.desc.value)
    try {
      const res = await axios.post(api + "/upload/partner/" + id, formData)
      alert("อัพโหลดข้อมูลสำเร็จ")
      setPartnerData([...partnerData, res.data])
      console.log(res.data)
    } catch (error) {
      alert("เกิดข้อผิดพลาด")
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
    fethPartner()
  }, [])

  return (
    <div>
      <div className='mb-5'>
        <h4 className='text-primary'>รูปผู้สนับสนุน</h4>
        <hr />
      </div>
      <ConfirmDel
        show={show}
        handleClose={handleClose}
        partnerId={partnerId}
        filename={imagePath}
        clearPartner={clearPartner}
      />
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='col-12 col-md-6 mb-3'>
            <label className='form-label text-muted'>เลือกรูป</label>
            <input required name='partner' onChange={e => setPartnerUpload(e.target.files[0])} accept='image/*' className='form-control' type='file' />
          </div>
          <div className='col-12 col-md-6 mb-3'>
            <label className='form-label text-muted'>คำอธิบายรูป</label>
            <input required name='desc' className='form-control' type='text' />
          </div>
        </div>
        <button className='btn btn-primary'>Upload</button>
      </form>
      {partnerData.length > 0 ? (
        <div className='row mt-3'>
          {partnerData?.map((item) => (
            <div key={item._id} className='col-4 col-md-2 mb-3'>
              <div className='text-center border rounded p-3 position-relative'>
                <img src={api + "/image/" + item.image} alt={item.desc} height={48} width={48} />
                <button onClick={() => handleShow(item._id, item.image)} type='button' className='position-absolute translate-middle top-0 start-100 btn btn-danger btn-sm'><ion-icon name="close"></ion-icon></button>
              </div>
            </div>
          ))}
        </div>
      ) : <p className='text-warning text-center mt-3'>ไม่พบรูป</p>}
    </div>
  )
}

export default EditPartner

function ConfirmDel({ show, handleClose, partnerId, filename, clearPartner }) {

  const delPartner = async () => {
    try {
      const del = await axios.delete(api + "/delete/partner/" + partnerId + "/" + filename)
      console.log(del)
      alert("ลบสำเร็จ")
    } catch (error) {
      alert("เกิดข้อผิดพลาด")
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
          <h4>ต้องการจะลบจริงหรือไม่</h4>
          <img src={Bin} alt="del" width={48} height={48} />
        </div>
        <div className='text-center'>
          <button onClick={handleClose} className='btn btn-dark me-3'>Cancel</button>
          <button onClick={delPartner} className='btn btn-outline-danger'>Confirm</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}