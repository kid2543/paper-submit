import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PaperStatus, { PaperResult } from '../components/PaperStatus'
import { Link, useNavigate } from 'react-router-dom'
import useSearch from '../hook/useSearch'
import { UserDropdown } from '../components/UserDropdown'
import { toast, ToastContainer } from 'react-toastify'

function Host() {

  const [data, setData] = useState({})
  const [Paper, setPaper] = useState([])
  const [Cate, setCate] = useState([])
  const [loading, setLoading] = useState('idle')
  const id = sessionStorage.getItem('host_confr')
  const navigate = useNavigate()

  const searchPaper = useSearch('/api/paper/host/search/' + id)

  useEffect(() => {
    setLoading('loading')
    const fetchData = async () => {
      try {
        const confr = await axios.get('/api/conference/host/' + id)
        const paper = await axios.get('/api/paper/confr/' + id)
        const cate = await axios.get('/api/category/' + id)
        setData(confr.data)
        setPaper(paper.data)
        setCate(cate.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading('success')
      }
    }
    fetchData()
  }, [id])

  if (loading === 'idle' || loading === 'loading') {
    return <div>Loading...</div>
  }

  const openConfr = async (value) => {
    if (window.confirm('ต้องการเปลี่ยนสถานะบทความหรือไม่ ?')) {
      try {
        const update = await axios.patch('/api/conference', {
          _id: id,
          status: value
        })
        if (value === true) {
          toast.success('เปิดงานประชุมแล้ว')
        } else {
          toast.success('ปิดงานประชุมแล้ว')
        }
        setData(update.data)
      } catch (error) {
        console.log(error)
        toast.error("เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง")
      }
    }
  }

  const handleDelete = async () => {
    if (data.status === true) {
      return toast.warning('กรุณาปิดงานประชุมก่อนทำการลบ')
    }

    if (window.confirm(`ต้องการลบงานประชุม ${data.confr_code} หรือไม่ ?`)) {
      try {
        await axios.delete('/api/conference/delete/' + data._id)
        toast.success(`ลบงานประชุม ${data._id} แล้ว`)
        navigate('/setting')
      } catch (error) {
        console.log(error)
        toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <section className='container'>
        <div className='card my-5 border-0 bg-light'>
          <div className='card-body'>
            <div className='d-flex justify-content-between align-items-center'>
              <h4 className='fw-bold'>
                รายละเอียดงานประชุม
              </h4>
              <UserDropdown />
            </div>
          </div>
        </div>
        <div className='card border-0 bg-light'>
          <div className='card-body'>
            <div className='row gy-3'>
              <div className='col-12'>
                <h1>{data?.title}</h1>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={data?.status} onChange={e => openConfr(e.target.checked)} disabled={data.publication.length <= 0 || Cate.length <= 0} />
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{data?.status ? 'เปิด' : 'ปิด'}</label>
                </div>
              </div>
              <div className='col-12'>
                <div className='row g-3'>
                  <div className='col-auto'>
                    <Link className='btn btn-primary text-white' to='/host/edit'>
                      <i className='bi bi-pencil-square me-2'></i>
                      แก้ไขงานประชุม
                    </Link>
                  </div>
                  {Paper.length <= 0 &&
                    <div className='col-auto'>
                      <button type='button' onClick={handleDelete} className='btn btn-danger'>
                        <i className='bi bi-trash me-2'></i>
                        ลบงานประชุม
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='my-5'>
          <div className='row g-3'>
            <div className='col-md-4'>
              <div className='card border-0 bg-light'>
                <div className='card-body'>
                  <small>มอบหมายแล้ว</small>
                  <h3>{Paper?.filter((items) => items.status === 'REVIEW').length} บทความ</h3>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card border-0 bg-light'>
                <div className='card-body'>
                  <small>ยังไม่ได้มอบหมาย</small>
                  <h3>{Paper?.filter((items) => items.status === 'PENDING').length} บทความ</h3>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card border-0 bg-light'>
                <div className='card-body'>
                  <small>บทความทั้งหมด</small>
                  <h3>{Paper?.length} บทความ</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card border-0 my-5'>
          <div className='card-body'>
            <div className='row align-items-center gy-3 mb-4'>
              <h4 className='col-12 col-md-8 mb-0'>รายการบทความ</h4>
              <form onSubmit={searchPaper.handleSearchChange} className='col-12 col-md-4'>
                <div className="input-group">
                  <input name='search' type="text" className="form-control" placeholder="ค้นหา" />
                  <button type='submit' className="input-group-text btn btn-primary text-white" id="basic-addon2">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
            {searchPaper.status === 'idle' || searchPaper.status === 'loading' ? (
              <div>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className='table-responsive' style={{ minHeight: "328px" }}>
                <table className='table' style={{ width: "1260px" }}>
                  <thead className='table-dark'>
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        ชื่อ
                      </th>
                      <th>
                        รหัส
                      </th>
                      <th>
                        สถานะ
                      </th>
                      <th>
                        ผลลัพธ์
                      </th>
                      <th>
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchPaper.data?.map((items, index) => (
                      <tr key={items._id}>
                        <td>
                          {index + 1}
                        </td>
                        <td>
                          {items.title}
                        </td>
                        <td>
                          {items.paper_code}
                        </td>
                        <td>
                          <PaperStatus status={items.status} />
                        </td>
                        <td>
                          <PaperResult status={items.result} />
                        </td>
                        <td>
                          <Link to={`/host/paper/${items._id}`} type='button' className='btn btn-primary me-2'>
                            <i className='bi bi-pen'></i>
                          </Link>
                          <Link to={`/host/assign/${items._id}/${items.cate_code}`} type='button' className='btn btn-outline-dark'>
                            <i className='bi bi-people'></i>
                          </Link>
                          {/* <Dropdown>
                            <Dropdown.Toggle className='border-0' variant="primary" id="dropdown-basic">
                              เพิ่มเติม
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => navigate(`/host/paper/${items._id}`)}>
                                <span className='me-2'><i className='bi bi-eye'></i></span>
                                ดูรายละเอียด
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => navigate(`/host/assign/${items._id}/${items.cate_code}`)}>
                                <span className='me-2'><i className='bi bi-pen'></i></span>
                                มอบหมายบทความ
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className='d-flex justify-content-between align-items-center'>
              <span>{`Page ${searchPaper.page} of ${searchPaper.totalPages}`}</span>
              <div>
                <button onClick={searchPaper.handlePreviousPage} disabled={searchPaper.page === 1} className='btn btn-link'>
                  <i className='bi bi-arrow-left'></i> ก่อนหน้า
                </button>
                <button onClick={searchPaper.handleNextPage} disabled={searchPaper.page + 1 >= searchPaper.totalPages} className='btn btn-link'>
                  ถัดไป <i className='bi bi-arrow-right'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Host