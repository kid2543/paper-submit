import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function CommitteesList() {

  const api = process.env.REACT_APP_API_URL
  const { id } = useParams()
  const [list, setList] = useState([])
  const [confrData, setConfrData] = useState({})
  const [positionData, setPositionData] = useState([])
  const [loading, setLoading] = useState(true)

  const fethData = async () => {
    setLoading(true)
    try {
      const position = await axios.get(api + "/get/position/" + id)
      setPositionData(position.data)
      const confr = await axios.get(api + "/get/confr/" + id)
      setConfrData(confr.data)
      setList(confr.data.committees)
      console.log("all data", confr.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const displayCommittee = (value) => {
    const foo = []
    for(let i in list) {
      if(value === list[i].position){
        foo.push(list[i])
      }
    }
    return foo
  }

  useEffect(() => {
    fethData()
  }, [])

  if (loading) {
    return (
      <div className='my-5 p-5 text-center'>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className='mb-5'>
        <h4 className='fw-bold'>รายชื่อกรรมการ</h4>
        <p className='text-muted'>{confrData?.title}</p>
      </div>
      <div>
        <div>
          {positionData?.map((item, index) => (
            <div key={index} className='mb-5'>
              <p className='fw-bold mb-3'>
              <span className='text-primary me-2 p-0'><ion-icon name="people"></ion-icon></span>
               {item.toUpperCase()}
              </p>
              {displayCommittee(item)?.map((item) => (
                <div key={item._id}>
                  <p>{item.name} <br className='d-block d-md-none' /> <small className='text-muted'>({item.belong_to})</small></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommitteesList