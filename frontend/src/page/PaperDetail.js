import React, { useEffect, useState } from 'react'
import bookCover from '../asset/book.png'
import dayjs from 'dayjs'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const mockPaper = {
  title: "ชื่อบทความ",
  desc: "รายละเอียดบทความ",
  create_date: Date("12-12-2024"),
  image: bookCover,
}

function PaperDetail() {

  const { id } = useParams()

  const [paper, setPaper] = useState({})

  useEffect(() => {

  const fethPaper = async () => {
    try {
      const res = await axios.get('/api/paper/' + id)
      setPaper(res.data)
    } catch (error) {
      console.log(error)
    }
  }

    fethPaper()

  },[id])

  return (
    <div className='container py-3'>
      <section className='my-4'>
        <h2>{paper?.title}</h2>
        <p className='text-muted'><ion-icon name="time-outline"></ion-icon>เผยแพร่เมื่อ {dayjs(paper?.create_date).format("DD MM YYYY")}</p>
      </section>
      <section className='container-fluid my-4'>
        <div className='row'>
          <div className='col-lg-4 my-3'>
            <img src={mockPaper.image} alt='cover-book' height={300} width={200} />
          </div>
          <div className='col-lg-8 my-3'>
            <button>ดูบทความ</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PaperDetail