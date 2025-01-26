import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (fethapi) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [key, setKey] = useState(0)

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
  }, [fethapi, key])

  return { data, error, status, setData, setKey, key }
}

export default useFetch