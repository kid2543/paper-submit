import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import dayjs from 'dayjs';

import OpenBook from '../asset/open-book.png'

function Paper() {

  const api = process.env.REACT_APP_API_URL

  const [paper, setPaper] = useState([])

  const fethPaper = async () => {
    try {
      let res = await axios.get(api + "/paper")
      setPaper(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethPaper()
  }, [])

  console.log(paper)

  const navigate = useNavigate();
  return (
    <div className='container my-5'>
      <section className='my-4'>
        <h4 className='mb-3 fw-bold'>รวมบทความ</h4>
        <form>
          <input type='search' className='form-control text-center my-5' placeholder='Search Conference...' autoComplete='off' />
        </form>
        <div className='row'>
          {paper?.map((item) => (
            <div key={item._id} className='col-lg-4 text-center'>
            <a href={"/paper/" + item._id}>
              <img src={OpenBook} alt='cover-confer' height={300} width={200} />
            </a>
              <div className='mt-3'>
                <p>{item.title}</p>
                <small className='text-muted'><ion-icon name="time-outline"></ion-icon>{dayjs(item.create_date).format("DD/MM/YYYY")}</small>
              </div>

          </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Paper