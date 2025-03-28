import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageNext,
  onPagePrev,
  onSelectPage,
  onLastPage,
  onFirstPage
}) => {
  const pageNumbers = [];

  if (totalPages < 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage + 4 > totalPages) {
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = currentPage; i <= currentPage + 4; i++) {
      pageNumbers.push(i)
    }
  }



  return (
    <Pagination>
      <Pagination.First disabled={currentPage === 1} onClick={onFirstPage} >
      </Pagination.First>
      <Pagination.Prev onClick={onPagePrev} disabled={currentPage - 1 <= 0}>
      </Pagination.Prev>
      {pageNumbers.map((pages) => (
        <Pagination.Item key={pages} onClick={() => onSelectPage(pages)} active={currentPage === pages}>{pages}</Pagination.Item>
      ))}
      <Pagination.Next onClick={onPageNext} disabled={currentPage + 1 > totalPages} >
      </Pagination.Next>
      <Pagination.Last disabled={currentPage >= totalPages} onClick={onLastPage}>
      </Pagination.Last>
    </Pagination>
  );
};

export default PaginationComponent;
