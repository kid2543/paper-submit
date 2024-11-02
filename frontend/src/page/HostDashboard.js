import React, { useEffect, useState } from 'react'
import FolderImage from '../asset/folder.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchItemNotFound from '../components/SearchItemNotFound';
import dayjs from 'dayjs'
import LoadingPage from '../components/LoadingPage';

const api = process.env.REACT_APP_API_URL

function HostDashboard() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [confr, setConfr] = useState([])

    useEffect(() => {

        const token = sessionStorage.getItem("token")

        const fethConfr = async () => {
            try {
                const res = await axios.get(api + "/get/confr/list/" + token)
                setConfr(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethConfr()

        setTimeout(() => {
            setLoading(false)
        }, 100)
    }, [])

    if(loading) {
        return <LoadingPage />
    }

    return (
        <div className='container'>
            <div className='mt-4 mb-5 col-md-4'>
                <div className='input-group'>
                    <button className='btn btn-outline-secondary btn-sm'><ion-icon name="search"></ion-icon></button>
                    <input className='form-control' type='search' placeholder='search conference' />
                </div>
            </div>
            <div className='mb-3 d-flex justify-content-between align-items-center'>
                <h4 className='fw-bold'>Create Conference</h4>
                <button type='button' onClick={() => navigate("create")} className='btn btn-outline-primary btn-sm'>New Conference +</button>
            </div>
            <div>
                <p className='text-muted'>Conference own by you</p>
                {confr.length > 0 ? (
                        <div className='row gx-5'>
                            {confr?.map((item) => (
                                <ConfrListCard key={item._id} name={item.title} id={item._id} status={item.status} date={item.confr_end_date} />
                            ))}
                        </div>
                    ) : <SearchItemNotFound />
                }

            </div >
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
            <div className='shadow-sm mb-3 rounded p-3'>
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
    )
}