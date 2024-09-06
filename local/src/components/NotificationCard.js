import axios from 'axios'
import dayjs from 'dayjs'
import React from 'react'

const api = process.env.REACT_APP_API_URL

function NotificationCard({ header, desc, date, id, status, handleDelNoti }) {

    const delNoti = async () => {
        try {
            await axios.delete(api + "/del/notification/" + id)
            handleDelNoti(id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='col-12'>
            {status ? (
                <div className='card p-3'>
                    <div className='row'>
                        <span className='col-6 text-muted'>
                            {header}
                        </span>
                        <small className='col-6 text-end text-muted'>{dayjs(date).format("DD/MM/YYYY HH:mm")}</small>
                    </div>
                    <p>{desc}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <button className='btn text-muted' type='button' onClick={delNoti}>นำออก</button>
                        <span className="badge bg-secondary">อ่านแล้ว</span>
                    </div>
                </div>
            ) : (
                <div className='card p-3'>
                    <div className='row'>
                        <span className='col-6 text-muted'>
                            {header}
                        </span>
                        <small className='col-6 text-end text-muted'>{dayjs(date).format("DD/MM/YYYY HH:mm")}</small>
                    </div>
                    <p>{desc}</p>
                    <div className='d-flex align-items-center justify-content-between'>
                        <button className='btn text-muted' type='button' onClick={delNoti}>นำออก</button>
                        <span className="badge bg-primary">ยังไม่ได้อ่าน</span>
                    </div>
                </div>
            )}

        </div>
    )
}

export default NotificationCard