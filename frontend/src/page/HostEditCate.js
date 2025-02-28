import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// react bootstrap
import { Breadcrumb } from 'react-bootstrap'
import useSearch from '../hook/useSearch'
import PaginationComponent from '../components/Pagination'
import LoadingPage from '../components/LoadingPage'


function HostEditCate() {

    const { id } = useParams()

    const [cateData, setCateData] = useState({})
    const [commitDetail, setCommitDetail] = useState([])
    const {
        data,
        error,
        handleNextPage,
        handlePreviousPage,
        handleSearchChange,
        page,
        status,
        totalPages,
        handleFirstPage,
        handleLastPage,
        handleNumberPage,
    } = useSearch('/api/user/search/committee')

    const handleChangeList = (e, value) => {
        if (e.target.checked) {
            setCommitDetail([...commitDetail, value])
        } else {
            setCommitDetail(commitDetail.filter((item) => item._id !== value._id))
        }
    }


    // update confr topic
    const [cateLoading, setCateLoading] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        setCateLoading(true)
        try {
            const formData = new FormData(e.target)
            const json = Object.fromEntries(formData.entries())
            const res = await axios.patch('/api/category/update/' + id, json)
            setCateData(res.data)
            toast.success('แก้ไขสำเร็จ')
        } catch (error) {
            console.log(error)
        } finally {
            setCateLoading(false)
        }
    }


    // handle navigate to add committee
    const navigate = useNavigate()

    const handleAddCommittee = () => {
        sessionStorage.setItem('cate_id', id)
        navigate('/host/committee')
    }

    const [listLoading, setListLoading] = useState(false)
    const handleUpdateList = async (e) => {
        e.preventDefault()
        setListLoading(true)
        try {
            const res = await axios.patch('/api/category/review', {
                _id: id,
                list: commitDetail
            })
            setCateData(res.data)
            toast.success("เพิ่มกรรมการสำเร็จ")
            navigate(-1)
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            setListLoading(false)
        }
    }

    useEffect(() => {

        const fethData = async () => {
            try {
                const res = await axios.get('/api/category/one/' + id)
                setCateData(res.data)
                setCommitDetail(res.data.reviewer_list)
            } catch (error) {
                console.log(error)
            }
        }

        fethData()

    }, [id])

    return (
        <div className='py-4'>
            <div>
                <div className="card mb-3">
                    <div className="card-body">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/host/edit/category">หัวข้องานประชุม</Breadcrumb.Item>
                            <Breadcrumb.Item active>
                                แก้ไขหัวข้องานประชุม
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <h4 className='fw-bold card-title'>แก้ไขข้อมูลหัวข้องานประชุม</h4>
                    </div>
                </div>
                <div className='card  mb-3'>
                    <div className='card-body'>
                        <form onSubmit={handleUpdate}>
                            <div className='row gy-3'>
                                <p>
                                    รหัสหัวข้อ : <span className='fw-bold'>{cateData?.category_code}</span>
                                </p>
                                <div className='col-12'>
                                    <label className='form-label text-muted'>ชื่องานประชุม</label>
                                    <input
                                        name='name'
                                        className='form-control'
                                        defaultValue={cateData?.name}
                                    />
                                </div>
                                <div className='col-12'>
                                    <label className='form-label text-muted'>รายละเอียดงานประชุม</label>
                                    <textarea
                                        name='desc'
                                        className='form-control'
                                        defaultValue={cateData?.desc}
                                        rows={5}
                                    />
                                </div>
                                <div className='text-end'>
                                    {cateLoading ? (
                                        <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                            <span>Loading...</span>
                                        </button>
                                    ) : (
                                        <button type='submit' className='btn btn-primary'>
                                            <i className='bi bi-floppy me-2'></i>บันทึกข้อมูล
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='card  shadow-sm mb-3'>
                    <div className='card-body'>
                        <h4 className='card-title'>รายชื่อกรรมการประจำหัวข้อ</h4>
                        {commitDetail.length > 0 ? (
                            <div className='table-responsive'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>ชื่อผู้ใช้งาน</th>
                                            <th>ชื่อกรรมการ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commitDetail?.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>
                                ไม่พบรายชื่อกรรมการ
                            </p>
                        )}
                    </div>
                </div>
                <div className='card  shadow-sm mb-3'>
                    <div className='card-body'>
                        <h4 className='card-title mb-3'>
                            รายชื่อกรรมการทั้งหมด
                        </h4>
                        <div className='d-flex justify-content-between align-items-center mb-3'>
                            <div>
                                <form onSubmit={handleSearchChange} className="input-group">
                                    <input type="text" className="form-control" placeholder="ค้นหาจากชื่อผู้ใช้งาน" name='search' />
                                    <button type='submit' className="btn btn-primary" id="basic-addon2"><i className="bi bi-search"></i></button>
                                </form>
                            </div>
                            <div>
                                <button type='button' onClick={handleAddCommittee} className='btn btn-primary'>
                                    <i className='bi bi-person-plus me-2'></i>
                                    เพิ่มกรรมการ
                                </button>
                            </div>
                        </div>
                        {error &&
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        }
                        {status === 'idle' || status === 'loading' ? (
                            <LoadingPage />
                        ) : (
                            <form onSubmit={handleUpdateList}>
                                <div className='col-12'>
                                    {data &&
                                        <div>
                                            <div className='table-responsive' style={{ minWidth: 1000, minHeight: 400 }}>
                                                <table className='table table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>อันดับ</th>
                                                            <th>ชื่อผู้ใช้งาน</th>
                                                            <th>ชื่อกรรมการ</th>
                                                        </tr>
                                                    </thead>
                                                    {data.length > 0 ? (
                                                        <tbody>
                                                            {data.map((items, index) => (
                                                                <tr key={items._id}>
                                                                    <td>
                                                                        <input
                                                                            type='checkbox'
                                                                            checked={commitDetail.some(comit => comit._id === items._id)}
                                                                            onChange={e => handleChangeList(e, items)}
                                                                        />
                                                                    </td>
                                                                    <td>{((page - 1) * 10) + (index + 1)}</td>
                                                                    <td>{items.username}</td>
                                                                    <td>{items.name}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    ) : (
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan='4' className="text-center p-3">
                                                                    ไม่พบข้อมูล
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )}
                                                </table>
                                            </div>
                                            <PaginationComponent
                                                currentPage={page}
                                                onPageNext={handleNextPage}
                                                onPagePrev={handlePreviousPage}
                                                totalPages={totalPages}
                                                onFirstPage={handleFirstPage}
                                                onLastPage={handleLastPage}
                                                onSelectPage={handleNumberPage}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className='col-12 text-end'>
                                    {listLoading ? (
                                        <button className="btn btn-success" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    ) : (
                                        <button className='btn btn-success' type='submit'>
                                            <i className='me-2 bi bi-people'></i>ยืนยัน
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostEditCate