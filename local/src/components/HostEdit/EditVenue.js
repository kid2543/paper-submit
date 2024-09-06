import React from 'react'

const api = process.env.REACT_APP_API_URL

function EditVenue({ data, image, handleChange, handleImage, handleUpload, handleSubmit }) {

  return (
    <div>
      <div className='container my-5'>
        <div>
          <h4 className='text-primary'>สถานที่จัดงาน</h4>
          <hr />
        </div>
        <form className='mb-3' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>ชื่อสถานที่</label>
            <input name='name' className='form-control' defaultValue={data?.name} onChange={e => handleChange(e)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>รายละเอียด</label>
            <textarea name='desc' className='form-control' defaultValue={data?.desc} onChange={e => handleChange(e)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>รายละเอียดเพิ่มเติม</label>
            <textarea name='remark' className='form-control' defaultValue={data?.remark} onChange={e => handleChange(e)} />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Link สถานที่ท่องเที่ยว</label>
            <input name='travel' className='form-control' defaultValue={data?.travel} onChange={e => handleChange(e)} />
          </div>
          <div>
            <button type='submit' className='btn btn-primary'>บันทึกข้อมูล</button>
          </div>
        </form>
        <form onSubmit={handleUpload}>
          <div className='mb-3'>
            <label className='form-label'>รูปสถานที่</label>
            <input name='venue_image' type='file' className='form-control' onChange={e => handleImage(e)} />
            <div className='mt-3'>
              <button type='submit' className='btn btn-success me-3'>Upload</button>
              {image ? (
                <button type='button' className='btn btn-primary' onClick={() => window.open(api + '/image/' + image, "blank")}>ดูรูป</button>
              ) : (
                <button disabled type='button' className='btn btn-primary' onClick={() => window.open(api + '/image/' + image, "blank")}>ดูรูป</button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditVenue