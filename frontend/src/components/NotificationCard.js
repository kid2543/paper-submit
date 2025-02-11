import axios from 'axios'
import dayjs from 'dayjs'
import React from 'react'

const api = process.env.REACT_APP_API_URL

function NotificationCard({ header, desc, date, id, status, handleDelNoti }) {

    const handleDismiss = async () => {
        try {
            await axios.delete(api + "/del/notification/" + id)
            handleDelNoti(id)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='col-12'>
            <div className='card p-3'>
                <div className='row'>
                    <span className='col-6 text-muted'>
                        {header}
                    </span>
                    <small className='col-6 text-end text-muted'>{dayjs(date).format("DD MMM YYYY HH:mm")}</small>
                </div>
                <p>{desc}</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <button className='btn btn-outline-secondary btn-sm' type='button' onClick={handleDismiss}>Dismiss</button>
                    {status === true ? null : <span className="badge bg-primary">New</span>}
                </div>
            </div>
        </div>
    )
}

export default NotificationCard 