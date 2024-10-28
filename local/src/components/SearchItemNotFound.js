import React from 'react'
import NotFoundIcon from '../asset/page-not-found.png'

function SearchItemNotFound() {
  return (
    <div className='col-md-6 col-lg-4 mx-auto text-center'>
        <div className='mb-3'>
            <img src={NotFoundIcon} alt='not-found' width={178} />
        </div>
        <div>
            <p className='text-muted'>No query to match the data, Please make sure the input information is correct!</p>
        </div>
    </div>
  )
}

export default SearchItemNotFound