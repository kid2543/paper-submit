import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import PaperStatus, { PaperResult } from '../components/PaperStatus';
import { useAuthContext } from '../hook/useAuthContext';
import LoadingPage from '../components/LoadingPage';
import PaginationComponent from '../components/Pagination';
import useSearch from '../hook/useSearch';
import { toast } from 'react-toastify';
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog';

function Author() {

  const { user } = useAuthContext()
  const [paper, setPaper] = useState([]);
  const [loading, setLoading] = useState('idle')
  const { data, status, error, handleSearchChange, handlePreviousPage, handleNextPage, page, totalPages } = useSearch('/api/paper/author/search')


  // confirm author cancel paper
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const handleShowDelete = (paper_id) => {
    setDeleteId(paper_id)
    setShowDeleteConfirm(true)
  }

  const handleCloseDelete = () => {
    setDeleteId('')
    setShowDeleteConfirm(false)
  }


  const handleDelPaper = async (paper_id) => {
    try {
      await axios.patch('/api/paper/cancel', {
        _id: paper_id
      }
      )
      toast.success('ลบบทความสำเร็จ')
      setPaper(paper.filter((items) => items._id !== paper_id))
    } catch (error) {
      console.log(error)
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      handleCloseDelete()
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

  if (loading === 'idle' || loading === 'loading') {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error...</div>
  }

  return (
    <div>
      <ConfirmDeleteDialog 
        header='ยืนยันการลบบทความ'
        message='ต้องการยกเลิกบทความหรือไม่หากยกเลิกแล้วจะไม่สามารถเปลี่ยนสถานะได้'
        onCancel={handleCloseDelete}
        onConfirm={() => handleDelPaper(deleteId)}
        show={showDeleteConfirm}
      />
      <div style={{ minHeight: "600px" }}>
        {paper.length > 0 ? (
          <div className='card'>
            <div className='card-body'>
              <div className='d-flex justify-content-between mb-3 align-items-center'>
                <h4 className="card-title fw-bold mb-0">รายการบทความ</h4>
                <div>
                  <Link to='/confr' className='btn btn-primary fw-bold'>
                    <i className='bi bi-send-arrow-down me-2'></i>
                    ส่งบทความ
                  </Link>
                </div>
              </div>
              <form onSubmit={handleSearchChange} className="mb-3">
                <div>
                  <input name='search' type="search" className="form-control" placeholder="ค้นหาบทความ" />
                </div>
              </form>
              <div className='table-responsive'>
                {status === 'idle' || status === 'loading' ? (
                  <div>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <table className='table' style={{ minHeight: "400px", minWidth: '1600px', tableLayout: "fixed" }}>
                    <thead>
                      <tr>
                        <th scope='col'>ลำดับ</th>
                        <th scope='col' style={{ width: '300px' }}>ชื่อบทความ</th>
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
                          <td>{dayjs(item.createdAt).format("DD MMM YYYY HH:MM")}</td>
                          <td>
                            <div className="btn-group">
                              <Link className='btn btn-light' to={`/author/paper/${item._id}`}>
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                              {item.status === 'PENDING' &&
                                <button
                                  className="btn btn-light text-danger"
                                  onClick={() => handleShowDelete(item._id)}
                                  type='button'>
                                  <i className="bi bi-trash"></i>
                                </button>
                              }
                            </div>
                            {/* <Dropdown drop='down-centered'>
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
                            </Dropdown> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
                }
              </div>
              <div>
                <PaginationComponent
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
  )
}

export default Author