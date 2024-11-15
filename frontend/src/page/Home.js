import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hook/useAuthContext'

function Home() {

  const [data, setData] = useState([])
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/paper', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (user) {
      fetchData()
    }

  }, [])

  return (
    <div className='container my-5'>
      <h1>Home Page</h1>
      {data &&
        <div>
          {data.map((items) => (
            <div key={items._id}>
              {items.title}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Home