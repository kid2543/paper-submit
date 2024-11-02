import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import HostCreateCommit from './HostCreateCommit';
import Dropdown from 'react-bootstrap/Dropdown';


const api = process.env.REACT_APP_API_URL

function HostCommitList() {

  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCommittee = async (cmt_id) => {
    if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
      try {
        const del = await axios.delete(api + "/delete/committee/" + cmt_id)
        const newData = data.filter((item) => item._id !== cmt_id)
        setData(newData)
        setSearchData(newData)
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
        setSearchData(res.data)
      } else {
        setSearchData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {

    const fethCommittee = async () => {
      try {
        const res = await axios.get(api + "/all/committee")
        setData(res.data)
        setSearchData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fethCommittee()
  }, [])

  return (
    <div className='container my-5'>
      <div className='mb-5'>
        <h4 className='fw-bold'>รายชื่อกรรมการตรวจบทความ</h4>
      </div>
      <form className='d-md-flex justify-content-between align-items-center mb-3' onSubmit={searchCommittee}>
        <div className='col-12 col-md-4'>
          <div className='input-group'>
            <input className='form-control form-control-sm' type='text' placeholder='ค้นหาจากชื่อกรรมการ' name='committee_name' />
            <button className='btn btn-outline-secondary btn-sm' type='submit'><ion-icon name="search"></ion-icon></button>
          </div>
        </div>
        <div className='mt-3 mt-md-0'>
          <button type='button' onClick={handleShow} className='btn btn-outline-primary btn-sm'>เพิ่มกรรมการ</button>
          <CreateCommmitteeModal
            show={show}
            handleClose={handleClose}
            setData={setData}
            setSData={setSearchData}
            sData={searchData}
            data={data}
          />
        </div>
      </form>
      <p className='text-muted'>รายชื่อกรรมการ</p>
      {data.length > 0 ? (
        <div className='mb-5'>
          <div className='table-responsive mb-5' style={{ minHeight: "600px" }}>
            <table className='table table-hover text-nowrap'>
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  <th>ชื่อผู้ใช้งาน</th>
                  <th>email</th>
                  <th>university</th>
                  <th>
                    active
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchData?.map((commit) => (
                  <tr key={commit._id}>
                    <td>{commit.fname}</td>
                    <td>{commit.lname}</td>
                    <td>{commit.username}</td>
                    <td>{commit.email}</td>
                    <td>{commit.university}</td>
                    <td>
                      <Dropdown drop='down-centered'>
                        <Dropdown.Toggle variant="btn" id="dropdown-basic">
                          <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href={"/host/committees/update/" + commit._id}>
                            <span className='me-2'><ion-icon name="pencil-outline"></ion-icon></span>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item className='text-danger' onClick={() => deleteCommittee(commit._id)}>
                            <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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

function CreateCommmitteeModal({ show, handleClose, setData, setSData, data, sData }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มกรรมการ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <HostCreateCommit
          handleClose={handleClose}
          setData={setData}
          setSData={setSData}
          data={data}
          sData={sData}
        />
      </Modal.Body>
    </Modal>
  )
}