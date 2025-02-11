import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingPage from '../components/LoadingPage';

// asset 
import Mock from '../asset/book.png'

function Paper() {


  const [paper, setPaper] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fethPaper = async () => {
      try {
        let res = await axios.get('/api/paper/all')
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
    <div style={{ padding: '128px 0px' }}>
      <section className='container'>
        <div className="card shadow-sm bg-light">
          <div className="card-body">
            <form>
              <h4 className='fw-bold card-title mb-3'>รายการบทความ</h4>
              <div>
                <input type='search' className='form-control' placeholder='ค้นหาบทความ' autoComplete='off' />
              </div>
            </form>
            {paper.length <= 0 &&
              <div className="text-center py-3">ไม่พบข้อมูลบทความ</div>
            }
            {paper &&
              <div className="row row-cols-1 row-cols-md-3 g-3">
                {paper.map((items) => (
                  <PaperCard key={items._id} />
                ))}
              </div>
            }
          </div>
        </div>
        {/* {paper.length > 0 ? (
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
        )} */}
      </section>
    </div>
  )
}

export default Paper


function PaperCard(props) {
  return (
    <div className="col" key={props.key}>
      <div className="card h-100">
        <img src={Mock} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <a className="btn btn-primary" href={`/paper/${props._id}`}>อ่านเพิ่มเติม</a>          
        </div>
      </div>
    </div>
  )
}