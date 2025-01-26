import React, { useEffect, useState } from 'react'
import axios from 'axios';
import OpenBook from '../asset/logo.png'
import LoadingPage from '../components/LoadingPage';
import SearchItemNotFound from '../components/SearchItemNotFound';
import { useNavigate } from 'react-router-dom';

function Paper() {


  const [paper, setPaper] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {

    const fethPaper = async () => {
      try {
        let res = await axios.get('/api/paper')
        setPaper(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fethPaper()
    setLoading(false)

  }, [])

  if (loading) {
    return (
      <LoadingPage />
    )
  }


  return (
    <div className='container my-5'>
      <section>
        <form className='d-md-flex justify-content-between align-items-center mb-5'>
          <h4 className='fw-bold'>รวมบทความ</h4>
          <div>
            <input type='search' className='form-control' placeholder='ค้นหาบทความ' autoComplete='off' />
          </div>
        </form>
        {paper.length > 0 ? (
          <div className='row g-3'>
            {paper?.map((item) => (
              <div className='col-md-6 col-lg-3' key={item._id}>
                <div className='card h-100'>
                  <div className='text-center p-3 mb-3'>
                    <img src={OpenBook} className='img-fluid' width={96} height={96} alt='...' />
                  </div>
                  <div className='card-body'>
                    <h5 className='card-title mb-3'>{item.title}</h5>
                    <div>
                      <button type='button' className='btn btn-outline-secondary' onClick={() => navigate(item._id)}>ดูเพิ่มเติม</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SearchItemNotFound />
        )}
      </section>
    </div>
  )
}

export default Paper