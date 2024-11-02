import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import OpenBook from '../asset/logo.png'
import LoadingPage from '../components/LoadingPage';
import SearchItemNotFound from '../components/SearchItemNotFound';

const api = process.env.REACT_APP_API_URL

function ConfrList() {

  const [confr, setConfr] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const saveConfr = (itemId) => {
    localStorage.setItem("confr_id", itemId)
    navigate("/confr/" + itemId)
  }

  useEffect(() => {

    const fethConfr = async () => {
      try {
        let res = await axios.get(api + '/conferences')
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
    <div className='container my-5'>
      <div>
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
                <div key={item._id} className='col-12 col-md-6 col-lg-3 text-center mb-3'>
                  <div className='card p-3'>
                    <button className='btn' type='button' onClick={() => saveConfr(item._id)}>
                      <img src={OpenBook} alt='cover-confer' className='img-fluid' height={96} width={96} />
                    </button>
                    <div className='mt-3'>
                      <small className='text-muted'>{item.title}</small>
                      <p className='mt-3'><ion-icon name="time-outline"></ion-icon>{dayjs(item.confr_end_date).format(" DD MMM YYYY")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SearchItemNotFound />
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfrList