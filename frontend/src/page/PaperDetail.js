import React from 'react'
import useFetch from '../hook/useFetch'
import LoadingPage from '../components/LoadingPage'
import { Link, useParams } from 'react-router-dom'

function PaperDetail() {

  const { id } = useParams()
  const { data, error, status } = useFetch('/api/paper/single/' + id)
  const paperFile = useFetch('/api/paperfile/read/' + id)

  if (status === 'idle' || status === 'loading') {
    return <LoadingPage />
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <div className='bg-light' style={{ minHeight: '100vh' }}>
      {data &&
        <div>
          <section style={{ padding: "180px 0px" }} className="text-center">
            <h1 className="fw-bold">{data.title}</h1>
            <div className="text-muted">
                {data.author}
            </div>
          </section>
          <section className="bg-white" style={{ padding: "64px 0px" }}>
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="card-text mb-3">
                    <h4>รายละเอียด</h4>
                    <hr />
                    <div className="row g-3">
                      <div className="col-12 col-md-4">มหาวิทยาลัย</div>
                      <div className="col-12 col-md-8 text-muted">{data.university}</div>
                      <div className="col-12 col-md-4">สาขาวิชา</div>
                      <div className="col-12 col-md-8 text-muted">{data.group}</div>
                      <div className="col-12 col-md-4">อาจารย์ที่ปรึกษา</div>
                      <div className="col-12 col-md-8 text-muted">{data.advise}</div>
                    </div>
                  </div>
                  <div className='card-text'>
                    <div>
                      <h4>ติดต่อ</h4>
                      <hr />
                      <div className="row g-3">
                        <div className="col-12 col-md-4">ที่อยู่</div>
                        <div className="col-12 col-md-8 text-muted">{data.address}</div>
                        <div className="col-12 col-md-4">อีเมล</div>
                        <div className="col-12 col-md-8 text-muted">{data.email}</div>
                        <div className="col-12 col-md-4">เบอร์โทร</div>
                        <div className="col-12 col-md-8 text-muted">{data.contact}</div>
                      </div>
                    </div>
                  </div>
                  {paperFile.data?.length > 0 &&
                    <div className="mt-3">
                      <h4>ดูไฟล์บทความ</h4>
                      <hr />
                      <div className="row g-3">
                        {paperFile.data.map((items) => (
                          <div key={items._id} className="col-auto">
                            <Link
                              to={`/uploads/${items.original_file}`}
                              target='_blank'
                              rel='noreferrer'
                              className="btn btn-primary">
                              {items.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    </div>
  )
}

export default PaperDetail