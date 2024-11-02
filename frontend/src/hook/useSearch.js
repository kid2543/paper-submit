import { useEffect, useState } from 'react'
import axios from 'axios'

const api = process.env.REACT_APP_API_URL

const useSearch = (fethapi) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState('idle')

    useEffect(() => {

        setStatus('loading')

        const fetchData = async () => {
            try {
                const res = await axios.get(api + fethapi, {
                    params: {
                        page: page,
                        pageSize: pageSize,
                        search: searchQuery
                    }
                })
                setData(res.data.items)
                setTotalPages(res.data.totalPage)
                setStatus('success')
            } catch (error) {
                console.log(error)
                setError(error)
                setStatus('error')
            }
        }

        fetchData()
    }, [fethapi, page ,searchQuery])

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.search.value)
        setPage(1)
    }

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    return { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages }
}

export default useSearch