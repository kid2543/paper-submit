import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'

const api = process.env.REACT_APP_API_URL

function HostPaper() {

  const navigate = useNavigate()

  const { id } = useParams()
  const [cate, setCate] = useState([]);

  const fethCate = async () => {
    try {
      const res = await axios.get(api + "/get/cofr/cate/" + id)
      setCate(res.data)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fethCate();
  }, [])

  return (
    <div className='container my-5'>
      <h2 className='fw-bold'>รายการบทความ</h2>
      {cate?.map((item) => (
        <div key={item._id} className='my-5'>
          <div>
            <p className='fw-bold'>{item.name}</p>
            <hr />
          </div>
          <PaperList id={item._id} api={api} navigate={navigate} confrId={id} />
        </div>
      ))}
    </div>
  )
}

export default HostPaper

function PaperList({ id, api, navigate, confrId }) {

  const [paper, setPaper] = useState([]);

  const getPaper = async () => {
    try {
      const res = await axios.get(api + "/get/conferences/paper/" + id)
      setPaper(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePdf = (file) => {
    window.open(`${api}/pdf/${file}`, '_blank')

  }

  useEffect(() => {
    getPaper()
  }, [])

  const handleStatus = (status) => {
    switch (status) {
      case 0: return <span className='text-warning'>(รอดำเนินการ)</span>
      case 1: return <span className='text-primary'>(กำลังดำเนินการ)</span>
      case 2: return <span className='text-success'>(ผ่าน)</span>
      case 3: return <span className='text-warning'>(ผ่านแบบมีเงื่อนไข)</span>
      case 4: return <span className='text-warning'>(ผ่านส่งใหม่)</span>
      case 5: return <span className='text-danger'>(ไม่ผ่าน)</span>
    }
  }

  return (
    <>
      {paper.length > 0 ? (
        <div>
          {paper?.map((item) => (
            <div className='p-3 mb-3' key={item._id}>
              <p className='fw-bold'>
                {item.paper_code} {handleStatus(item.status)}
              </p>
              <div>
                <div className='mb-3'>
                  <h6 ><span className='text-muted'>ผู้ส่งบทความ:</span> {item.owner?.fname} {item.owner?.lname}</h6>
                  <p className='mb-2'> <span className='text-muted'>ชื่อบทความ:</span> {item.title}</p>
                  <button className='btn btn-primary me-2' onClick={() => handlePdf(item.paper_file)}>PDF</button>
                  <button type='button' className='btn btn-outline-success me-2' onClick={() => navigate('/host/assign/' + item._id)}>Assign</button>
                  <button type='button' className='btn btn-outline-secondary' onClick={() => navigate('/host/over-all/' + item._id)}>ผลลัพธ์</button>
                </div>
                <CommitteeList id={item._id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Accordion>
          <Accordion.Item>
            <Accordion.Body>
              <div>
                <h6 className='text-primary'>ยังไม่มีบทความ</h6>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}

function CommitteeList({ id }) {

  const [list, setList] = useState([])

  const handleDel = async (id) => {
    try {
      if (window.confirm("ต้องการจะลบหรือไม่")) {
        await axios.delete(api + '/delete/commit/list/' + id)
        setList(list.filter(({ _id }) => {
          return _id !== id
        }))
      } else {
        console.log("Cancel")
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getList = async () => {
    try {
      const commit = await axios.get(api + "/get/reviewer/list/" + id)
      setList(commit.data)
      console.log("reviewer data", commit.data)
    } catch (error) {
      console.log(error)
    }
  }

  const statusName = (status) => {
    switch (status) {
      case 0: return <span className="badge bg-primary rounded-pill">Working</span>
      case 1: return <span className="badge bg-success rounded-pill">Done</span>
    }
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <ul>
      {list?.map((item) => (
        <li key={item.reviewer?._id}>{item.reviewer?.fname} {item.reviewer?.lname} {statusName(item.status)}</li>
      ))}
    </ul>
  )
}