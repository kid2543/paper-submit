import React from 'react'
import axios from 'axios'

// hook
import useSearch from '../../hook/useSearch'

// component
import LoadingPage from '../LoadingPage'
import PaperStatus from '../PaperStatus'
import { PaperResult } from '../PaperStatus'

// react boostrap
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom'


function AdminPaper() {

    const { data, error, status, setData, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/paper/search")
    const navigate = useNavigate()

    const cancelPaper = async (paper_id, paper_code) => {
        if (window.confirm(`ต้องการยกเลิกบทความ ${paper_code} หรือไม่?`)) {
            try {
                await axios.patch('/api/paper/status', {
                    id: paper_id,
                    status: 'CANCEL'
                })
                alert('Updated')
            } catch (error) {
                console.log(error)
                alert('Can not update')
            }
        }
    }

    const handleDelete = async (paper_id, paper_code) => {
        if (window.confirm(`ต้องการลบบทความ ${paper_code} หรือไม่ ?`)) {
            try {
                await axios.delete(`/api/paper/${paper_id}`)
                setData(data.filter(items => items._id !== paper_id))
                alert('Deleted')
            } catch (error) {
                console.log(error)
                alert(error.response.data.error)
            }
        }
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div className='px-5 py-4'>
            <div className='card border-0 shadow-sm'>
                <div className='card-body'>
                    <p className='fw-bold'>รายการบทความ</p>
                    <form onSubmit={handleSearchChange}>
                        <input type='search' className='form-control' name='search' placeholder='ค้นหา...' />
                    </form>
                    <div className='table-responsive my-3'>
                        {status === 'idle' || status === 'loading' ? (
                            <LoadingPage />
                        ) : (
                            <table className='table align-middle'>
                                <thead>
                                    <tr>
                                        <th>รหัสบทความ</th>
                                        <th style={{ width: 500 }}>ชื่อบทความ</th>
                                        <th>สถานะ</th>
                                        <th>ผลลัพธ์</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((items) => (
                                        <tr key={items._id}>
                                            <td>{items.paper_code}</td>
                                            <td>{items.title}</td>
                                            <td>
                                                <PaperStatus status={items.status} />
                                            </td>
                                            <td>
                                                <PaperResult status={items.result} />
                                            </td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item type='button' onClick={() => navigate('/host/paper/' + items._id)}>
                                                            <span className='me-2'><i className='bi bi-eye'></i></span>
                                                            ดูเพิ่มเติม
                                                        </Dropdown.Item>
                                                        {items.status !== 'CANCEL' &&
                                                            <Dropdown.Item className='text-danger' type='button' onClick={() => cancelPaper(items._id, items.paper_code)}>
                                                                <span className='me-2'><i className='bi bi-x-circle'></i></span>
                                                                ยกเลิก
                                                            </Dropdown.Item>
                                                        }
                                                        <Dropdown.Item className='text-danger' type='button' onClick={() => handleDelete(items._id, items.paper_code)}>
                                                            <span className='me-2'><i className='bi bi-trash'></i></span>
                                                            ลบ
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className='d-flex justify-content-between align-items-center'>
                            <span>{`Page ${page} of ${totalPages}`}</span>
                            <div>
                                <button onClick={handlePreviousPage} disabled={page === 1} className='btn btn-link'>
                                    <i className='bi bi-arrow-left'></i> ก่อนหน้า
                                </button>
                                <button onClick={handleNextPage} disabled={page === totalPages} className='btn btn-link'>
                                    ถัดไป <i className='bi bi-arrow-right'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AdminPaper