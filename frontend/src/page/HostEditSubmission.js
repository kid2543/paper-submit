import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

function HostEditSubmission() {

  const id = sessionStorage.getItem('host_confr')
  const [templateList, setTemplateList] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState('idle')
  const [error, setError] = useState('')
  const [showDialog, setShowDialog] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [editState, setEditState] = useState('')

  // modal data
  const [templateModal, setTemplateModal] = useState(false)
  const [detailModal, setDetailModal] = useState(false)

  useEffect(() => {
    setLoading('loading')
    const fetchTemplate = async () => {
      try {
        const res = await axios.get('/api/template/' + id)
        setTemplateList(res.data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }

    const fetchDetail = async () => {
      try {
        const res = await axios.get('/api/conference/host/' + id)
        setData(res.data.submit_detail)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }

    fetchTemplate()
    fetchDetail()
    setLoading('success')
  }, [id])

  const handleConfirm = (id) => {
    setShowDialog(true)
    setDeleteId(id)
  }

  const handleCancel = () => {
    setShowDialog(false)
    setDeleteId('')
  }

  // delete template
  const handleDeleteTemplate = async () => {
    if (deleteId) {
      try {
        await axios.delete('/api/template/' + deleteId)
        toast.success('ลบเทมเพลตแล้ว')
        setTemplateList(templateList.filter(items => items._id !== deleteId))
        setShowDialog(false)
      } catch (error) {
        toast.error('เกิดข้อผิดพลาด')
        setShowDialog(false)
        console.log(error)
      }
    } else {
      toast.error('ไม่พบรหัสเทมเพลต')
      return
    }
  }

  // แก้ไขข้อแนะนำการส่งบทความ
  const handleShow = () => {
    setDetailModal(true)
    setEditState('edit')
  }

  const handleClose = () => {
    setDetailModal(false)
    setEditState('close')
  }

  if (!id) {
    return <div>Not found 404</div>
  }

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
          <h4 className='fw-bold card-title'>การส่งบทความ</h4>
          <p className='text-muted card-text'>แก้ไขข้อแนะนำการส่งบทความ และอัพโหลดเทมเพลตได้ที่นี่</p>
        </div>
      </div>
      <div className='card  shadow-sm mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h4 className='card-title'>รายการเทมเพลต</h4>
              <div className='text-muted'>
                อัพโหลดเทมเพลตเพื่อให้ ผู้ส่งบทความสามารถโหลด และนำไปปรับใช้กับบทความเพื่อให้รูปแบบของบทความเป็นไปตามที่งานประชุมกำหนด
              </div>
            </div>
            <button className='btn btn-primary' onClick={() => setTemplateModal(true)}>
              <i className='bi bi-plus-lg me-2'></i>
              เพิ่มเทมเพลต
            </button>
            <ConfirmDeleteDialog
              show={showDialog}
              header='ยืนยันการลบเทมเพลต'
              message='ต้องการจะลบเทมเพลตนี้หรือไม่'
              onConfirm={handleDeleteTemplate}
              onCancel={handleCancel}
            />
            <TemplateModal
              show={templateModal}
              handleClose={() => setTemplateModal(false)}
              data={templateList}
              setData={setTemplateList} />
          </div>
          <div>
            {templateList &&
              <div className='table-responsive' style={{ minHeight: 400 }}>
                <table className='table' style={{ minWidth: '1000px' }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ไฟล์</th>
                      <th>ลบ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templateList.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/uploads/${items.file}`} target='_blank' rel='noopener noreferrer'>{items.name}</Link>
                        </td>
                        <td>
                          <button type='button' onClick={() => handleConfirm(items._id)} className='btn btn-outline-danger'>
                            <i className='bi bi-trash'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            }
          </div>
        </div>
      </div>
      <div className='card  shadow-sm'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <div>
              <h4 className='card-title'>ข้อแนะนำการส่งบทความ</h4>
              <div className='text-muted'>
                เพิ่มข้อแนะนำการส่งบทความ เพื่อให้ผู้ส่งบทความสามารถปฏิบัติตามเงื่อนไขของงานประชุมได้อย่างถูกต้อง
              </div>
            </div>
            <button className='btn btn-outline-dark' onClick={handleShow}>
              <i className='bi bi-pencil-square me-2'></i>
              แก้ไข
            </button>
          </div>
          <div>
            {data &&
              <div>
                <SubmissionModal
                  data={data}
                  show={detailModal}
                  handleClose={handleClose}
                  setData={setData}
                  state={editState}
                />
                <ol>
                  {data.map((items, index) => (
                    <li key={index}>
                      {items}

                    </li>
                  ))}
                </ol>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostEditSubmission


function TemplateModal(props) {

  const [templateFile, setTemplateFile] = useState(null)
  const [templateName, setTemplateName] = useState('')

  const closeModal = () => {
    setTemplateName('')
    setTemplateFile(null)
    props.handleClose()
  }


  const [uploadLoading, setUploadLoading] = useState(false)
  const handleUpdate = async (e) => {
    e.preventDefault()
    setUploadLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', templateName)
      formData.append('file', templateFile)
      formData.append('confr_id', sessionStorage.getItem('host_confr'))
      const res = await axios.post('/api/template', formData)
      props.setData([...props.data, res.data])
      toast.success('เพิ่มเทมเพลตสำเร็จ')
      closeModal()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด')
    } finally {
      setUploadLoading(false)
    }
  }

  return (
    <Modal show={props.show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มเทมเพลต</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleUpdate}>
        <Modal.Body className='row gy-3'>
          <div className='col-12'>
            <label className='form-label'>ชื่อไฟล์</label>
            <input autoFocus className='form-control' value={templateName} onChange={e => setTemplateName(e.target.value)} required />
          </div>
          <div className='col-12'>
            <label className='form-label'>เลือกไฟล์</label>
            <input className='form-control' type='file' accept='.pdf, .docx' onChange={e => setTemplateFile(e.target.files[0])} required />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={closeModal}>
            ปิด
          </Button>
          {uploadLoading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <Button variant="primary" disabled={!templateFile || !templateName} type='submit'>
              <i className='bi bi-upload me-2'></i>
              อัพโหลด
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  )
}

// create submit detail
function SubmissionModal(props) {

  const [data, setData] = useState(null)
  const [key, setKey] = useState(0)

  const _id = sessionStorage.getItem('host_confr')

  useEffect(() => {
    setData(props.data)
  }, [props.data, props.state])

  const handleAdd = () => {
    setData([...data, ''])
  }

  const [updateLoading, setUpdateLoading] = useState(false)
  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    try {
      const res = await axios.patch('/api/conference', {
        _id,
        submit_detail: data
      })
      props.setData(res.data.submit_detail)
      toast.success('แก้ไขข้อมูลสำเร็จ')
      props.handleClose()
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด')
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleChange = (e, index) => {
    const { value } = e.target
    let temp = [...data]
    temp[index] = value
    setData(temp)
  }

  const handleDelete = (index) => {
    let temp = [...data]
    const del = temp.filter((items, idx) => idx !== index)
    setData(del)
    setKey(key + 1)
  }

  const closeModal = () => {
    setData(null)
    props.handleClose()
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>แก้ไขข้อแนะนำการส่งบทความ</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleUpdate}>
        {data &&
          <Modal.Body>
            <div className="row g-3 mb-3">
              {data.map((items, index) => (
                <div key={index}>
                  <div className="form-text">
                    ข้อที่ {index + 1}
                  </div>
                  <hr />
                  <label className='form-label'>รายละเอียดข้อแนะนำ</label>
                  <textarea
                    key={key}
                    className='form-control'
                    onChange={e => handleChange(e, index)}
                    defaultValue={items}
                    required
                    rows={5}
                  />
                  <div className="mt-3">
                    <button
                      type='button'
                      onClick={() => handleDelete(index)}
                      className='btn btn-outline-danger'>
                      <i className='bi bi-trash me-1'></i>
                      ลบรายละเอียด
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button type='button' onClick={handleAdd} className='btn btn-outline-primary'>
                <i className='bi bi-plus-lg me-2'></i>
                เพิ่มหัวข้อ
              </button>
            </div>
          </Modal.Body>
        }
        <Modal.Footer>
          <Button variant="" onClick={closeModal}>
            ปิด
          </Button>
          {updateLoading ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>
          ) : (
            <Button variant="primary" type='submit'>
              ยืนยัน
            </Button>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  )
}