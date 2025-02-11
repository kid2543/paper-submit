import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch'

// react-bootstrap
import { UserDropdown } from '../components/UserDropdown'

const api = process.env.REACT_APP_API_URL

function ReviewResult() {
  const { id } = useParams()
  const { data, setData, loading, error } = useFetch('/api/assign/one/' + id)
  const [suggestionFile, setSuggestionFile] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (suggestionFile) {
      try {
        const formData = new FormData()
        formData.append("file", suggestionFile)
        const res = await axios.patch('/api/assign/suggestion/' + id, formData)
        setData(res.data)
        alert('Upload Success')
      } catch (error) {
        console.log(error)
        alert('Upload Error')
      }
    } else {
      alert('กรุณาเลือกไฟล์')
      return false
    }
  }

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className='container my-5'>
      <div className='card  shadow-sm mb-5'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h4 className='fw-bold'>ผลการตรวจบทความ</h4>
            <UserDropdown />
          </div>
        </div>

      </div>
      {data &&
        <div className='card  shadow-sm'>
          <div className='card-body'>
            <p>
              ข้อแนะนำ: {data.suggestion}
            </p>
            <div className='mb-3'>
              {data.suggestion_file ? (
                <div>
                  ข้อแนะนำ (file): <a href={api + "/uploads/" + data.suggestion_file} target='_blank' rel='noreferrer'>open file</a>
                </div>
              ) : (
                <form className='col-md-6 col-lg-3' onSubmit={handleUpload}>
                  <label className='form-label text-muted'>อัพโหลดข้อเสนอแนะนำ</label>
                  <input className='form-control form-control-sm' type='file' accept='.pdf,.doc' onChange={e => setSuggestionFile(e.target.files[0])} />
                  <div className='mt-2'>
                    <button className='btn btn-outline-success btn-sm' type='submit' disabled={!suggestionFile}>Upload</button>
                  </div>
                </form>
              )
              }
            </div>
            <div>
              <p>คะแนนแต่ละข้อ</p>
              {data.rate.map((item, index) => (
                <div key={index}>
                  ข้อที่ {index + 1}: {item} คะแนน
                </div>
              ))}
            </div>
            <div>
              รวม: {data.total} คะแนน
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ReviewResult