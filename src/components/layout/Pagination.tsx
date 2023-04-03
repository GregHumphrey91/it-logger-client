import React from 'react';
import { Button } from 'react-bootstrap';

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setCurrentPage: any;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const pageNumbers: Array<number> = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber: number) => (
        <Button
          key={pageNumber}
          variant="secondary"
          size="lg"
          onClick={() => handlePageClick(pageNumber)}
          className={`page-item${currentPage === pageNumber ? ' active' : ''}`}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
