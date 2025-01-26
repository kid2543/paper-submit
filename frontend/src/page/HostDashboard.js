import React, { useState } from 'react'
import dayjs from 'dayjs'
import axios from 'axios';

// asset
import FolderImage from '../asset/folder.png'

// component
import LoadingPage from '../components/LoadingPage';
import SearchItemNotFound from '../components/SearchItemNotFound';


// react boostatrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import useSearch from '../hook/useSearch';
import { UserDropdown } from '../components/UserDropdown';

function HostDashboard() {
    const searchConfr = useSearch('/api/conference/search/host')

    // modal data
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const [errorText, setErrorText] = useState('')
    const [searchInput, setSearchInput] = useState('search')

    const handleCreateConfr = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            const value = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/conference', value)
            searchConfr.setData([res.data, ...searchConfr.data])
            alert("Success")
            handleClose()
        } catch (error) {
            console.log(error)
            setErrorText(error.response.data?.error)
            alert("Error")
        }
    }

    if (searchConfr.error) {
        return <div>Error</div>
    }

    return (
        <div className='container my-5'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='col-md-4'>
                    <div>
                        {searchInput === 'search' &&
                            <form className='input-group' onSubmit={e => searchConfr.handleSearchChange(e)}>
                                <input name='search' type="search" className="form-control" placeholder="ค้นหา..." />
                                <button type='submit' className='btn btn-primary'>ค้นหา</button>
                            </form>
                        }
                        {searchInput === 'tag' &&
                            <form className='input-group' onSubmit={e => searchConfr.handleSearchTag(e)}>
                                <input name='tag' type="search" className="form-control" placeholder="ค้นหาจาก tag" />
                                <button type='submit' className='btn btn-primary'>ค้นหา</button>
                            </form>
                        }
                        {searchInput === 'cate' &&
                            <select className="form-select" onChange={e => searchConfr.handleSearchCate(e)}>
                                <option value="การประชุมวิชาการประจำปี">การประชุมวิชาการประจำปี</option>
                                <option value="การประชุมวิชาการระดับนานาชาติ">การประชุมวิชาการระดับนานาชาติ</option>
                                <option value="การประชุมวิชาการเฉพาะทาง">การประชุมวิชาการเฉพาะทาง</option>
                                <option value="การประชุมวิชาการระดับชาติ">การประชุมวิชาการระดับชาติ</option>
                            </select>
                        }
                    </div>
                </div>
                <UserDropdown />
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
            <div className='card border-0'>
                <div className='card-body'>
                    <div className='mb-4 d-flex justify-content-between align-items-center'>
                        <h4 className='fw-bold'>รายการงานประชุม</h4>
                        <div className='d-flex'>
                            <Dropdown className='me-3'>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    Filter
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('search')}>หัวข้องานประชุม</Dropdown.Item>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('tag')}>ค้นหาจาก Tag</Dropdown.Item>
                                    <Dropdown.Item type='button' onClick={() => setSearchInput('cate')}>ประเภทงานประชุม</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button type='button' onClick={handleShow} className='btn btn-outline-primary'><i className='bi bi-plus-lg me-2'></i>เพิ่มงานประชุม</button>
                        </div>
                    </div>
                    {searchConfr.status === 'loading' || searchConfr.status === 'idle' ? (
                        <LoadingPage />
                    ) : (
                        <div>
                            {searchConfr.data &&
                                <div>
                                    {searchConfr.data.length > 0 ? (
                                        <div className='row g-5 hover-card'>
                                            {searchConfr.data.map((item) => (
                                                <ConfrListCard key={item._id} name={item.title} id={item._id} status={item.status} date={item.confr_end_date} />
                                            ))}
                                        </div>
                                    ) : <SearchItemNotFound />
                                    }

                                </div >
                            }
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default HostDashboard

function ConfrListCard({ name, id, status, date }) {

    const handleClick = () => {
        sessionStorage.setItem("host_confr", id)
    }

    return (
        <div className='col-4 col-md-3'>
            <div className='card text-bg-light border-0'>
                <div className='card-body'>
                    <a href="/host/confr" onClick={handleClick} className='text-dark text-decoration-none'>
                        <div>
                            <img src={FolderImage} alt='conference folder' className='img-fluid' />
                        </div>
                        <hr />
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
                            <div>
                                <div className='text-truncate'>
                                    {name}
                                </div>
                                <small className='text-muted'>{dayjs(date).format("DD/MMM/YYYY")}</small>
                                <div>
                                    {status ? <span className='badge rounded-pill bg-primary'>Active</span> : <span className='badge rounded-pill bg-secondary'>Inactive</span>}
                                </div>
                            </div>
                        </OverlayTrigger>
                    </a>
                </div>
            </div>
        </div>
    )
}