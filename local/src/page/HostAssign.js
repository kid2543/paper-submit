import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function HostAssign() {

  const { paper } = useParams()
  const [paperId, setPaperId] = useState("")

  const navigate = useNavigate()

  const [isPaper, setIsPaper] = useState({})
  const [isReviewer, setIsReviewer] = useState([])
  const [isSelectReviewer, setIsSelectReviewer] = useState([])
  const [closePaper, setClosePaper] = useState(null)
  const [isClosePaper, setIsClosePaper] = useState("")

  const handleSelect = (e) => {
    if (e.target.checked) {
      setIsSelectReviewer([...isSelectReviewer, e.target.value])
    } else {
      setIsSelectReviewer(isSelectReviewer.filter((item) => item !== e.target.value))
    }
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    if (isSelectReviewer.length > 0) {
      if (window.confirm("ต้องการจะเพิ่มรายชื่อกรรมการหรือไม่ เนืองจากจะไม่สามารถลบรายชื่อกรรมการได้? ")) {
        try {
          for (let i in isSelectReviewer) {
            await axios.post(api + "/assign/" + paperId, {
              reviewer: isSelectReviewer[i],
              paper_code: isPaper?.paper_code
            })
          }
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
        const upload = await axios.patch(api + "/upload/close/paper/" + paperId, formData)
        alert("Upload ไฟล์สำเร็จ: " + upload.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("กรุณาเลือกไฟล์")
      return false
    }

  }

  useEffect(() => {

    setPaperId(paper)

    const fethData = async () => {
      try {
        const res = await axios.get(api + "/get/paper/" + paper)
        setIsPaper(res.data)
        setIsClosePaper(res.data.close_name_file)
        const cate = await axios.get(api + "/get/reviewer/" + res.data.cate_code?._id)
        setIsReviewer(cate.data)
      } catch (error) {
        console.log(error)
      }
    }

    fethData()

  }, [paper])

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
      <div className='card mb-3 p-3'>
        <p className='fw-bold mb-0'>รายชื่อกรรมการ</p>
        <a className='text-decoration-none' href={"/host/cate/" + isPaper?.cate_code?._id}>เพิ่มรายชื่อกรรมการ</a>
        <hr />
        <div>
          {isReviewer.length > 0 ? (
            <>
              {isReviewer?.map((item) => (
                <div className='form-check' key={item._id}>
                  <input type='checkbox' className='form-check-input' onChange={e => handleSelect(e)} value={item._id} />
                  <label className='form-check-label'>{item.fname} {item.lname} (<AmountAssign reviewer_id={item._id} />) </label>
                </div>
              ))}
            </>
          ) : null}

        </div>
        <hr />
        <div>
          <button type='button' onClick={handleAssign} className='btn btn-success'>Create<ion-icon name="save"></ion-icon></button>
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