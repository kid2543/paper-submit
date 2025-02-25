import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

// asset
import Logo from '../asset/article.png'
import Guide from '../asset/guide-book.png'

// component
import Footer from '../components/Footer'
import { useAuthContext } from '../hook/useAuthContext'
import useFetch from '../hook/useFetch'
import LoadingPage from '../components/LoadingPage'

function Home() {

  const { user } = useAuthContext()
  const { data, error, status } = useFetch('/api/conference/current')

  if (status === 'loading' || status === 'idle') {
    return <LoadingPage />
  }

  if (error) {
    return <div>page have error</div>
  }

  return (
    <div>
      <section className='container' style={{ paddingTop: "128px", paddingBottom: "128px" }}>
        <div className='row g-3 align-items-center text-center text-md-start'>
          <div className='col-12 col-lg-6'>
            <div className='row gy-4'>
              <div className='col-12'>
                <h1 className='display-1 fw-bold'>สร้างงานประชุม และส่งบทความกับ <span className='text-primary'>PAPERSS</span></h1>
                <h5 className='my-5 fw-normal'>สร้างงานประชุม และส่งบทความวิชาการตามหัวข้อที่สนใจได้ที่ Papers Submission</h5>
              </div>
              <div className='col-12 align-middle'>
                <div className='row gy-3 gx-5 align-items-center'>
                  <div className='col-6'>
                    <Link to={user ? "/setting" : "/signup"} className='btn btn-primary w-100'>
                      เริ่มต้นใช้งาน
                    </Link>
                  </div>
                  <div className='col-6'>
                    <Link to='/confr' className='text-primary'>
                      <i className='bi bi-search me-1'></i> ค้นหางานประชุม
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='text-center'>
              <img src={Logo} alt='paper submission' className='img-fluid' />
            </div>
          </div>
        </div>
      </section>
      <section className='bg-light' style={{ padding: "128px 0px", marginBottom: "64px" }}>
        <div className='container'>
          <div>
            <div className='text-center mb-5'>
              <h1 className='fw-bold'>งานประชุม</h1>
              <h4 className='text-muted'>เลือกงานประชุมและส่งบทความได้เลย!</h4>
            </div>
            {data &&
              <div className='row g-4 hover-card'>
                {data.map(items => (
                  <a href={`/confr/${items._id}`} key={items._id} className='col-lg-4'>
                    <div className='card  h-100'>
                      <div className='card-body'>
                        <h4 className='fw-bold card-title'>{items.confr_code}</h4>
                        <p>
                          <i className='bi bi-calendar-event-fill me-2 text-primary'></i>
                          {dayjs(items.confr_end_date).format('DD MMM YYYY')}
                        </p>
                        <p>{items.title}</p>
                        {items.cate &&
                          <div className='mt-5'>
                            <small className='btn btn-light fw-bold text-primary btn-sm rounded-pill'>{items.cate}</small>
                          </div>
                        }
                        {items.tag &&
                          <div className='mt-5'>
                            {items.tag.map((tags, index) => (
                              <small key={index} className='badge bg-light text-dark me-2 mb-2'>{tags}</small>
                            ))}
                          </div>
                        }
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            }
          </div>
        </div>
      </section>
      <section className='container' style={{ paddingBottom: "128px" }}>
        <div>
          <h1 className='col-12 fw-bold col-lg-6 mx-auto text-center mb-5'>ทำไมต้องสร้างงานประชุมและส่งบทความ กับ <span className='text-primary'>PAPERSS</span></h1>
          <div className='row g-3 hover-card'>
            <div className='col-12 col-lg-3'>
              <div className='card h-100 text-bg-light'>
                <div className='card-body p-4 d-flex'>
                  <div className='fs-2 me-4'>
                    <i className="bi bi-search"></i>
                  </div>
                  <div>
                    <h4 className='fw-bold mt-2'>ค้นหาง่าย</h4>
                    <p className='mb-0'>ค้นหางานประชุมและบทความได้ในที่เดียว</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-3'>
              <div className='card h-100 text-bg-light'>
                <div className='card-body p-4 d-flex'>
                  <div className='me-4 fs-2'>
                    <i className="bi bi-bell"></i>
                  </div>
                  <div>
                    <h4 className='fw-bold'>แจ้งเตือน</h4>
                    <p className='mb-0'>ติดตามสถานะส่งบทความด้วยระบบแจ้งเตือนการส่งบทความ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-3'>
              <div className='card h-100 text-bg-light'>
                <div className='card-body p-4 d-flex'>
                  <div className='me-4 fs-2'>
                    <i className="bi bi-fast-forward"></i>
                  </div>
                  <div>
                    <h4 className='fw-bold'>สะดวก</h4>
                    <p className='mb-0'>สร้างงานประชุมง่ายไม่ยุ่งยาก และไม่ต้องพัฒนาระบบเองทั้งหมด</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-lg-3'>
              <div className='card text-bg-light h-100'>
                <div className='card-body d-flex p-4'>
                  <div className='me-4 fs-2'>
                    <i className="bi bi-cash"></i>
                  </div>
                  <div>
                    <h4 className='fw-bold'>ประหยัด</h4>
                    <p className='mb-0'>ไม่ต้องเสียค่าใช้จ่ายในการเช่า Hosting ในการพัฒนาเว็บไซต์และเผยแพร่เอง</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container' style={{ paddingBottom: "128px" }}>
        <div className='text-center mb-5'>
          <h1 className='fw-bold'>เริ่มส่งบทความกับ <span className='text-primary'>PAPERSS</span><br />ใน 3 ขั้นตอน</h1>
        </div>
        <div className='row g-5'>
          <div className='col-12 col-lg-6'>
            <div className='hover-card row g-3'>
              <div className='col-12'>
                <div className='card text-bg-light'>
                  <div className='card-body d-flex'>
                    <div className='me-4'>
                      <i className="fs-2 bi bi-newspaper"></i>
                    </div>
                    <div>
                      <h4 className='card-title'>สมัคร</h4>
                      <p>สมัครสมาชิกกับ <span className='fw-bold'>PAPERSS</span> ผ่านคอมพิวเตอร์ หรือมือถือเพื่อเริ่มการใช้งาน</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <div className='card text-bg-light'>
                  <div className='card-body d-flex'>
                    <div className='me-4'>
                      <i className="fs-2 bi bi-search"></i>
                    </div>
                    <div>
                      <h4 className='card-title'>ค้นหา</h4>
                      <p>ค้นหางานประชุมกับ <span className='fw-bold'>PAPERSS</span> ด้วยการพิมพ์ชื่อบทความหรือหมวดหมู่ที่สนใจ</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                <div className='card text-bg-light'>
                  <div className='card-body d-flex'>
                    <div className='me-4'>
                      <i className="fs-2 bi bi-pen"></i>
                    </div>
                    <div>
                      <h4 className='card-title'>กรอกข้อมูล</h4>
                      <p>กรอกข้อมูลบทคามให้ครบถ้วน ส่งบทความและรอติดตามผล</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 col-lg-6 text-center'>
            <img src={Guide} alt='how to' width={375} />
          </div>
        </div>

      </section>
      <section className='container' style={{ paddingBottom: "128px" }}>
        <div className='card  text-center shadow p-5'>
          <div className='card-body'>
            <div>
              <div className='mb-3'>
                <h1>พัฒนางานวิจัยวิชาการไปพร้อมกับเรา<br />สมัครฟรี ที่</h1>
              </div>
              <div className='col-12 col-md-6 col-lg-4 mx-auto'>
                <Link to={user ? "/setting" : "/signup"} className='btn btn-primary w-100'>สมัคร</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  )
}

export default Home