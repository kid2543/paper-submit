import React from 'react'

function UploadPartner() {
  return (
    <div>
        <h4 className='text-center'>Upload รูป partner</h4>
      <form>
        <input type='file' className='form-control' />
        <button type='submit' className='btn btn-primary'>Upload</button>
      </form>
    </div>
  )
}

export default UploadPartner