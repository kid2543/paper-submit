import React from 'react'

function HostAssign() {
    return (
        <div className='container my-4'>
            <h2>เพิ่มกรรมการตรวจบทความ: รหัสบทความ</h2>
            <form className='form-check mt-5'>
                <input className='form-check-input' type='checkbox' />
                <label className='form-check-label'>ชื่อกรรมการ (ความถนัด)</label>
                <div>
                    <button type='submit' className='btn btn-primary my-4'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default HostAssign