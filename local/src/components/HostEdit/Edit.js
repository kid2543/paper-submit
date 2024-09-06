import React from 'react'

function Edit({ data, handleChange }) {

    return (
        <div className='mb-5'>
            <div className='row mb-3'>
                <div className='col-12 mb-3'>
                    <label className='text-muted mb-1'>ชื่องานประชุม</label>
                    <input name='title' type='text' className='form-control' defaultValue={data?.title} onChange={e => handleChange(e)} />
                </div>
            </div>
            <div className='row mb-3'>
                <div className='col-12 col-md-6 mb-3'>
                    <label className='text-muted mb-1'>หัวข้อรอง</label>
                    <input name='sub_title' type='text' className='form-control' defaultValue={data?.sub_title} onChange={e => handleChange(e)} />
                </div>
                <div className='col-12 col-md-6 mb-3'>
                    <label className='text-muted mb-1'>รหัสงานประชุม</label>
                    <input name='confr_code' type='text' className='form-control' readOnly placeholder={data?.confr_code} />
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <label className='text-muted mb-1'>รายละเอียดงานประชุม</label>
                    <textarea name='confr_desc' className='form-control' defaultValue={data?.confr_desc} onChange={e => handleChange(e)} />
                </div>
            </div>
        </div>

    )
}

export default Edit