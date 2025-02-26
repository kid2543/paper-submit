import React from "react";
import useSearch from "../../hook/useSearch";

// react boostrap
import { Link } from "react-router-dom";
import PaginationComponent from "../Pagination";

function Author() {

    const {
        data,
        error,
        status,
        handleSearchChange,
        handleNextPage,
        handlePreviousPage,
        handleFirstPage,
        handleLastPage,
        handleNumberPage,
        page,
        totalPages
    } = useSearch("/api/user/search/author")

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
                                    {data.lenght > 0 ? (
                                        <>
                                            {data.map((items, index) => (
                                                <tr key={items._id}>
                                                    <td>{(page - 1) * 10 + (index + 1)}</td>
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
                                        </>
                                    ) : (
                                        <tr className="text-center">
                                            <td colSpan={5} className="p-3">ไม่พบข้อมูล</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        <PaginationComponent
                            currentPage={page}
                            onFirstPage={handleFirstPage}
                            onLastPage={handleLastPage}
                            onPageNext={handleNextPage}
                            onPagePrev={handlePreviousPage}
                            onSelectPage={handleNumberPage}
                            totalPages={totalPages}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default Author