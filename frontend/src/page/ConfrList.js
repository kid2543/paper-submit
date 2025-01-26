import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import SearchItemNotFound from '../components/SearchItemNotFound';


function ConfrList() {

  const [confr, setConfr] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const saveConfr = (itemId, confrCode) => {
    localStorage.setItem("confr_id", itemId)
    localStorage.setItem("confr_code", confrCode)
    navigate("/confr/" + itemId)
  }

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
    <div style={{paddingTop: "128px"}}> 
      <section className='container'>
        <div className='d-md-flex justify-content-between align-items-center mb-3'>
          <h4 className='fw-bold mb-3 mb-md-0'>งานประชุมวิชาการที่เปิดรับ</h4>
          <form>
            <input type='search' className='form-control form-control' placeholder='ค้นหางานประชุม' autoComplete='off' />
          </form>
        </div>
        <div>
          {confr.length > 0 ? (
            <div className='row gx-5'>
              {confr.map((item) => (
                <div key={item._id} className='col-12 col-md-6 col-lg-4 mb-3'>
                  <div className='card text-bg-light border-0 shadow-sm h-100'>
                    <div className='card-body'>
                      <div className='d-flex flex-column justify-content-between h-100'>
                        <div className='mt-3'>
                          <h4 className='card-title'>{item.title}</h4>
                          <p className=''><i>{dayjs(item.confr_end_date).format(" DD MMM, YYYY")}</i></p>
                        </div>
                        {item.cate &&
                          <div className='mb-3'>
                            <span className='badge text-bg-dark'>{item.cate}</span>
                          </div>
                        }
                        <div className='mb-3'>
                          {item.tag?.map((items, index) => (
                            <span key={index} className='badge text-bg-secondary me-1'>{items}</span>
                          ))}
                        </div>

                        <div className='mt-3 text-end popup'>
                          <button className='btn btn-primary btn-sm' type='button' onClick={() => saveConfr(item._id, item.confr_code)}>
                            รายละเอียดเพิ่มเติม
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SearchItemNotFound />
          )}
        </div>
      </section>
    </div>
  )
}

export default ConfrList