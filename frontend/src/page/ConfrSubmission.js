import React from 'react'
import useFetch from '../hook/useFetch'
import { Link, useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import Accordion from 'react-bootstrap/Accordion';

function ConfrSubmission() {

  const { id } = useParams()
  const { data, error, status } = useFetch('/api/conference/single/' + id)
  const template = useFetch('/api/template/' + id)

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
            <p className='text-muted px-3'>อ่านรายละเอียดการส่งบทความ และดาวน์โหลดเทมเพลต ได้ที่นี่!</p>
          </section>
          {template.data?.length > 0 &&
            <section className='bg-white' style={{ padding: "64px 0px" }}>
              <div className='container'>
                <h4 className='fw-bold mb-4'>เทมเพลต</h4>
                <div className='row g-3'>
                  {template.data.map(items => (
                    <div key={items._id} className='col-auto'>
                      <div>
                        <Link target='_blank' rel='noreferrer' to={`/uploads/${items.file}`} className='btn btn-outline-dark p-3'>
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
              <div className="container">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>ข้อแนะนำการส่งบทความ</Accordion.Header>
                    <Accordion.Body>
                      <ol>
                        {data.submit_detail.map((items, index) => (
                          <li key={index}>{items}</li>
                        ))}
                      </ol>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </section>
          }
        </div>
      }
    </div>
  )
}

export default ConfrSubmission