import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

function Author() {

  const api = process.env.REACT_APP_API_URL
  const [paper, setPaper] = useState([]);
  const [loading, setLoading] = useState(true)

  const fethPaper = async () => {
    setLoading(true)
    try {
      const res = await axios.get(api + '/get/table/paper/' + sessionStorage.getItem('token'))
      setPaper(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const statusFormat = (status) => {
    switch (status) {
      case 0 : return <p className='badge bg-secondary'>รอดำเนินการ</p>
      case 1 : return <p className='badge bg-primary'>กำลังดำเนินการ</p>
      case 2 : return <p className='badge bg-success'>ผ่าน</p>
      case 3 : return <p className='badge bg-warning'>ผ่าน (แก้ไข)</p>
      case 4 : return <p className='badge bg-danger'>ไม่ผ่าน</p>
      case 5 : return <p className='badge bg-danger'>ยกเลิก</p>
    }
  }


  const handleDelPaper = async (paper_id) => {
    if (window.confirm("ต้องการจะลบหรือไม่")) {
      try {
        const del = await axios.delete(api + "/delete/paper/" + paper_id)
        alert(del.data)
        setPaper((prev) => {
          console.log(prev)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fethPaper();
  }, [])

  const navigate = useNavigate();

  return (
    <div className='container'>
      <h2 className='fw-bold mb-3'>รายการบทความ</h2>
      {loading ? (
        <div className='my-5 p-5 text-center'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='table-responsive'>
          {paper.length > 0 ? (
            <table className='table table-hover text-nowrap'>
              <thead>
                <tr>
                  <th scope='col'>ลำดับ</th>
                  <th scope='col'>ชื่อบทความ</th>
                  <th scope='col'>รหัสงานประชุม</th>
                  <th scope='col'>รหัสบทความ</th>
                  <th>หัวข้อ</th>
                  <th scope='col'>สถานะล่าสุด</th>
                  <th scope='col'>วันที่ส่งบทความ</th>
                  <th scope='col'>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {paper?.map((item, index) => (
                  <tr key={item._id}>
                    <td scope='row'>{index + 1}</td>
                    <td scope='row'>{item.title}</td>
                    <td scope='row'>{item.confr_code?.confr_code}</td>
                    <td scope='row'>{item.paper_code}</td>
                    <td scope='row'>{item.cate_code?.name}</td>
                    <td scope='row'>{statusFormat(item.status)}</td>
                    <td scope='row'>{dayjs(item.create_date).format("DD/MM/YYYY")}</td>
                    <td scope='row'>
                      <button type='button' className='btn text-primary me-2' onClick={() => navigate('/author/paper/' + item._id)}><ion-icon name="eye"></ion-icon> ดูผลลัพธ์</button>
                      {item.status === 5 ? null:(<button type='button' onClick={() => handleDelPaper(item._id, item.paper_file)} className='btn text-danger'><ion-icon name="close-circle"></ion-icon> ยกเลิก</button>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
              <NavLink to="/confr" className='btn btn-primary btn-lg'>ส่งบทความเลย!</NavLink>
          )}

        </div>
      )}
    </div>
  )
}

export default Author