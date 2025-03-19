import axios from 'axios'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch'

// react-bootstrap
import { UserDropdown } from '../components/UserDropdown'
import { toast } from 'react-toastify'

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
        toast.success('อัปโหลดไฟล์ข้อแนะนำสำเร็จ')
      } catch (error) {
        console.log(error)
        toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
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
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <div className='container py-3'>
        <div className='card  shadow-sm mb-3'>
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
              <h4>ข้อแนะนำ:</h4>
              <p>
                {data.suggestion}
              </p>
              <div className='mb-3'>
                {data.suggestion_file ? (
                  <div>
                    <h4>ข้อแนะนำ (file):</h4>
                    <Link
                      to={"/uploads/" + data.suggestion_file}
                      target='_blank'
                      rel='noreferrer'
                      className="btn btn-primary"
                    >
                      ดูไฟล์ข้อแนะนำ
                    </Link>
                  </div>
                ) : (
                  <form className='col-md-6 col-lg-3' onSubmit={handleUpload}>
                    <label className='form-label text-muted'>อัปโหลดข้อเสนอแนะนำ</label>
                    <input className='form-control form-control-sm' type='file' accept='.pdf,.doc' onChange={e => setSuggestionFile(e.target.files[0])} />
                    <div className='mt-2'>
                      <button className='btn btn-outline-success btn-sm' type='submit' disabled={!suggestionFile}>Upload</button>
                    </div>
                  </form>
                )
                }
              </div>
              <div>
                <h4>คะแนนแต่ละข้อ</h4>
                <div className="table-responsive" style={{ minHeight: 400 }}>
                  <table className="table" style={{ minWidth: 600 }}>
                    <thead>
                      <tr>
                        <th>ข้อที่</th>
                        <th>คะแนน</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.rate.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {index + 1}
                          </td>
                          <td>
                            {item} คะแนน
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-primary">
                      <tr>
                        <td>รวม</td>
                        <td>{data.total} คะแนน</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ReviewResult