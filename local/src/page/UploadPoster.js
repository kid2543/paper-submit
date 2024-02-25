import React from 'react'

function UploadPoster() {
    return (
        <div>
            <h4 className='text-center'>โปสเตอร์งานประชุม</h4>
            <form>
                <input type='file' className='form-control' />
                <button type='submit' className='btn btn-primary'>Upload</button>
            </form>
        </div>
    )
}

export default UploadPoster