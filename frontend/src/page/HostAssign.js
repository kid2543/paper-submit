import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function HostAssign() {

  const { paper } = useParams()

  const navigate = useNavigate()

  const [isPaper, setIsPaper] = useState({})
  const [isReviewer, setIsReviewer] = useState([])
  const [ownerId, setOwnerId] = useState("")
  const [isSelectReviewer, setIsSelectReviewer] = useState([])
  const [closePaper, setClosePaper] = useState(null)
  const [isClosePaper, setIsClosePaper] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAssigned, setIsAssigned] = useState([])
  const [checkAssign, setCheckAssign] = useState([])
  const [cancelList, setCancelList] = useState([])

  const handleSelect = (e) => {
    if (e.target.checked) {
      setIsSelectReviewer([...isSelectReviewer, e.target.value])
    } else {
      setIsSelectReviewer(isSelectReviewer.filter((item) => item !== e.target.value))
    }
  }

  const handleCancelList = (e) => {
    if (e.target.checked) {
      setCancelList([...cancelList, e.target.value])
    } else {
      setCancelList(cancelList.filter((item) => item !== e.target.value))
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    if (isSelectReviewer.length > 0) {
      if (window.confirm("ยืนยันการเลือกไหม ?")) {
        try {
          for (let i in isSelectReviewer) {
            await axios.post(api + "/assign/" + paper, {
              reviewer: isSelectReviewer[i],
              paper_code: isPaper?.paper_code
            })
          }
          await axios.post(api + "/create/notification/" + ownerId, {
            header: isPaper.paper_code,
            form: "บทความของคุณได้ถูกมอบหมายให้กรรมการตรวจแล้ว",
          })
          alert("เพิ่มรายชื่อกรรมการสำเร็จ")
          navigate(-1)
        } catch (error) {
          console.log(error)
        }
      } else {
        return false
      }
    } else {
      alert("กรุณาเลือกรายชื่อกรรมการ")
      return false
    }
  }

  const handleUploadClosePdfName = async (e) => {
    e.preventDefault()
    if (closePaper !== null) {
      try {
        const formData = new FormData()
        formData.append("file", closePaper)
        const upload = await axios.patch(api + "/upload/close/paper/" + paper, formData)
        alert("Upload ไฟล์สำเร็จ: " + upload.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("กรุณาเลือกไฟล์")
      return false
    }

  }

  const handleCancel = async () => {
    if (window.confirm("ต้องการจะยกเลิกหรือไม่")) {
      try {
        const res = await axios.patch(api + "/cancel/paper/assign", {
          list: cancelList,
          paper_id: paper,
          paper_code: isPaper.paper_code
        })
        alert("ยกเลิกสำเร็จ: " + res.status)
        let copy = [...isAssigned]
        for(let i in cancelList){
          copy = copy.filter((item) => item.reviewer?._id !== cancelList[i])
        }
        setIsAssigned(copy)
      } catch (error) {
        console.log(error)
      }
    } else {
      return false
    }
  }

  useEffect(() => {

    setLoading(true)

    const fethData = async () => {
      try {
        const res = await axios.get(api + "/get/paper/" + paper)
        const cate = await axios.get(api + "/get/reviewer/" + res.data.cate_code?._id)
        const assigned = await axios.get(api + "/get/assigned/" + paper)
        setIsAssigned(assigned.data)
        let mock = []
        for (let i in assigned.data) {
          mock.push(assigned.data[i].reviewer._id)
        }
        setCheckAssign(mock)
        setIsPaper(res.data)
        setIsClosePaper(res.data.close_name_file)
        setOwnerId(res.data.owner?._id)
        setIsReviewer(cate.data)
        setLoading(false)
      } catch (error) {
        console.log(error)      
      }
    }

    fethData()

  }, [paper])

  console.log("กรรมการที่เพิ่มรายชื่อแล้ว", isAssigned)
  console.log("รายชื่อกรรมการที่จะยกเลิก", cancelList)

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className='container my-5'>
      <div className='bg-secondary p-3 rounded mb-3'>
        <h4 className='text-white mb-0'>Assign Reviewer</h4>
      </div>
      <div className='mb-3 card p-3'>
        <p className='fw-bold mb-0'>
          รายละเอียดบทความ
        </p>
        <hr />
        <div className='row gy-3'>
          <div className='col-12 col-md-6'><span className='text-muted'>Title:</span></div>
          <div className='col-12 col-md-6'>{isPaper?.title}</div>
          <div className='col-12 col-md-6'><span className='text-muted'>Code: </span></div>
          <div className='col-12 col-md-6'>{isPaper?.paper_code}</div>
          <div className='col-12 col-md-6'><span className='text-muted'>Paper file:</span></div>
          <div className='col-12 col-md-6'><a className='text-decoration-none link-success' rel="noreferrer" href={api + "/pdf/" + isPaper?.paper_file} target='_blank'><ion-icon name="document"></ion-icon> {isPaper?.paper_code}</a></div>
        </div>
      </div>
      <div className='card mb-3 p-3'>
        <form onSubmit={handleUploadClosePdfName}>
          <label className='text-muted form-label'>อัพโหลดบทความที่ถูกปิดชื่อ</label>
          <div className="input-group">
            <input className='form-control' type='file' accept='.pdf,.doc' onChange={e => setClosePaper(e.target.files[0])} />
            <button type='submit' className='btn btn-success'>Upload</button>
          </div>
        </form>
        <hr />
        {isClosePaper ? (
          <div>
            บทความที่ปิดชื่อแล้ว: <a href={api + "/pdf/" + isClosePaper} target='_blank' rel="noreferrer">ดูบทความที่นี่</a>
          </div>
        ) : (
          <div>
            {closePaper ? null : (
              <div className="alert alert-warning" role="alert">
                หากไม่อัพโหลดบทความที่ถูกปิดชื่อกรรมการจะไม่เห็นบทความที่ต้องตรวจ
              </div>
            )}
          </div>
        )}
      </div>
      {isAssigned.length > 0 ? (
        <div className='card mb-3'>
          <div className='card-body'>
            <div className='mb-3 d-flex justify-content-between align-items-center'>
              <p className='text-muted mb-0'>รายชื่อกรรมการที่เพิ่มแล้ว</p>
              <div>
                <button onClick={handleCancel} disabled={cancelList.length < 1} className='btn btn-outline-danger btn-sm'><ion-icon name="close-outline"></ion-icon> ยกเลิกการตรวจ</button>
              </div>
            </div>
            <div>
              {isAssigned?.map((item) => (
                <div className='form-check' key={item._id}>
                  <input type='checkbox' className='form-check-input' value={item.reviewer?._id} onChange={e => handleCancelList(e)} />
                  <label className='form-checklabel'>{item.reviewer?.fname} {item.reviewer?.lname}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div className='card mb-3 p-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='fw-bold mb-0'>รายชื่อกรรมการ</p>
          <div>
            <a className='btn btn-outline-secondary btn-sm' href={"/host/cate/" + isPaper?.cate_code?._id}><ion-icon name="person-add"></ion-icon> เพิ่มรายชื่อกรรมการ</a>
          </div>
        </div>
        <hr />
        <div>
          {isReviewer.length > 0 ? (
            <>
              {isReviewer?.map((item) => (
                <div className='form-check' key={item._id}>
                  <input type='checkbox' className='form-check-input' onChange={e => handleSelect(e)} value={item._id} disabled={checkAssign.includes(item._id)} />
                  <label className='form-check-label'>{item.fname} {item.lname} (<AmountAssign reviewer_id={item._id} />) </label>
                </div>
              ))}
            </>
          ) : null}

        </div>
        <hr />
        <div>
          <button type='button' onClick={handleAssign} className='btn btn-outline-success btn-sm'><ion-icon name="add-circle-outline"></ion-icon> Assign</button>
        </div>
      </div>
    </div>
  )
}

export default HostAssign

function AmountAssign({ reviewer_id }) {

  const [isNumber, setIsNumber] = useState([])

  const fethAmout = async () => {
    try {
      const res = await axios.get(api + "/get/amount/review/" + reviewer_id)
      setIsNumber(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  fethAmout()

  return (
    <span className='text-primary'>
      {isNumber.length}
    </span>
  )
}