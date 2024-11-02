import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import PaperStatus, { PaperResult } from '../components/PaperStatus';
import Dropdown from 'react-bootstrap/Dropdown';


const api = process.env.REACT_APP_API_URL

function Author() {

  const [paper, setPaper] = useState([]);
  const [loading, setLoading] = useState(true)


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

    fethPaper();
  }, [])

  const navigate = useNavigate();

  return (
    <div className='container my-5'>
      <h4 className='fw-bold mb-3'>รายการบทความ</h4>
      {loading ? (
        <div className='my-5 p-5 text-center'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='table-responsive' style={{minHeight: "600px"}}>
          {paper.length > 0 ? (
            <table className='table table-hover overflow-auto'>
              <thead>
                <tr>
                  <th scope='col'>ลำดับ</th>
                  <th scope='col' style={{minWidth: "200px"}}>ชื่อบทความ</th>
                  <th scope='col'>รหัสงานประชุม</th>
                  <th scope='col'>รหัสบทความ</th>
                  <th>หัวข้อ</th>
                  <th scope='col'>สถานะ</th>
                  <th scope='col'>ผลลัพธ์</th>
                  <th scope='col'>วันที่ส่งบทความ</th>
                  <th scope='col'>เครื่องมือ</th>
                </tr>
              </thead>
              <tbody>
                {paper?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.confr_code?.confr_code}</td>
                    <td>{item.paper_code}</td>
                    <td>{item.cate_code?.name}</td>
                    <td>
                      <PaperStatus status={item.status} />
                    </td>
                    <td>
                      <PaperResult status={item.result} />
                    </td>
                    <td>{dayjs(item.create_date).format("DD/MM/YYYY")}</td>
                    <td>
                      <Dropdown drop='down-centered'>
                        <Dropdown.Toggle variant="btn" id="dropdown-basic">
                          <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => navigate('/author/paper/' + item._id)}>
                            <span className='me-2'><ion-icon name="eye-outline"></ion-icon></span>
                            View
                          </Dropdown.Item>
                          <Dropdown.Item className='text-danger' onClick={() => handleDelPaper(item._id, item.paper_file)}>
                            <span className='me-2'><ion-icon name="trash-outline"></ion-icon></span>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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