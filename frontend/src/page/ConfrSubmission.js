import React from 'react'
import useFetch from '../hook/useFetch'
import { Link, useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function ConfrSubmission() {

  const { id } = useParams()
  const { data, error, status } = useFetch('/api/conference/single/' + id)
  const template = useFetch('/api/template/' + id)
  console.log(template)

  if (status === 'loading' || status === 'idle') {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error</div>
  }

  return (
    <div className='bg-light' style={{ minHeight: "100vh" }}>
      {data &&
        <div>
          <section style={{ padding: "180px 0px" }} className='text-center'>
            <h1 className='display-1 fw-bold'>ข้อแนะนำการส่งบทความ</h1>
            <p className='text-muted'>อ่านรายละเอียดการส่งบทความ และดาวน์โหลดเทมเพลต ได้ที่นี่!</p>
          </section>
          {template.data?.length > 0 &&
            <section className='bg-white' style={{ padding: "64px 0px" }}>
              <div className='container'>
                <h4 className='fw-bold mb-4'>Template</h4>
                <div className='row g-3'>
                  {template.data.map(items => (
                    <div key={items._id} className='col-12 col-md-4'>
                      <div>
                        <Link target='_blank' rel='noreferrer' to={`${api}/uploads/${items.file}`} className='btn btn-outline-dark'>
                          <span className='me-2'>
                            <i className="bi bi-download"></i>
                          </span>
                          {items.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          }
          {data.submit_detail.length > 0 &&
            <section className='bg-white' style={{ padding: "64px 0px" }}>
              <div className='container'>
                <div className='card text-bg-secondary'>
                  <div className='card-body'>
                <h4 className='fw-bold mb-4 card-title'>ข้อแนะนำการส่งบทความ</h4>
                    {data.submit_detail.map((items, index) => (
                      <li key={index}>{items}</li>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          }
        </div>
      }
    </div>
  )
}

export default ConfrSubmission