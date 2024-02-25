import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import { Dropdown } from 'react-bootstrap';

function Host() {

  const navigate = useNavigate()
  const [confr, setConfr] = useState();

  const token = sessionStorage.getItem('token')
  const api = process.env.REACT_APP_API_URL

  const fethConfr = async () => {
    try {
      let res = await axios.get(api + "/get/host/confr/" + token)
      setConfr(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethConfr();
  }, [])

  return (
    <div className='container-fluid my-4'>
      <h2 className='text-center mb-4'>รายการงานประชุม</h2>
      <table className='table'>
        <thead>
          <tr className='table-primary'>
            <th scope='col'>ลำดับ</th>
            <th scope='col'>ชื่องานประชุม</th>
            <th scope='col'>วันที่สร้าง</th>
            <th scope='col'>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {confr?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{dayjs(item.create_date).format('DD/MM/YYYY')}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    tool
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={"/host/edit/" + item._id}>Edit</Dropdown.Item>
                    <Dropdown.Item href={"/host/paper/" + item._id}>Assign</Dropdown.Item>
                    <Dropdown.Item href={"/host/over-all/" + item._id}>Result</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Host