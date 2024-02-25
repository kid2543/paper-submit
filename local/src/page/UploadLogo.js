import React from 'react'

function UploadLogo() {
    return (
        <div>
            <h2>Upload Logo</h2>
            <form>
                <input type='file' className='form-control' />
                <button type='submit' className='btn btn-primary'>Upload</button>
            </form>
        </div>

    )
}

export default UploadLogo