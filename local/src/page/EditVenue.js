import React from 'react'

function EditVenue() {
    return (
        <div>
            <h4 className='text-center'>รายละเอียดสถานที่จัดงาน</h4>
            <form>
                <input type='text' placeholder='ชื่อสถานที่จัดงาน' className='form-control' />
                <input type='text' placeholder='รายละเอียดสถานที่จัดงาน' className='form-control' />
                <input type='text' placeholder='รายละเอียดเพิ่มเติม' className='form-control' />
                <input type='text' placeholder='link สถานที่ท่องเที่ยว' className='form-control' />
                <label className='form-label'>รูปสถานที่จัดงาน</label>
                <input type='file' className='form-control' />
                <button type='submit' className='btn btn-primary'>Save and Upload</button>
            </form>
        </div>
    )
}

export default EditVenue