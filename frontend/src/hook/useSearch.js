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
    }, [fethapi, page, searchQuery, searchCate, searchTag, pageSize])

    // ค้นหาจากชื่อ
    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearchQuery(e.target.search.value)
        setSearchCate('')
        setSearchTag('')
        setPage(1)
    }

    // ค้นหาจาก tag
    const handleSearchTag = (e) => {
        e.preventDefault()
        setSearchTag(e.target.tag.value)
        setSearchCate('')
        setSearchQuery('')
        setPage(1)
    }


    // ค้นหาจากหัวข้อ
    const handleSearchCate = (e) => {
        e.preventDefault()
        setSearchCate(e.target.cate.value)
        setSearchQuery('')
        setSearchTag('')
        setPage(1)
    }

    //หน้าถัดไป
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1)
    }

    // หน้าก่อนหน้า
    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1)
    }

    // หน้าแรก
    const handleFirstPage = () => {
        setPage(1)
    }

    //หน้าสุดท้าย
    const handleLastPage = () => {
        setPage(totalPages)
    }

    //เลือกจากเลข
    const handleNumberPage = (number) => {
        setPage(number)
    }

    return {
        data,
        error,
        status,
        setData,
        handleSearchChange,
        handleSearchTag,
        handleSearchCate,
        handleNextPage,
        handlePreviousPage,
        page,
        totalPages,
        handleFirstPage,
        handleLastPage,
        handleNumberPage
    }
}

export default useSearch