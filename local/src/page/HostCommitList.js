import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import HostCreateCommit from './HostCreateCommit';

const api = process.env.REACT_APP_API_URL

function HostCommitList() {

  const [data, setData] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confr_id = sessionStorage.getItem("confr")

  const deleteCommittee = async (cmt_id) => {
    if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
      try {
        const del = await axios.delete(api + "/delete/committee/" + cmt_id)
        setData(data.filter((item) => item._id !== cmt_id))
        alert("ลบผู้ใช้งานสำเร็จ: " + del.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const searchCommittee = async (e) => {
    e.preventDefault()
    try {
      if (e.target.committee_name.value) {
        const res = await axios.get(api + "/search/committee/" + e.target.committee_name.value)
        setData(res.data)
      } else {
        fethCommittee()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fethCommittee = async () => {
    try {
      const res = await axios.get(api + "/all/committee")
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethCommittee()
  }, [])

  if (!confr_id || confr_id === "undefined") {
    return (
      <div>
        <button className='btn btn-primary'>สร้างงานประชุม</button>
      </div>
    )
  }

  return (
    <div className='container my-5'>
      <div className='mb-5'>
        <h4>รายชื่อกรรมการตรวจบทความ</h4>
      </div>
      <form className='d-md-flex justify-content-between mb-3' onSubmit={searchCommittee}>
        <div className='col-12 col-md-4'>
          <div className='input-group'>
            <input className='form-control' type='text' placeholder='ค้นหาจากชื่อกรรมการ' name='committee_name' />
            <button className='btn btn-outline-secondary btn-sm' type='submit'><ion-icon name="search"></ion-icon></button>
          </div>
        </div>
        <div className='mt-3 mt-md-0'>
          <button type='button' onClick={handleShow} className='btn btn-primary'>Create New</button>
          <CreateCommmitteeModal show={show} handleClose={handleClose} />
        </div>
      </form>
      {data.length > 0 ? (
        <div className='mb-5'>

          <div className='table-responsive mb-5'>
            <table className='table table-hover text-nowrap'>
              <thead className='table-secondary'>
                <tr>
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  <th>email</th>
                  <th>university</th>
                  <th>
                    active
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((commit) => (
                  <tr key={commit._id}>
                    <td>{commit.fname}</td>
                    <td>{commit.lname}</td>
                    <td>{commit.email}</td>
                    <td>{commit.university}</td>
                    <td>
                      <div>
                        <a type='button' href={"/host/committees/update/" + commit._id} className='text-decoration-none text-secondary me-2'><ion-icon name="create"></ion-icon></a>
                        <button type='button' onClick={() => deleteCommittee(commit._id)} className='btn btn-link text-danger text-decoration-none'><ion-icon name="trash-bin"></ion-icon></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : "ไม่พบรายชื่อกรรมการ"}
    </div>
  )
}

export default HostCommitList

function CreateCommmitteeModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มกรรมการ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <HostCreateCommit handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  )
}