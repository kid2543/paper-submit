import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (fethapi) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {

    setStatus('loading')

    const fetchData = async () => {
      try {
        const res = await axios.get(fethapi)
        setData(res.data)
        setStatus('success')
      } catch (error) {
        console.log(error)
        setError(error)
        setStatus('error')
      }
    }

    fetchData()
  }, [fethapi])

  return {data, error, status, setData}
}

export default useFetch