import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import PaperStatus from '../components/PaperStatus'
import PaymentStatus from '../components/PaymentStatus'
import PaperResult from '../components/PaperResult'

import emailjs from 'emailjs-com';

const api = process.env.REACT_APP_API_URL
const emailKey = {
  service_id: "service_99x3oon",
  template_id: "template_fftj64m",
  user_id: "2XoUGq0QVan73iW8R",
}

function HostOverAll() {

  const [paper, setPaper] = useState({})
  const [reviewer, setReviewer] = useState([])
  const [paperResult, setPaperResult] = useState(0)
  const [owner, setOwner] = useState({})
  const from = useRef()

  const { id } = useParams()

  const fethComment = async () => {
    try {
      const reviewerRes = await axios.get(api + "/get/review/host/" + id)
      console.log("feth Comment: ", reviewerRes.data)
      setReviewer(reviewerRes.data)
      const paperRes = await axios.get(api + "/get/paper/" + id)
      console.log("paper data", paperRes.data)
      setPaper(paperRes.data)
      setOwner(paperRes.data.owner)
    } catch (error) {
      console.log("feth Commment Error", error)
    }
  }

  const submitPaperStatus = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(api + "/update/paper/status/" + id, {
        status: 2,
        result: paperResult
      })
      alert("อัพเดทสถานะสำเร็จ")
    } catch (error) {
      console.log(error)
      alert("Error: 500")
    }
  }

  const committeeStatus = (status) => {
    switch (status) {
      case 0: return <span className='ms-2 badge bg-warning'>Pending</span>
      case 1: return <span className='ms-2 badge bg-success'>Sucess</span>
    }
  }

  const committeeResutl = (status) => {
    switch (status) {
      case 1:
        return <span className='text-success fw-bold'>Accept submission (ผ่าน)</span>
      case 2:
        return <span className='text-success fw-bold'>Revisions required (ผ่านแบบมีเงื่อนไข)</span>
      case 3:
        return <span className='text-warning fw-bold'>Resubmit for review (ส่งใหม่เพื่อให้พิจารณาอีกครั้ง)</span>
      case 4:
        return <span className='text-danger fw-bold'>Decline submission (ไม่ผ่าน)</span>
      default:
        return <span className='text-secondary fw-bold'>ไม่พบข้อมูล</span>

    }
  }

  const checkPayment = async (e) => {
    e.preventDefault()
    let stateNum = parseInt(e.target.payment_status.value)
    try {
      const res = await axios.patch(api + "/check/payment/" + id, {
        payment_status: stateNum
      })
      console.log(res)
      alert("Check payment success")
    } catch (error) {
      console.log(error)
    }
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send("service_99x3oon", "template_fftj64m", {
      from_name: paper?.paper_code,
      to_name: owner?.fname,
      message: "เรียนคุณ " + owner?.fname + " คุณได้รับเชิญให้เข้าร่วมงานประชุมวิชาการสามารถลงทะเบียนเพื่อเข้าร่วมงานประชุมได้",
      user_email: "kid2543@gmail.com",
    }, emailKey.user_id).then(() => {
      console.log('SUCCESS!')
    },
      (err) => {
        console.log("FAILED...", err.text)
      }
    )
  };

  useEffect(() => {
    fethComment()
  }, [])

  return (
    <div className='container my-5'>
      <div className='mb-5'>
        <h4 className='fw-bold'>ผลลัพธ์การตรวจบทความ</h4>
      </div>
      <div className='mb-5'>
        <p className='fw-bold'>รายละเอียดบทความ</p>
        <p>
          Code: <b>{paper?.paper_code}</b><br />
          Title: <b>{paper?.title}</b><br />
          File : <a href={api + "/pdf/" + paper?.paper_file} target='_blank'>{paper?.paper_code}</a><br />
          ผู้แต่ง: <b>{paper?.owner?.fname} {paper?.owner?.lname}</b><br />
          email ผู้แต่ง: <b>{paper?.owner?.email}</b><br />
          สถานะปัจจุบัน: <b><PaperStatus status={paper?.status} /></b><br />
          ผลลัพธ์บทความ: <b><PaperResult status={paper?.result} /></b><br />
          สถานะการชำระค่าลงทะเบียน: <b><PaymentStatus status={paper?.payment_status} /></b><br />
          หลักฐานการชำระเงิน: <a href={api + "/image/" + paper?.payment_image} target='_blank'>ดูหลักฐาน</a><br />
        </p>
      </div>
      <div className='mb-5 col-md-4'>
        <form onSubmit={checkPayment}>
          <div>
            <label className="form-label text-muted">หลักฐานการชำระเงินถูกต้องไหม ?</label>
            <select name='payment_status' className='form-select' required>
              <option value="">--</option>
              <option value="2">หลักฐานการชำระเงินถูกต้อง</option>
              <option value="3">หลักฐานการชำระเงินไม่ถูกต้อง</option>
            </select>
            <div className='mt-2'>
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <div className='mb-5 col-md-4'>
        <div>
          <form onSubmit={submitPaperStatus}>
            <p className='fw-bold me-3'>สรุปผลลัพธ์</p>
            <select className='form-select' required onChange={e => setPaperResult(parseInt(e.target.value))}>
              <option value="" >--</option>
              <option value={1}>Accept submission (ผ่าน)</option>
              <option value={2}>Revisions required (ผ่านแบบมีเงื่อนไข)</option>
              <option value={3}>Resubmit for review (ส่งใหม่เพื่อให้พิจารณาอีกครั้ง)</option>
              <option value={4}>Decline submission (ไม่ผ่าน)</option>
            </select>
            <button className='btn btn-primary my-2'>Submit</button>
          </form>
        </div>
      </div>
      <div className='mb-5 row'>
        <div className='col'>
          <p className='fw-bold'>ส่งจดหมายเข้าร่วมงานประชุม</p>
          <button className='btn btn-success' onClick={sendEmail} type='button'>Send Email</button>
        </div>
        <div className='col'>
          <p className='fw-bold'>Certificate</p>
          <a href={"mailto:" + paper?.owner?.email + "?subject=คุณได้รับใบรับรอง&body=คุณได้รับใบรับรอง"} className='btn btn-success'>Sent</a>
        </div>
      </div>
      <div className='mb-5'>
        <p className='fw-bold'>ความคิดเห็นของกรรมการ</p>
        {reviewer.length > 0 ? (
          <ol className='list-group list-group-numbered'>
            {reviewer?.map((item) => (
              <li key={item._id} className='list-group-item d-flex justify-content-between align-items-start'>
                <div className='ms-2 me-auto'>
                  <div className='fw-bold'>
                    {item.reviewer?.fname} {item.reviewer?.lname}
                    {committeeStatus(item.status)}
                  </div>
                  <div>
                    {committeeResutl(item.result)}
                  </div>
                  <div className='mt-3'>
                    <span className='text-muted'>ข้อแนะนำ</span>
                    <div>{item.suggestion}</div>
                  </div>
                  <div className='mt-3'>
                    <span className='text-muted'>ไฟล์: </span>
                    {item.suggestion_file &&
                      <a href={api + "/pdf/" + item.suggestion_file} target='_blank'>ข้อแนะนำ</a>
                    }
                  </div>
                </div>
                <span className='badge bg-primary rounded-pill'>
                  คะแนนรวม {item.total}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          "ไม่พบข้อมูล"
        )}
      </div>
    </div>
  )
}

export default HostOverAll