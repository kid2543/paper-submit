import React from 'react'
import useFetch from '../hook/useFetch'
import { useParams } from 'react-router-dom'

// react-bootstrap
import { Breadcrumb } from 'react-bootstrap'

function ViewAward() {

  const { id } = useParams()
  const paper = useFetch('/api/paper/category/award/' + id)


  if (paper.data) {
    paper.data.sort((a, b) => a.award_rate - b.award_rate)
  }

  return (
    <div>
      <div className="card mb-3">
        <div className='card-body'>
          <Breadcrumb>
            <Breadcrumb.Item href="/host/edit/award">รางวัลดีเด่น</Breadcrumb.Item>
            <Breadcrumb.Item href={"/host/edit/award/" + id}>
              แก้ไขรางวัลดีเด่น
            </Breadcrumb.Item>
            <Breadcrumb.Item active>รายชื่อรางวัลดีเด่น</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className='fw-bold card-title'>รายชื่อรางวัลดีเด่น</h4>
          <p className='text-muted card-text'>ดูรายชื่อรางวัลดีเด่นได้ที่นี่</p>
        </div>
      </div>
      {paper.data &&
        <div className='row g-3'>
          {paper.data.map(papers => (
            <div className='col-12 col-md-6 col-lg-4' key={papers._id}>
              <div className='card  shadow-sm'>
                <div className='card-body row align-items-center'>
                  <div className='col-12 col-md-4 text-md-center'>
                    <h1 className='text-primary'>{papers.award_rate}</h1>
                  </div>
                  <div className='col-12 col-md-8'>
                    <h6>{papers.title}</h6>
                    <p className='text-muted'>{papers.paper_code}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default ViewAward