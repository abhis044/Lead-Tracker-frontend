import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className="flex justify-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className="mx-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded cursor-pointer"
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  };
export  default Pagination;  