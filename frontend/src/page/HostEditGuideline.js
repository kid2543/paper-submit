import React, { useState } from 'react'
import useFetch from '../hook/useFetch'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

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
    <div className='py-5'>
      <div className='mb-4'>
        <h4 className='fw-bold'>ข้อแนะนำ</h4>
        <p className='text-mute'>เพิ่มและแก้ไขข้อแนะนำสำหรับการส่งบทความได้ที่นี่</p>
      </div>
      {data &&
        <div>
          <div className='card border-0 shadow-sm mb-5'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h6 className='fw-bold mb-0'>ผู้ส่งบทความ</h6>
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
          <div className='card border-0 shadow-sm mb-5'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h6 className='fw-bold mb-0'>กรรมการ</h6>
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
          <div className='card border-0 shadow-sm mb-5'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h6 className='fw-bold mb-0'>ผู้เข้าชม</h6>
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    const deleteEmpty = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_presenter: deleteEmpty
      })
      props.setData(res.data)
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
        <Modal.Title>ข้อแนะนำสำหรับผู้ส่งบทความ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>Add +</button>
        {list.map((items, index) => (
          <div className='my-3' key={index}>
            <label className='form-label'>ข้อที่: {index + 1}</label>
            <textarea className='form-control' value={items} onChange={e => handleChange(e, index)} />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    const filterList = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_chair: filterList
      })
      props.setData(res.data)
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
        <Modal.Title>ข้อแนะนำสำหรับกรรมการ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn-outline-primary' type='button' onClick={handleAdd}>Add +</button>
        {list.map((items, index) => (
          <div className='my-3' key={index}>
            <label className='form-label'>ข้อที่: {index + 1}</label>
            <textarea className='form-control' value={items} onChange={e => handleChange(e, index)} />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    const filterList = list.filter(items => items !== '')
    try {
      const res = await axios.patch('/api/conference', {
        _id: props.id,
        guide_for_audience: filterList
      })
      props.setData(res.data)
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
        <Modal.Title>ข้อแนะนำสำหรับผู้เข้าชม</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button className='btn btn-primary' type='button' onClick={handleAdd}>Add +</button>
        {list.map((items, index) => (
          <div className='my-3' key={index}>
            <label className='form-label'>ข้อที่: {index + 1}</label>
            <textarea className='form-control' value={items} onChange={e => handleChange(e, index)} />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  )
}