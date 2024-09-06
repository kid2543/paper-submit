import React, { useState } from 'react'
import Bin from '../../asset/bin.png'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from 'react-router-dom'

function EditCate({ cate, setCate }) {

  const [isCreateModal, setIsCreateModal] = useState(false)
  const showIsCreateModal = () => setIsCreateModal(true)
  const closeIsCreateModal = () => setIsCreateModal(false)

  const [isDelModal, setIsDelModal] = useState(false)
  const showIsDelModal = () => setIsDelModal(true)
  const closeIsDelModal = () => setIsDelModal(false)

  const [cateCode, setCateCode] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [icon, setIcon] = useState(null)

  const createCate = () => {

    const input = {
      cate_code: cateCode,
      name: name,
      desc: desc,
      icon: icon,
    }

    setCate(oldData => [input, ...oldData])
    closeIsCreateModal()
  }

  return (
    <div className='mb-5'>
      <div>
        <ModalHostCreateCate
          show={isCreateModal}
          handleClose={closeIsCreateModal}
          createCate={createCate}
          setCateCode={setCateCode}
          setName={setName}
          setDesc={setDesc}
          setIcon={setIcon}
        />
        <DelConfirm
          show={isDelModal}
          handleClose={closeIsDelModal}
        />
      </div>
      <div className='mb-3'>
        <h4 className='text-primary'>หัวข้องานประชุม</h4>
        <hr />
      </div>
      <button onClick={showIsCreateModal} type='button' className='btn btn-primary'>Create New +</button>
      <div className='mt-3'>
        <ul className='list-group'>
          {cate?.length > 0 ? (
            <>
              {cate.map((cates,index) => (
                <li key={index} className='list-group-item p-3'>
                  <div className='row align-items-center'>
                    <div className='col'>
                      <h6 className='fw-bold'>{cates.name}</h6>
                      <span>{cates.cate_code}</span>
                      <p className='text-muted'>{cates.desc}</p>
                    </div>
                    <div className='col text-end'>
                      <button onClick={showIsDelModal} type='button' className='btn text-danger'>ลบ</button>
                    </div>
                  </div>
                </li>
              ))}
            </>
          ) : <p>ยังไม่มีหัวข้องานประชุม</p>}
        </ul>
      </div>
    </div>
  )
}

export default EditCate

function ModalHostCreateCate({ show, handleClose, setCateCode, setName, setDesc, setIcon, createCate }) {



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>สร้างหัวข้องานประชุม</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className='mb-3'>
            <label className='form-label'>รหัสหัวข้องานประชุม</label>
            <input name='cate_code' type='text' className='form-control' onChange={e => setCateCode(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>ชื่อหัวข้อ</label>
            <input name='name' type='text' className='form-control' onChange={e => setName(e.target.value)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>รายละเอียด</label>
            <input name='desc' type='text' className='form-control' onChange={e => setDesc(e.target.value)} />
          </div>
          <div>
            <label className='form-label'>Icon</label>
            <input name='icon' type='file' className='form-control' accept='image/*' onChange={e => setIcon(e.target.files[0])} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={createCate}>
          Add +
        </button>
      </Modal.Footer>
    </Modal>
  )
}

function DelConfirm({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className='p-5 text-center'>
          <div className='mb-5'>
            <div className='mb-3'>
              <img src={Bin} alt="bin" width={64} height={64} />
            </div>
            <h4>ต้องการจะลบหรือไม่ ?</h4>
          </div>
          <div>
            <button onClick={handleClose} className='btn btn-outline-secondary me-2'>No, Keep it</button>
            <button onClick={handleClose} className='btn text-danger'>Yes, Delete it!</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}