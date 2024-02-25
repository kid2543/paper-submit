import React from 'react'

function UploadSchedule() {
  return (
    <div>
        <h4 className='text-center'>Upload File กำหนดการ</h4>
      <form>
        <input type='file' className='form-control' />
        <button type='submit' className='btn btn-primary'>Upload</button>
      </form>
    </div>
  )
}

export default UploadSchedule