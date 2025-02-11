import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const useSearch = (fethapi) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchTag, setSearchTag] = useState('')
    const [searchCate, setSearchCate] = useState('')
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
                const res = await axios.get(fethapi, {
                    params: {
                        page: page,
                        limit: pageSize,
                        search: searchQuery,
                        tag: searchTag,
                        cate: searchCate,
                    }
                })
                setData(res.data.items)
                setTotalPages(res.data.totalPages)
                setStatus('success')
            } catch (error) {
                toast.error('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
                setError(error)
                setStatus('error')
            }
        }

        fetchData()
    }, [fethapi, page ,searchQuery, searchCate, searchTag, pageSize])

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.search.value)
        setSearchCate('')
        setSearchTag('')
        setPage(1)
    }

    const handleSearchTag = (e) => {
        e.preventDefault()
        setSearchTag(e.target.tag.value)
        setSearchCate('')
        setSearchQuery('')
        setPage(1)
    }

    const handleSearchCate = (e) => {
        e.preventDefault()
        setSearchCate(e.target.value)
        setSearchQuery('')
        setSearchTag('')
        setPage(1)
    }

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    return { data, error, status, setData, handleSearchChange, handleSearchTag, handleSearchCate, handleNextPage, handlePreviousPage, page, totalPages }
}

export default useSearch