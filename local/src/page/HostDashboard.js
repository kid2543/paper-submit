import React from 'react'
import Host from '../page/Host'
import { useNavigate } from 'react-router-dom'

function HostDashboard() {

    const confr_id = sessionStorage.getItem("confr")

    const navigate = useNavigate()

    if (confr_id !== "undefined" && confr_id !== undefined && confr_id) {
        return (
            <Host />
        )
    } else {
        return (
            <div className='container my-5'>
                <h2>
                    สร้างงานประชุมได้เลยตอนนี้
                    <div className='mt-3'>
                        <button className='btn btn-primary' type='button' onClick={() => navigate("/host/create")}>สร้างงานประชุม!</button>
                    </div>
                </h2>
            </div>
        )
    }
}

export default HostDashboard