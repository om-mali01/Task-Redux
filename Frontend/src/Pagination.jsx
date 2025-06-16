import React, { useState } from "react";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);
const itemsPerPage = 10;

const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>
        Next
      </button>
      
    </div>
  );
};

export default PaginationExample;
