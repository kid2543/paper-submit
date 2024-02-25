import React from 'react'

function EditDate() {
    return (
        <div>
            <form>
                <h4 className='text-center'>กำหนดการ</h4>
                <input type='text' placeholder='ชื่อกำหนดการ' className='form-control' />
                <label className='form-label'>กำหนดวันที่</label>
                <input type='date' className='form-control' />
            </form>
        </div>
    )
}

export default EditDate