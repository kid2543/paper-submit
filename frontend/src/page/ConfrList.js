import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';


function ConfrList() {

  const [confr, setConfr] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fethConfr = async () => {
      try {
        const res = await axios.get('/api/conference')
        setConfr(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fethConfr();
  }, [])

  if (loading) {
    return (
      <LoadingPage />
    )
  }

  return (
    <div style={{ paddingTop: "128px" }}>
      <section className='container'>

        <div className='card text-bg-secondary'>
          <div className="card-body">
            <div className='mb-3'>
              <h4 className='card-title fw-bold mb-3'>งานประชุมวิชาการที่เปิดรับ</h4>
            </div>
            {confr.length > 0 ? (
              <div className='row g-3'>
                {confr.map((item) => (
                  <div key={item._id} className='col-12 col-md-6 col-lg-4'>
                    <div className='card shadow-sm h-100'>
                      <div className='card-body'>
                        <div className='d-flex flex-column justify-content-between h-100'>
                          <div>
                            <h4 className="fw-bold">{item.confr_code}</h4>
                            <p><i className="bi bi-calendar-event-fill me-2 text-primary">{dayjs(item.confr_end_date).format(" DD MMM YYYY")}</i></p>
                            <p>{item.title}</p>
                            {item.cate &&
                              <div className='mb-3'>
                                <span className='badge text-bg-dark'>{item.cate}</span>
                              </div>
                            }
                          </div>
                          <div className='mb-3'>
                            {item.tag?.map((items, index) => (
                              <span key={index} className='badge text-bg-secondary me-1'>{items}</span>
                            ))}
                          </div>

                          <div className='mt-3 text-end popup'>
                            <Link
                              to={`/confr/${item._id}`}
                              className='btn btn-primary btn-sm'
                              type='button'
                            >
                              รายละเอียดเพิ่มเติม
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                ไม่พบข้อมูลงานประชุม
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ConfrList