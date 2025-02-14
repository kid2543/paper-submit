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
  const {
    data,
    status,
    error,
    handleSearchChange,
    handlePreviousPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage,
    handleNumberPage,
    page,
    totalPages
  } = useSearch('/api/paper/author/search')


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
    <div className="py-2">
      <ConfirmDeleteDialog
        header='ยืนยันการลบบทความ'
        message='ต้องการยกเลิกบทความหรือไม่หากยกเลิกแล้วจะไม่สามารถเปลี่ยนสถานะได้'
        onCancel={handleCloseDelete}
        onConfirm={() => handleDelPaper(deleteId)}
        show={showDeleteConfirm}
      />
      <div style={{ minHeight: "600px" }}>
        {paper.length > 0 ? (
          <div>
            <div>
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
              <div style={{ minHeight: 300 }}>
                {data?.length <= 0 &&
                  <div className="text-center py-5">
                    <h3 className="fw-bold">
                      ไม่พบข้อมูล
                    </h3>
                  </div>
                }
                {status === 'idle' || status === 'loading' ? (
                  <div>
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className='row g-3 row-cols-1 mb-3'>
                    {data?.map((items) => (
                      <div className="col" key={items._id}>
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title mb-3">
                              {items.title}
                            </h5>
                            <h6 className="card-subtitle text-muted mb-2">
                              {items.paper_code}
                            </h6>
                          </div>
                          <div className="list-group list-group-flush">
                            <div className="list-group-item">
                              รหัสงานประชุม: {items.confr_code?.confr_code}
                            </div>
                            <div className="list-group-item">
                              สถานะ: <PaperStatus status={items.status} />
                            </div>
                            <div className="list-group-item">
                              ผลลัพธ์: <PaperResult status={items.result} />
                            </div>
                            <div className="list-group-item">
                              วันที่ส่งบทความ: {dayjs(items.createdAt).format('DD MMM YYYY HH:mm น.')}
                            </div>
                            <div className="list-group-item">
                              วันที่แก้ไขล่าสุด: {dayjs(items.updatedAt).format('DD MMM YYYY HH:mm น.')}
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="btn-group">

                              <Link className="btn btn-primary" to={`/author/paper/${items._id}`}>
                                <i className="bi bi-pencil-square me-2"></i>
                                แก้ไขและดูรายละเอียด
                              </Link>

                              {items.status === 'PENDING' && items.result === 'PENDING' &&
                                <button
                                  className="btn btn-light text-danger"
                                  type='button'
                                  onClick={() => handleShowDelete(items._id)}
                                >
                                  <i className="bi bi-trash me-2"></i>
                                  ยกเลิกการส่งบทความ
                                </button>
                              }

                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
                }
              </div>
              <div>
                <PaginationComponent
                  currentPage={page}
                  totalPages={totalPages}
                  onPageNext={handleNextPage}
                  onPagePrev={handlePreviousPage}
                  onFirstPage={handleFirstPage}
                  onLastPage={handleLastPage}
                  onSelectPage={handleNumberPage}
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