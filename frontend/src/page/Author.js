import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import PaperStatus, { PaperResult } from '../components/PaperStatus';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuthContext } from '../hook/useAuthContext';
import LoadingPage from '../components/LoadingPage';
import AuthorSidebar from '../components/AuthorSidebar';
import Pagination from '../components/Pagination';
import useSearch from '../hook/useSearch';

function Author() {

  const { user } = useAuthContext()
  const [paper, setPaper] = useState([]);
  const [loading, setLoading] = useState('idle')
  const { data, status, error, handleSearchChange, handlePreviousPage, handleNextPage, page, totalPages } = useSearch('/api/paper/author/search')

  const handleDelPaper = async (paper_id) => {
    if (window.confirm("ต้องการจะลบหรือไม่")) {
      try {
        await axios.patch('/api/paper/cancel', {
          _id: paper_id
        }
        )
        alert('ลบบทความสำเร็จ')
        setPaper(paper.filter((items) => items._id !== paper_id))
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {

    const fethPaper = async () => {
      setLoading('loading')
      try {
        const res = await axios.get('/api/paper/owner')
        setPaper(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading('success')
      }
    }

    fethPaper();
  }, [user])

  const navigate = useNavigate();

  if (loading === 'idle' || loading === 'loading') {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error...</div>
  }

  return (
    <div>
      <div>
        <div>
          <AuthorSidebar />
        </div>
        <div style={{ marginLeft: "240px" }}>
          <div className='mt-4 mx-5'>
            <div className='card mb-3'>
              <div className='card-body'>
                <form onSubmit={handleSearchChange} className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h4 className='fw-bold'>In progress</h4>
                  </div>
                  <div>
                      <input name='search' type="search" className="form-control" placeholder="ค้นหาบทความ" />
                  </div>
                </form>
              </div>
            </div>
            <div style={{ minHeight: "600px" }}>
              {paper.length > 0 ? (
                <div className='card'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between mb-4 align-items-center'>
                      <div>Show items</div>
                      <div>
                        <Link to='/confr' className='btn btn-light text-dark fw-bold'>New +</Link>
                      </div>
                    </div>
                    <div className='table-responsive' style={{ minHeight: "500px" }}>
                      {status === 'idle' || status === 'loading' ? (
                        <div>
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <table className='table table-striped table-hover'>
                          <thead>
                            <tr>
                              <th scope='col'>ลำดับ</th>
                              <th scope='col' style={{ minWidth: "200px" }}>ชื่อบทความ</th>
                              <th scope='col'>รหัสงานประชุม</th>
                              <th scope='col'>รหัสบทความ</th>
                              <th>หัวข้อ</th>
                              <th scope='col'>สถานะ</th>
                              <th scope='col'>ผลลัพธ์</th>
                              <th scope='col'>วันที่ส่งบทความ</th>
                              <th scope='col'>เครื่องมือ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item.confr_code?.confr_code}</td>
                                <td>{item.paper_code}</td>
                                <td>{item.cate_code?.name}</td>
                                <td>
                                  <PaperStatus status={item.status} />
                                </td>
                                <td>
                                  <PaperResult status={item.result} />
                                </td>
                                <td>{dayjs(item.createdAt).format("DD/MM/YYYY HH:MM")}</td>
                                <td>
                                  <Dropdown drop='down-centered'>
                                    <Dropdown.Toggle variant="btn" id="dropdown-basic">
                                      <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      <Dropdown.Item onClick={() => navigate('/author/' + item._id)}>
                                        <span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>
                                        View
                                      </Dropdown.Item>
                                      {item.status === 'PENDING' &&
                                        <Dropdown.Item className='text-danger' onClick={() => handleDelPaper(item._id, item.paper_file)}>
                                          <span className='me-2'><ion-icon name="close-outline"></ion-icon></span>
                                          Cancel
                                        </Dropdown.Item>
                                      }
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )
                      }
                    </div>
                    <div>
                      <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageNext={handleNextPage}
                        onPagePrev={handlePreviousPage}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink to="/confr" className='btn btn-primary btn-lg'>ส่งบทความเลย!</NavLink>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Author