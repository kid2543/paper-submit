import React, { useState } from 'react'
import axios from 'axios';

// asset

// component
import LoadingPage from '../components/LoadingPage';


// react boostatrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import useSearch from '../hook/useSearch';
import { UserDropdown } from '../components/UserDropdown';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../components/Pagination';

function HostDashboard() {
    const searchConfr = useSearch('/api/conference/search/host')

    // modal data
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [errorText, setErrorText] = useState('')
    const [searchInput, setSearchInput] = useState('search')

    const navigate = useNavigate()

    const handleCreateConfr = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/conference', value)
            searchConfr.setData([res.data, ...searchConfr.data])
            toast.success("สร้างงานประชุมสำเร็จ กรอกรายละเอียดเพิ่มเติมและเปิดเป็นสาธารณะ")
            handleClose()
        } catch (error) {
            console.log(error)
            setErrorText(error.response.data?.error)
            toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        }
    }

    const viewConference = (id, confr_code) => {
        sessionStorage.setItem('host_confr', id)
        sessionStorage.setItem('confr_code', confr_code)
        navigate('/host/confr')
    }
    if (searchConfr.error) {
        return <div>Error</div>
    }

    return (
        <div className='bg-light'>
            <div className='container py-3'>
                <div className="card mb-3">
                    <div className="card-body">
                        <div className='d-flex justify-content-between align-items-center'>
                            <h4 className='fw-bold'>รายการงานประชุม</h4>
                            <UserDropdown />
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>สร้างงานประชุม</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={handleCreateConfr}>
                        <Modal.Body className='row g-3'>
                            <div className='col-12'>
                                <label className='form-label'>ชื่องานประชุม</label>
                                <input className='form-control' name='title' required onFocus={() => setErrorText('')} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>รหัสงานประชุม</label>
                                <input className='form-control' name='confr_code' required onFocus={() => setErrorText('')} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>เริ่ม</label>
                                <input className='form-control' type='date' name='confr_start_date' required onFocus={() => setErrorText('')} />
                            </div>
                            <div className='col-12'>
                                <label className='form-label'>สิ้นสุด</label>
                                <input className='form-control' type='date' name='confr_end_date' required onFocus={() => setErrorText('')} />
                            </div>
                            {errorText &&
                                <p className="text-danger">{errorText}</p>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="" onClick={handleClose}>
                                ปิด
                            </Button>
                            <Button variant="primary" type='submit'>
                                สร้าง
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <div className='card'>
                    <div className='card-body'>
                        <div className="d-flex mb-3">
                            <button type='button' onClick={handleShow} className='btn btn-primary me-2'><i className='bi bi-plus-lg me-2'></i>เพิ่มงานประชุม</button>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    เปลี่ยนเครื่องมือค้นหา
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('search')}>ค้นหาจากชื่องานประชุม</Dropdown.Item>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('tag')}>ค้นหาจาก Tag</Dropdown.Item>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('cate')}>ค้นหาจากประเภทงานประชุม</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='mb-3'>
                            <div>
                                {searchInput === 'search' &&
                                    <form className='input-group col-6' onSubmit={e => searchConfr.handleSearchChange(e)}>
                                        <input name='search' type="search" className="form-control" placeholder="ค้นหาจากชื่องานประชุม" />
                                        <button type='submit' className='btn btn-primary'>
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </form>
                                }
                                {searchInput === 'tag' &&
                                    <form className='input-group' onSubmit={e => searchConfr.handleSearchTag(e)}>
                                        <input name='tag' type="search" className="form-control" placeholder="ค้นหาจาก tag" />
                                        <button type='submit' className='btn btn-primary'>
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </form>
                                }
                                {searchInput === 'cate' &&
                                    <form className='input-group' onSubmit={e => searchConfr.handleSearchCate(e)}>
                                        <input name='cate' type="search" className="form-control" placeholder="ค้นหาจากหมวดหมู่" />
                                        <button type='submit' className='btn btn-primary'>
                                            <i className="bi bi-search"></i>
                                        </button>
                                    </form>
                                }
                            </div>
                        </div>
                        {searchConfr.status === 'loading' || searchConfr.status === 'idle' ? (
                            <LoadingPage />
                        ) : (
                            <div>
                                {searchConfr.data &&
                                    <div className='table-responsive' style={{ minHeight: 400 }}>
                                        <table className='table' style={{ minWidth: '800px' }}>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>รหัส</th>
                                                    <th>ชื่อ</th>
                                                    <th>Tag</th>
                                                    <th>หมวดหมู่</th>
                                                    <th>เครื่องมือ</th>
                                                </tr>
                                            </thead>
                                            {searchConfr.data.length > 0 ? (
                                                <tbody>
                                                    {searchConfr.data.map((item, index) => (
                                                        <tr key={item._id}>
                                                            <td>{(searchConfr.page - 1) * 10 + (index + 1)}</td>
                                                            <td>{item.confr_code}</td>
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>
                                                                {item.tag?.map((tags, tagsIndex) => (
                                                                    <span className="badge text-bg-primary me-2" key={tagsIndex}>{tags}</span>
                                                                ))}
                                                            </td>
                                                            <td>
                                                                {item.cate?.map((cates, catesIndex) => (
                                                                    <span className="badge text-bg-primary me-2" key={catesIndex}>{cates}</span>
                                                                ))}
                                                            </td>

                                                            <td>
                                                                <button onClick={() => viewConference(item._id, item.confr_code)} type='button' className='btn btn-light' to='#'>
                                                                    <i className="bi bi-pencil-square"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    <tr>
                                                        <td className='p-3 text-center' colSpan={6}>
                                                            ไม่พบข้อมูล
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )
                                            }
                                        </table>
                                    </div >
                                }
                                <PaginationComponent
                                    currentPage={searchConfr.page}
                                    onFirstPage={searchConfr.handleFirstPage}
                                    onLastPage={searchConfr.handleLastPage}
                                    onPageNext={searchConfr.handleNextPage}
                                    onPagePrev={searchConfr.handlePreviousPage}
                                    onSelectPage={searchConfr.handleNumberPage}
                                    totalPages={searchConfr.totalPages}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div>
    )
}

export default HostDashboard
