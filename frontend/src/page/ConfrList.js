import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import useSearch from '../hook/useSearch';
import { Dropdown } from 'react-bootstrap';
import PaginationComponent from '../components/Pagination';


function ConfrList() {

  const {
    data,
    error,
    handleNextPage,
    handlePreviousPage,
    handleSearchCate,
    handleSearchChange,
    handleSearchTag,
    page,
    totalPages,
    status,
    handleLastPage,
    handleFirstPage,
    handleNumberPage
  } = useSearch('/api/conference/open/search')

  const [selectV, setSelectV] = useState('TITLE')

  return (
    <div style={{ padding: "128px 0px" }}>
      <section className='container'>
        <div className="card">
          <div className='card-body'>
            <div className='mb-3'>
              <h4 className='card-title fw-bold'>งานประชุมวิชาการที่เปิดรับ</h4>
              <p className="text-muted">เลือกงานประชุมและส่งบทความได้ที่นี่</p>
            </div>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="success">
                เลือกฟอร์มการค้นหา
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  active={selectV === 'TITLE'}
                  type='button'
                  onClick={() => setSelectV('TITLE')}
                >
                  ค้นหาจากชื่องานประชุม
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectV === 'CATE'}
                  type='button'
                  onClick={() => setSelectV('CATE')}
                >
                  ค้นหาจากหมวดหมู่
                </Dropdown.Item>
                <Dropdown.Item
                  active={selectV === 'TAG'}
                  type='button'
                  onClick={() => setSelectV('TAG')}
                >
                  ค้นหาจาก Tag
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="mb-3">
              {selectV === 'TITLE' &&
                <form onSubmit={handleSearchChange}>
                  <div className="input-group">
                    <input
                      name='search'
                      className="form-control"
                      placeholder='ค้นหางานประชุมวิชาการด้วยชื่องานประชุม'
                    />
                    <button className="btn btn-primary">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </form>
              }
              {selectV === 'TAG' &&
                <form onSubmit={handleSearchTag}>
                  <div className="input-group">
                    <input
                      name='tag'
                      className="form-control"
                      placeholder='ค้นหางานประชุมด้วย tag'
                    />
                  </div>
                </form>
              }
              {selectV === 'CATE' &&
                <form onSubmit={handleSearchCate}>
                  <div className="input-group">
                    <input
                      name='cate'
                      className="form-control"
                      placeholder='ค้นหางานประชุมด้วยหมวดหมู่'
                    />
                  </div>
                </form>
              }
            </div>
            {error &&
              <div className="alert alert-warning">
                {error}
              </div>
            }
            {data?.length > 0 ? (
              <div>
                {status === 'idle' || status === 'loading' ? (
                  <LoadingPage />
                ) : (
                  <div className='table-responsive' style={{ minHeight: 400 }}>
                    <table className="table table-hover" style={{ minWidth: 1000 }}>
                      <thead>
                        <tr>
                          <th style={{ width: 128 }}>กำหนดการ</th>
                          <th>ชื่องานประชุม</th>
                          <th>หมวดหมู่</th>
                          <th>tag</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((items) => (
                          <tr key={items._id}>
                            <td>{dayjs(items.confr_end_date).format('DD MMM YYYY')}</td>
                            <td>
                              <Link target='_blank' rel='noreferrer' to={`/confr/${items._id}`}>
                                {items.title}
                              </Link>
                            </td>
                            <td>{items.cate?.map((cates, cate_index) => (
                              <span className="badge text-bg-primary me-2" key={cate_index}>{cates}</span>
                            ))}</td>
                            <td>{items.tag?.map((tags, tags_index) =>
                              <span key={tags_index} className="badge text-bg-dark me-2">{tags}</span>
                            )}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h3 className="fw-bold">ไม่พบข้อมูล</h3>
              </div>
            )}
            <PaginationComponent
              currentPage={page}
              onPageNext={handleNextPage}
              onPagePrev={handlePreviousPage}
              totalPages={totalPages}
              onFirstPage={handleFirstPage}
              onLastPage={handleLastPage}
              onSelectPage={handleNumberPage}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ConfrList