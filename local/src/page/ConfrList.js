import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import OpenBook from '../asset/book.png'

const api = process.env.REACT_APP_API_URL

function ConfrList() {

  const [confr, setConfr] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

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

  const saveConfr = (itemId) => {
    localStorage.setItem("confr_id", itemId)
    navigate("/confr/" + itemId)
  }

  useEffect(() => {
    fethConfr();
  }, [])

  return (
    <div className='container py-3'>
      <div className='container-fluid my-4'>
        <h2 className='mb-3'>งานประชุมวิชาการที่เปิดรับ</h2>
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <div>
            <form>
              <input type='search' className='form-control text-center my-5' placeholder='Search Conference...' autoComplete='off' />
            </form>
            {confr.length > 0 ? (
              <div className='row gx-5'>
                {confr.map((item) => (
                  <div key={item._id} className='col-12 col-md-6 col-lg-4 text-center mb-3'>
                    <div className='card p-3'>
                      <button className='btn' type='button' onClick={() => saveConfr(item._id)}>
                        <img src={OpenBook} alt='cover-confer' className='img-fluid' height={180} width={180} />
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
              <div className='text-center'>
                <h4>ไม่พบงานประชุมที่เปิดรับ</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfrList