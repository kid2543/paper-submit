import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageNext, onPagePrev }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className='mt-4'>
        {pageNumbers.map(number => (
          <div key={number} className='d-flex justify-content-between'>
            <span>page {currentPage} of {totalPages}</span>
            <div>
              <button disabled={currentPage - 1 < totalPages} onClick={onPagePrev} className="btn btn-link">
                ก่อนหน้า
              </button>
              {pageNumbers}
              <button disabled={currentPage + 1 > totalPages} onClick={onPageNext} className="btn btn-link">
                ถัดไป
              </button>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
