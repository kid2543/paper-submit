import React from "react";
import useSearch from "../../hook/useSearch";

// react boostrap
import { Link } from "react-router-dom";

function Author() {

    const { data, error, status, handleSearchChange, handleNextPage, handlePreviousPage, page, totalPages } = useSearch("/api/user/search/author")
    
    // render
    if (error) {
        return <div>Error page</div>
    }

    return (
        <div>
            <div className="mb-3">
                <h6 className="fw-bold mb-3">รายชื่อผู้ส่งบทความ</h6>
                <form onSubmit={handleSearchChange}>
                    <input
                        className='form-control text-bg-light'
                        name='search'
                        placeholder='ค้นหา...'
                    />
                </form>
            </div>
            {data &&
                <div>
                    <div className="table-responsive" style={{ minHeight: "200px" }}>
                        {status === 'idle' || status === 'loading' ? (
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อ - นามสกุล</th>
                                        <th>ชื่อผู้ใช้งาน</th>
                                        <th>อีเมล</th>
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((items, index) => (
                                        <tr key={items._id}>
                                            <td>{index + 1}</td>
                                            <td>{items.name}</td>
                                            <td>{items.username}</td>
                                            <td>{items.email}</td>
                                            <td>
                                                <Link className="btn btn-light" to={`/admin/user/${items._id}`}>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Link>
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
                                    <i className="bi bi-arrow-left"></i> ก่อนหน้า
                                </button>
                                <button onClick={handleNextPage} disabled={page >= totalPages} className='btn btn-link'>
                                    ถัดไป <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Author