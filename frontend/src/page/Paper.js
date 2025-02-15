import React from 'react'
import LoadingPage from '../components/LoadingPage';
import useSearch from '../hook/useSearch';
import PaginationComponent from '../components/Pagination';

// asset 
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function Paper() {

  const {
    data,
    error,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handleNumberPage,
    handlePreviousPage,
    handleSearchChange,
    page,
    status,
    totalPages
  } = useSearch('/api/paper/archive')

  return (
    <div style={{ padding: '128px 0px' }}>
      <section className='container'>
        <div className="card shadow-sm bg-light">
          <div className="card-body">
            <h4 className='fw-bold card-title mb-3'>รายการบทความ</h4>
            <form className='mb-3' onSubmit={handleSearchChange}>
              <div className="input-group">
                <input
                  type='search'
                  name='search'
                  className='form-control'
                  placeholder='ค้นหาบทความ'
                  autoComplete='off'
                />
                <button className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            {data &&
              <div>
                {error &&
                  <div className="alert alert-danger">
                    {error}
                  </div>
                }
                {status === 'idle' || status === 'loading' ? (
                  <LoadingPage />
                ) : (
                  <div className="table-responsive" style={{ minHeight: 400 }}>
                    <table className="table" style={{ minWidth: 1000 }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>ชื่อ</th>
                          <th>วันที่เผยแพร่</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((items, index) => (
                          <tr key={items._id}>
                            <td>{(page - 1) * 10 + (index + 1)}</td>
                            <td>
                              <Link
                                to={`/paper/${items._id}`}
                              >
                                {items.title}
                              </Link>
                            </td>
                            <td>{dayjs(items.updatedAt).format('DD MMM YYYY')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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