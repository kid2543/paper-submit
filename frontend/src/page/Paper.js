import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';
import useSearch from '../hook/useSearch';
import PaginationComponent from '../components/Pagination';

// asset 
import Mock from '../asset/book.png'

function Paper() {

  const [paper, setPaper] = useState([])
  const [loading, setLoading] = useState(true)

  const {
    data,
    error,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handleNumberPage,
    handlePreviousPage,
    handleSearchCate,
    handleSearchChange,
    handleSearchTag,
    page,
    status,
    totalPages
  } = useSearch('/api/paper/archive')

  useEffect(() => {

    const fethPaper = async () => {
      try {
        let res = await axios.get('/api/paper/all')
        setPaper(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fethPaper()
    setLoading(false)

  }, [])

  if (loading) {
    return (
      <LoadingPage />
    )
  }


  return (
    <div style={{ padding: '128px 0px' }}>
      <section className='container'>
        <div className="card shadow-sm bg-light">
          <div className="card-body">
            <form className='mb-3'>
              <h4 className='fw-bold card-title mb-3'>รายการบทความ</h4>
              <div>
                <input type='search' className='form-control' placeholder='ค้นหาบทความ' autoComplete='off' />
              </div>
            </form>
            {paper.length <= 0 &&
              <div className="text-center py-3">ไม่พบข้อมูลบทความ</div>
            }
            {paper &&
              <div>
                <div className="list-group">
                  {paper.map((items) => (
                    <div key={items._id} className='list-group-item'>
                      <div className='row'>
                        <div className='col-12 col-lg-3'>
                            <img src={Mock} alt={items.title} width={64} />
                        </div>
                        <div className='col-12 col-lg-9'>
                          {items.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationComponent
                  currentPage={page}
                  onFirstPage={handleFirstPage}
                  onLastPage={handleLastPage}
                  onPageNext={handleNextPage}
                  onPagePrev={handlePreviousPage}
                  onSelectPage={handleNumberPage}
                  totalPages={totalPages}
                />
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Paper