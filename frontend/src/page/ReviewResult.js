import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function ReviewResult() {

  const [reviweData, setReviweData] = useState({})
  const [rate, setRate] = useState([])
  const [suggestionFile, setSuggestionFile] = useState(null)

  const { id } = useParams()


  const handleUpload = async (e) => {
    e.preventDefault()
    if(suggestionFile) {
      try {
        const formData = new FormData()
        formData.append("file", suggestionFile)
        await axios.patch(api + "/upload/comment/" + id, formData )
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('กรุณาเลือกไฟล์')
      return false
    }
  }

  useEffect(() => {
    const fethData = async () => {
      try {
        const res = await axios.get(api + "/get/rate/paper/" + id)
        setReviweData(res.data)
        setRate(res.data.rate)
      } catch (error) {
        console.log(error)
      }
    }

    fethData()

  }, [id])

  return (
    <div className='container my-5'>
      <div>
        <h4 className='fw-bold'>ผลการตรวจบทความ</h4>
      </div>
      <div className='card'>
        <div className='card-body'>
          <p>
            ข้อแนะนำ: {reviweData?.suggestion}
          </p>
          <div className='mb-3'>
            {reviweData?.suggestion_file ? (
              <>
                ข้อแนะนำ (file): <a href={api + "/pdf/" + reviweData?.suggestion_file} target='_blank' rel='noreferrer'>open file</a>
              </>
            ) : (
              <form className='col-md-6 col-lg-3' onSubmit={handleUpload}>
                <label className='form-label text-muted'>อัพโหลดข้อเสนอแนะนำ</label>
                <input className='form-control form-control-sm' type='file' accept='.pdf,.doc' onChange={e => setSuggestionFile(e.target.files[0])} />
                <div className='mt-2'>
                  <button className='btn btn-outline-success btn-sm' type='submit'>Upload</button>
                </div>
              </form>
            )}
          </div>
          <div>
            <p>คะแนนแต่ละข้อ</p>
            {rate?.map((item, index) => (
              <div key={index}>
                ข้อที่ {index + 1}: {item} คะแนน
              </div>
            ))}
          </div>
          <div>
            รวม: {reviweData?.total} คะแนน
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResult