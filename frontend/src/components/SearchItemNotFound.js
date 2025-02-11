import React from 'react'
import NotFoundIcon from '../asset/page-not-found.png'

function SearchItemNotFound() {
  return (
    <div className='col-md-6 col-lg-4 mx-auto text-center card  shadow'>
        <div className='mb-3'>
            <img src={NotFoundIcon} alt='not-found' width={178} />
        </div>
        <div>
            <p className='text-muted'>ไม่พบข้อมูล!</p>
        </div>
    </div>
  )
}

export default SearchItemNotFound