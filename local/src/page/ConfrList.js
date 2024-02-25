import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card'

function ConfrList() {

  const [confr, setConfr] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fethConfr = async () => {
    try {
      let res = await axios.get(process.env.REACT_APP_API_URL + '/conferences')
      setConfr(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fethConfr();
  }, [])

  return (
    <div>
      <div className='container-fluid my-4'>
        <h2>งานประชุมวิชาการที่เปิดรับ</h2>
        {loading ? (
          <h2>Loading....</h2>
        ) : (
          <div className='row'>
            {confr.map((item, index) => (
              <div key={item._id} className='col-md'>
                <Card title={item.title} link1={"/confr/" + item._id} subtitle={item.confr_desc} textlink1="รายละเอียดเพิ่มเติม" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfrList