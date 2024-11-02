import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ImageNotFound from '../../asset/404.png'

const api = process.env.REACT_APP_API_URL

function EditVenue({ data, image, handleChange, handleImage, handleUpload, handleSubmit }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpload, setShowUpload] = useState(false);

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดสถานที่ท่องเที่ยว</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className='mb-3'>
              <label className='form-label'>ชื่อสถานที่</label>
              <input name='name' className='form-control' defaultValue={data?.name} onChange={e => handleChange(e)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>รายละเอียด</label>
              <textarea name='desc' className='form-control' defaultValue={data?.desc} onChange={e => handleChange(e)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>รายละเอียดเพิ่มเติม</label>
              <textarea name='remark' className='form-control' defaultValue={data?.remark} onChange={e => handleChange(e)} />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Link สถานที่ท่องเที่ยว</label>
              <input name='travel' className='form-control' defaultValue={data?.travel} onChange={e => handleChange(e)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showUpload} onHide={handleCloseUpload}>
        <Modal.Header closeButton>
          <Modal.Title>New Upload</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpload}>
          <Modal.Body>
            <label className='text-muted form-label'>รูปสถานที่</label>
            <input name='venue_image' type='file' className='form-control' onChange={e => handleImage(e)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpload}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Upload
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className='container my-5'>
        <h4 className='fw-bold mb-3'>สถานที่จัดงาน</h4>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='text-muted'>แก้ไขรายละเอียดสถานที่ท่องเที่ยว</p>
          <button className='btn btn-outline-primary btn-sm' type='button' onClick={handleShow}><ion-icon name="pencil-outline"></ion-icon> Edit</button>
        </div>
      </div>
      <div>
        <div className='row align-items-center gy-3'>
          <div className='col-lg-6'>
            <div>
              {image ? (
                <img src={api + "/image/" + image} alt={'venue' + image} />
              ) : <img src={ImageNotFound} alt='...' />}
              <div className='mt-3'>
                <button type='button' className='btn btn-primary' onClick={handleShowUpload}><ion-icon name="arrow-up-outline"></ion-icon> Upload</button>
              </div>
            </div>

          </div>
          <div className='col-lg-6'>
            <div>
              <h4>{data?.name}</h4>
            </div>
            <div>
              <p>{data?.desc}</p>
            </div>
            <div>
              <p>{data?.remark}</p>
            </div>
            <div>
              ต้องการรายละเอียดเพิ่มเติม <a href={data?.travel} target='_blank' rel='noreferrer'>{data?.travel}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditVenue